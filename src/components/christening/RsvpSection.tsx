import { AnimatePresence, motion } from 'framer-motion'
import {
  HeartCrack,
  HeartHandshake,
  LoaderCircle,
  Minus,
  Plus,
  Send,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useState } from 'react'
import type { CSSProperties, FormEvent, ReactNode } from 'react'
import { christening } from '@/content/christening'
import { cn } from '@/lib/utils'
import {
  RsvpInboxNotActivatedError,
  rsvpService,
} from '@/services/rsvpService'
import type {
  RsvpAttendance,
  RsvpGuestRole,
  RsvpPayload,
} from '@/services/rsvpService'
import { MonogramSeal, Sparkle } from './Ornaments'
import { Reveal, SectionHeading } from './Reveal'

const EASE = [0.22, 1, 0.36, 1] as const
const MAX_GUESTS = 6

const ROLES: { value: RsvpGuestRole; label: string }[] = [
  { value: 'ninong', label: 'Ninong' },
  { value: 'ninang', label: 'Ninang' },
  { value: 'family', label: 'Family' },
  { value: 'friend', label: 'Friend' },
]

type Errors = Partial<Record<'name' | 'attendance' | 'email', string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string
  hint?: string
  error?: string
  children: ReactNode
}) {
  return (
    <label className="block">
      <span className="text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-muted-foreground">
        {label}
      </span>
      <div className="mt-2">{children}</div>
      {hint && !error ? (
        <span className="mt-1.5 block text-xs text-muted-foreground/80">
          {hint}
        </span>
      ) : null}
      <AnimatePresence>
        {error ? (
          <motion.span
            className="mt-1.5 block text-xs text-rose-600"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
          >
            {error}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </label>
  )
}

const inputClass =
  'w-full rounded-2xl border border-lilac bg-white/80 px-4 py-3.5 text-[0.95rem] text-foreground shadow-[inset_0_1px_2px_rgb(61_42_87_/_0.06)] outline-none transition placeholder:text-muted-foreground/60 focus:border-orchid focus:bg-white focus:ring-4 focus:ring-lavender/30'

function AttendanceOption({
  selected,
  onSelect,
  icon: Icon,
  title,
  subtitle,
}: {
  selected: boolean
  onSelect: () => void
  icon: LucideIcon
  title: string
  subtitle: string
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      className={cn(
        'relative flex flex-1 flex-col items-center gap-2 overflow-hidden rounded-2xl border px-4 py-5 text-center transition-colors',
        selected
          ? 'border-transparent text-primary-foreground'
          : 'border-lilac bg-white/70 text-primary hover:border-lavender',
      )}
      whileTap={{ scale: 0.97 }}
      aria-pressed={selected}
    >
      {selected ? (
        <motion.span
          layoutId="rsvp-attendance"
          className="absolute inset-0 bg-[linear-gradient(140deg,#8a68bd,#5e4389)]"
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
        />
      ) : null}
      <Icon className="relative size-6" />
      <span className="font-serif relative text-lg font-semibold leading-tight">
        {title}
      </span>
      <span
        className={cn(
          'relative text-[0.6rem] font-semibold uppercase tracking-[0.25em]',
          selected ? 'text-lilac' : 'text-muted-foreground',
        )}
      >
        {subtitle}
      </span>
    </motion.button>
  )
}

function ThankYou({
  name,
  attending,
  onReset,
}: {
  name: string
  attending: boolean
  onReset: () => void
}) {
  return (
    <motion.div
      key="thanks"
      className="relative flex flex-col items-center py-10 text-center"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div className="relative">
        {Array.from({ length: 10 }, (_, i) => {
          const angle = (i / 10) * Math.PI * 2
          return (
            <motion.span
              key={i}
              className="absolute left-1/2 top-1/2 text-orchid"
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={{
                x: Math.cos(angle) * 90,
                y: Math.sin(angle) * 90,
                opacity: [0, 1, 0],
                scale: [0, 1, 0.6],
              }}
              transition={{ duration: 1.6, delay: 0.3, ease: 'easeOut' }}
            >
              <Sparkle className="size-4 -translate-x-1/2 -translate-y-1/2" />
            </motion.span>
          )
        })}
        <svg viewBox="0 0 100 100" className="size-28">
          <motion.circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="#b9a3dc"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
          <motion.path
            d="M30 52 L44 66 L71 36"
            fill="none"
            stroke="#5e4389"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.7, delay: 0.8, ease: 'easeOut' }}
          />
        </svg>
      </div>

      <motion.p
        className="font-script text-shimmer mt-6 text-5xl"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8, ease: EASE }}
      >
        Thank you, {name.split(' ')[0]}!
      </motion.p>
      <motion.p
        className="font-serif mt-4 max-w-md text-lg italic text-muted-foreground"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease: EASE }}
      >
        {attending
          ? `Your response has been received. We can't wait to celebrate with you on ${christening.date.long}.`
          : 'We will truly miss you. Thank you for your love, prayers, and blessings for our little one.'}
      </motion.p>
      <motion.button
        type="button"
        onClick={onReset}
        className="mt-8 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-orchid underline-offset-4 hover:underline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        Send another response
      </motion.button>
    </motion.div>
  )
}

