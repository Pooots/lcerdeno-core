import { christening } from '@/content/christening'
import { api } from '@/lib/api'

export type RsvpAttendance = 'accept' | 'decline'

export type RsvpGuestRole = 'ninong' | 'ninang' | 'family' | 'friend'

export type RsvpPayload = {
  name: string
  attendance: RsvpAttendance
  role: RsvpGuestRole | null
  guests: number
  email: string
  message: string
}

const LOCAL_STORAGE_KEY = 'christening_rsvps'

/** Set VITE_RSVP_USE_API=true once the backend exposes POST /api/v1/rsvp. */
const useApi = import.meta.env.VITE_RSVP_USE_API === 'true'

/**
 * Inbox (or FormSubmit alias) that receives every RSVP via https://formsubmit.co.
 * The guest's own email is only used as the reply-to address.
 * The very first submission triggers a one-time "Activate Form" email to this inbox.
 */
const rsvpInbox: string =
  import.meta.env.VITE_RSVP_EMAIL?.trim() || christening.rsvpInbox

export class RsvpInboxNotActivatedError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'RsvpInboxNotActivatedError'
  }
}

const ROLE_LABELS: Record<RsvpGuestRole, string> = {
  ninong: 'Ninong',
  ninang: 'Ninang',
  family: 'Family',
  friend: 'Friend',
}

function saveLocally(payload: RsvpPayload): void {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY)
    const existing: unknown = raw ? JSON.parse(raw) : []
    const list = Array.isArray(existing) ? existing : []
    list.push({ ...payload, submitted_at: new Date().toISOString() })
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list))
  } catch {
    // Storage can be unavailable (private mode / quota); the email is what matters.
  }
}

async function sendEmail(inbox: string, payload: RsvpPayload): Promise<void> {
  const accepted = payload.attendance === 'accept'
  const response = accepted ? 'Joyfully Accepts' : 'Regretfully Declines'

  const res = await fetch(
    `https://formsubmit.co/ajax/${inbox}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: `RSVP: ${payload.name} - ${response}`,
        _template: 'table',
        _captcha: 'false',
        ...(payload.email ? { _replyto: payload.email } : {}),
        Name: payload.name,
        Response: response,
        'Guest type': payload.role ? ROLE_LABELS[payload.role] : '-',
        'Number of guests': accepted ? String(payload.guests) : '0',
        'Guest email': payload.email || '-',
        'Blessing for baby': payload.message || '-',
        'Submitted at': new Date().toLocaleString('en-PH', {
          timeZone: 'Asia/Manila',
          dateStyle: 'medium',
          timeStyle: 'short',
        }),
      }),
    },
  )

  const data = (await res.json().catch(() => null)) as {
    success?: string | boolean
    message?: string
  } | null

  if (!res.ok || data?.success === false || data?.success === 'false') {
    const message = data?.message ?? `RSVP email failed (${res.status})`
    if (/activat/i.test(message)) throw new RsvpInboxNotActivatedError(message)
    throw new Error(message)
  }
}

export const rsvpService = {
  async submit(payload: RsvpPayload): Promise<void> {
    saveLocally(payload)

    if (useApi) {
      await api.post('/rsvp', payload)
      return
    }

    await sendEmail(rsvpInbox, payload)
  },
}
