import { motion } from 'framer-motion'
import type { CSSProperties } from 'react'
import { christening } from '@/content/christening'
import { LavenderSprig, Sparkle } from './Ornaments'

export function VerseSection() {
  const words = christening.verse.text.split(' ')

  return (
    <section
      id="verse"
      className="relative overflow-hidden bg-[linear-gradient(160deg,#5e4389_0%,#4b3473_55%,#3d2a57_100%)] text-white"
    >
      <div className="lace-pattern pointer-events-none absolute inset-0 opacity-20" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orchid/25 blur-3xl" />

      <LavenderSprig className="sway absolute -bottom-6 left-4 h-64 w-auto opacity-60 sm:left-16 sm:h-80" />
      <LavenderSprig
        className="sway absolute -bottom-6 right-4 h-56 w-auto opacity-50 sm:right-16 sm:h-72"
        style={{ animationDelay: '1.5s' }}
      />
      {[
        'left-[15%] top-[20%]',
        'right-[18%] top-[28%]',
        'left-[30%] bottom-[22%]',
        'right-[30%] bottom-[18%]',
      ].map((pos, i) => (
        <Sparkle
          key={pos}
          className={`absolute size-3 text-lilac ${pos}`}
          style={{ animationDelay: `${i * 0.8}s` }}
        />
      ))}

      <div className="relative mx-auto max-w-3xl px-6 py-24 text-center sm:py-32">
        <motion.svg
          viewBox="0 0 40 56"
          className="mx-auto h-14 w-10 text-lilac"
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          <motion.path
            d="M20 2 V54 M6 16 H34"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
          />
        </motion.svg>

        <p className="font-serif mt-10 text-3xl leading-snug italic sm:text-[2.6rem] sm:leading-snug">
          <span className="font-script mr-1 align-[-0.15em] text-6xl leading-none text-lavender">
            &ldquo;
          </span>
          {words.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              className="mr-[0.28em] inline-block"
              initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                duration: 0.7,
                delay: 0.25 + i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
          <span className="font-script -ml-[0.2em] align-[-0.15em] text-6xl leading-none text-lavender">
            &rdquo;
          </span>
        </p>

        <motion.p
          className="mt-8 text-xs font-semibold uppercase tracking-[0.5em] text-lilac"
          initial={{ opacity: 0, letterSpacing: '0.2em' }}
          whileInView={{ opacity: 1, letterSpacing: '0.5em' }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 1.2 }}
        >
          {christening.verse.reference}
        </motion.p>
      </div>

      <div
        className="scallop-bottom relative"
        style={{ '--scallop-color': '#f6f1fc' } as CSSProperties}
      />
    </section>
  )
}