export function RsvpSection() {
  const [name, setName] = useState('')
  const [attendance, setAttendance] = useState<RsvpAttendance | null>(null)
  const [role, setRole] = useState<RsvpGuestRole | null>(null)
  const [guests, setGuests] = useState(1)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState<RsvpPayload | null>(null)

  const reset = () => {
    setName('')
    setAttendance(null)
    setRole(null)
    setGuests(1)
    setEmail('')
    setMessage('')
    setErrors({})
    setSubmitError(null)
    setSubmitted(null)
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const next: Errors = {}
    if (!name.trim()) next.name = 'Please let us know your name.'
    if (!attendance) next.attendance = 'Kindly choose your response.'
    if (email.trim() && !EMAIL_PATTERN.test(email.trim()))
      next.email = 'Please enter a valid email address.'
    setErrors(next)
    if (Object.keys(next).length > 0 || !attendance) return

    const payload: RsvpPayload = {
      name: name.trim(),
      attendance,
      role,
      guests: attendance === 'accept' ? guests : 0,
      email: email.trim(),
      message: message.trim(),
    }

    setSubmitting(true)
    setSubmitError(null)
    try {
      await rsvpService.submit(payload)
      setSubmitted(payload)
    } catch (err) {
      console.error('RSVP submission failed:', err)
      setSubmitError(
        err instanceof RsvpInboxNotActivatedError
          ? 'Our RSVP inbox is still being set up. Please try again a little later - thank you for your patience!'
          : 'We could not send your response just now. Please try again in a moment.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="rsvp" className="relative overflow-hidden py-24 sm:py-32">
      <div
        className="absolute inset-0 scale-110 bg-cover bg-center blur-[6px]"
        style={{ backgroundImage: 'url(/images/backdrop.png)' }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(160deg,rgb(61_42_87_/_0.92),rgb(94_67_137_/_0.86)_50%,rgb(138_104_189_/_0.8))]" />
      <div className="lace-pattern pointer-events-none absolute inset-0 opacity-20" />
      {[
        'left-[8%] top-[12%] size-4',
        'right-[10%] top-[18%] size-3',
        'left-[14%] bottom-[16%] size-3',
        'right-[6%] bottom-[24%] size-5',
      ].map((pos, i) => (
        <Sparkle
          key={pos}
          className={`absolute text-lilac ${pos}`}
          style={{ animationDelay: `${i * 0.7}s` }}
        />
      ))}

      <SectionHeading
        eyebrow="Répondez s'il vous plaît"
        title="Kindly RSVP"
        subtitle={`We would be grateful for your response on or before ${christening.rsvpDeadline}`}
        light
        className="relative px-6"
      />

      <Reveal
        y={60}
        delay={0.2}
        className="relative mx-auto mt-16 max-w-2xl px-4 sm:px-6"
      >
        <div className="relative rounded-[2.25rem] bg-white/95 p-2.5 shadow-[0_50px_100px_-40px_rgb(20_10_35_/_0.8)] backdrop-blur">
          <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2">
            <MonogramSeal
              letters={christening.monogram}
              className="seal-pulse size-20 text-base"
            />
          </div>

          <div className="paper relative rounded-[1.9rem] px-5 pb-8 pt-14 sm:px-10 sm:pb-10">
            <div className="pointer-events-none absolute inset-3 rounded-[1.5rem] border border-dashed border-lavender/70" />

            <AnimatePresence mode="wait">
              {submitted ? (
                <ThankYou
                  name={submitted.name}
                  attending={submitted.attendance === 'accept'}
                  onReset={reset}
                />
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  className="relative space-y-7"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  noValidate
                >
                  <p className="font-serif text-center text-lg italic text-muted-foreground">
                    Celebrating the christening of{' '}
                    <span className="font-semibold not-italic text-primary">
                      {christening.childName}
                    </span>
                  </p>

                  <Field label="Your full name" error={errors.name}>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Maria Santos"
                      className={cn(
                        inputClass,
                        errors.name && 'border-rose-300',
                      )}
                      autoComplete="name"
                    />
                  </Field>

                  <div>
                    <span className="text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-muted-foreground">
                      Will you be joining us?
                    </span>
                    <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                      <AttendanceOption
                        selected={attendance === 'accept'}
                        onSelect={() => setAttendance('accept')}
                        icon={HeartHandshake}
                        title="Joyfully Accepts"
                        subtitle="I'll be there"
                      />
                      <AttendanceOption
                        selected={attendance === 'decline'}
                        onSelect={() => setAttendance('decline')}
                        icon={HeartCrack}
                        title="Regretfully Declines"
                        subtitle="Celebrating in spirit"
                      />
                    </div>
                    <AnimatePresence>
                      {errors.attendance ? (
                        <motion.span
                          className="mt-1.5 block text-xs text-rose-600"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                        >
                          {errors.attendance}
                        </motion.span>
                      ) : null}
                    </AnimatePresence>
                  </div>

                  <div>
                    <span className="text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-muted-foreground">
                      I am a
                    </span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {ROLES.map((r) => (
                        <motion.button
                          key={r.value}
                          type="button"
                          onClick={() =>
                            setRole((cur) => (cur === r.value ? null : r.value))
                          }
                          whileTap={{ scale: 0.95 }}
                          className={cn(
                            'rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] transition',
                            role === r.value
                              ? 'border-primary bg-primary text-primary-foreground shadow-[0_10px_20px_-12px_rgb(94_67_137_/_0.9)]'
                              : 'border-lilac bg-white/70 text-primary hover:border-lavender',
                          )}
                          aria-pressed={role === r.value}
                        >
                          {r.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {attendance === 'accept' ? (
                      <motion.div
                        key="guests"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-muted-foreground">
                          Number of guests (including you)
                        </span>
                        <div className="mt-2 flex items-center gap-4">
                          <button
                            type="button"
                            onClick={() => setGuests((g) => Math.max(1, g - 1))}
                            disabled={guests <= 1}
                            className="grid size-11 place-items-center rounded-full border border-lilac bg-white text-primary transition hover:border-orchid disabled:opacity-40"
                            aria-label="Fewer guests"
                          >
                            <Minus className="size-4" />
                          </button>
                          <div className="relative grid h-12 w-16 place-items-center overflow-hidden">
                            <AnimatePresence mode="popLayout" initial={false}>
                              <motion.span
                                key={guests}
                                className="text-3xl font-semibold text-primary"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                {guests}
                              </motion.span>
                            </AnimatePresence>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setGuests((g) => Math.min(MAX_GUESTS, g + 1))
                            }
                            disabled={guests >= MAX_GUESTS}
                            className="grid size-11 place-items-center rounded-full border border-lilac bg-white text-primary transition hover:border-orchid disabled:opacity-40"
                            aria-label="More guests"
                          >
                            <Plus className="size-4" />
                          </button>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  <Field
                    label="Your email address (optional)"
                    hint="So the Cerdeno family can reply to you."
                    error={errors.email}
                  >
                    <input
                      type="email"
                      inputMode="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. maria.santos@gmail.com"
                      className={cn(
                        inputClass,
                        errors.email && 'border-rose-300',
                      )}
                      autoComplete="email"
                    />
                  </Field>

                  <Field label="A blessing for baby (optional)">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      placeholder="Share your prayers and wishes for our little one…"
                      className={cn(inputClass, 'resize-none')}
                    />
                  </Field>

                  <AnimatePresence>
                    {submitError ? (
                      <motion.p
                        className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        {submitError}
                      </motion.p>
                    ) : null}
                  </AnimatePresence>

                  <motion.button
                    type="submit"
                    disabled={submitting}
                    className="button-sheen flex w-full items-center justify-center gap-2.5 rounded-full bg-[linear-gradient(120deg,#8a68bd,#5e4389_55%,#3d2a57)] px-6 py-4 text-xs font-semibold uppercase tracking-[0.34em] text-white shadow-[0_20px_40px_-18px_rgb(94_67_137_/_0.95)] transition disabled:opacity-70"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {submitting ? (
                      <>
                        <LoaderCircle className="size-4 animate-spin" />
                        Sending your response
                      </>
                    ) : (
                      <>
                        <Send className="size-4" />
                        Send my RSVP
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Reveal>

      <div
        className="scallop-top absolute inset-x-0 bottom-0"
        style={{ '--scallop-color': '#f6f1fc' } as CSSProperties}
      />
    </section>
  )
}
