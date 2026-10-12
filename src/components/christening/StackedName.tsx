import { motion } from 'framer-motion'
import { christening } from '@/content/christening'
import { cn } from '@/lib/utils'
import { Sparkle } from './Ornaments'

const EASE = [0.22, 1, 0.36, 1] as const

const SIZES = {
  hero: {
    lead: 'text-[7rem] sm:text-[10rem] lg:text-[9.5rem] xl:text-[10.5rem]',
    rest: 'text-[2.7rem] sm:text-6xl lg:text-[3.5rem] xl:text-6xl',
    gap: '-mt-[0.55em]',
  },
  reveal: {
    lead: 'text-[6rem] sm:text-[7.5rem]',
    rest: 'text-[2.2rem] sm:text-5xl',
    gap: '-mt-[0.55em]',
  },
  flap: {
    lead: 'text-[4.6rem] sm:text-[6.5rem]',
    rest: 'text-2xl sm:text-4xl',
    gap: '-mt-[0.6em]',
  },
} as const

const TONES = {
  shimmer: {
    text: 'text-shimmer',
    glow: 'bg-[radial-gradient(circle,rgba(185,163,220,0.65),rgba(228,216,244,0.35)_45%,transparent_70%)]',
    line: 'from-transparent to-lavender',
    sparkle: '#8a68bd',
    shadow: 'drop-shadow-[0_8px_14px_rgba(94,67,137,0.28)]',
  },
  gold: {
    text: 'text-gold',
    glow: 'bg-[radial-gradient(circle,rgba(247,215,130,0.45),rgba(247,215,130,0.12)_45%,transparent_70%)]',
    line: 'from-transparent to-[#e8c56a]',
    sparkle: '#f3d98b',
    shadow: 'drop-shadow-[0_4px_8px_rgba(20,10,40,0.45)]',
  },
} as const

export function StackedName({
  show,
  delay = 0,
  size,
  tone = 'shimmer',
  as = 'p',
  className,
}: {
  show: boolean
  delay?: number
  size: keyof typeof SIZES
  tone?: keyof typeof TONES
  as?: 'h1' | 'h2' | 'p'
  className?: string
}) {
  const s = SIZES[size]
  const t = TONES[tone]
  const Tag = motion[as]

  const restLetters = Array.from(christening.nameRest)
  const restDelay = delay + 0.55

  return (
    <Tag
      className={cn(
        'font-script inline-flex flex-col items-center leading-none',
        className,
      )}
      aria-label={christening.childName}
    >
      <span className={cn('relative isolate inline-block', s.lead)} aria-hidden>
        <motion.span
          className={cn(
            'pointer-events-none absolute left-1/2 top-[55%] -z-10 size-[1.1em] -translate-x-1/2 -translate-y-1/2 rounded-full',
            t.glow,
          )}
          style={{ willChange: 'transform, opacity' }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={
            show
              ? { opacity: [0.6, 1, 0.6], scale: [0.95, 1.08, 0.95] }
              : { opacity: 0, scale: 0.4 }
          }
          transition={
            show
              ? {
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: delay + 0.4,
                }
              : { duration: 0.3 }
          }
        />
        <span className={cn('inline-block', t.shadow)}>
          <motion.span
            className={cn(
              '-mx-[0.25em] -mt-[0.18em] inline-block px-[0.45em] pt-[0.4em] leading-[1.05]',
              t.text,
            )}
            initial={{ opacity: 0, scale: 0.6, y: '0.12em' }}
            animate={
              show
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.6, y: '0.12em' }
            }
            transition={{ duration: 1.2, ease: EASE, delay }}
          >
            {christening.nameLead}
          </motion.span>
        </span>
        <Sparkle
          className="absolute right-[2%] top-[22%] size-[0.09em]"
          style={{ color: t.sparkle }}
        />
        <Sparkle
          className="absolute bottom-[26%] left-[4%] size-[0.06em]"
          style={{ color: t.sparkle, animationDelay: '1.2s' }}
        />
      </span>

      <span
        className={cn('relative flex items-center gap-[0.35em]', s.rest, s.gap)}
        aria-hidden
      >
        <motion.span
          className={cn('h-px w-[1.1em] bg-gradient-to-r', t.line)}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={show ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          style={{ originX: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: restDelay + 0.5 }}
        />
        <span
          className={cn(
            '-mx-[0.15em] inline-block whitespace-nowrap px-[0.35em]',
            t.text,
          )}
        >
          {restLetters.map((ch, i) => (
            <motion.span
              key={`${ch}-${i}`}
              className={cn('inline-block', ch === ' ' && 'w-[0.3em]')}
              initial={{ opacity: 0, y: '0.35em' }}
              animate={
                show ? { opacity: 1, y: 0 } : { opacity: 0, y: '0.35em' }
              }
              transition={{
                duration: 0.7,
                ease: EASE,
                delay: restDelay + i * 0.05,
              }}
            >
              {ch === ' ' ? '\u00a0' : ch}
            </motion.span>
          ))}
        </span>
        <motion.span
          className={cn('h-px w-[1.1em] bg-gradient-to-l', t.line)}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={show ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          style={{ originX: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: restDelay + 0.5 }}
        />
      </span>
    </Tag>
  )
}
