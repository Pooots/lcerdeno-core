import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

type Remaining = {
  days: number
  hours: number
  minutes: number
  seconds: number
  done: boolean
}

function getRemaining(target: number): Remaining {
  const diff = Math.max(target - Date.now(), 0)
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: diff === 0,
  }
}

function Unit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, '0')

  return (
    <div className="flex flex-col items-center">
      <div className="relative grid h-20 w-16 place-items-center overflow-hidden rounded-2xl border border-white/80 bg-white/70 shadow-[0_18px_40px_-22px_rgb(61_42_87_/_0.55)] backdrop-blur sm:h-24 sm:w-20">
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-lilac/70" />
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={display}
            className="font-serif text-4xl font-semibold text-primary sm:text-5xl"
            initial={{ y: '-60%', opacity: 0, filter: 'blur(4px)' }}
            animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: '60%', opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-muted-foreground">
        {label}
      </span>
    </div>
  )
}

export function Countdown({ target }: { target: string }) {
  const targetMs = new Date(target).getTime()
  const [remaining, setRemaining] = useState(() => getRemaining(targetMs))

  useEffect(() => {
    const id = window.setInterval(
      () => setRemaining(getRemaining(targetMs)),
      1000,
    )
    return () => window.clearInterval(id)
  }, [targetMs])

  if (remaining.done) {
    return (
      <p className="font-script text-shimmer text-4xl">
        Today is her blessed day!
      </p>
    )
  }

  return (
    <div className="flex items-start gap-2.5 sm:gap-4">
      <Unit value={remaining.days} label="Days" />
      <Unit value={remaining.hours} label="Hours" />
      <Unit value={remaining.minutes} label="Mins" />
      <Unit value={remaining.seconds} label="Secs" />
    </div>
  )
}
