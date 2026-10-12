import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { FlourishDivider } from './Ornaments'

const EASE = [0.22, 1, 0.36, 1] as const

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  x = 0,
  scale = 1,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  x?: number
  scale?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x, scale, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
  light = false,
}: {
  eyebrow: string
  title: string
  subtitle?: string
  className?: string
  light?: boolean
}) {
  return (
    <div className={cn('mx-auto max-w-3xl text-center', className)}>
      <Reveal>
        <p
          className={cn(
            'text-[0.7rem] font-semibold uppercase tracking-[0.42em]',
            light ? 'text-lilac' : 'text-orchid',
          )}
        >
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2
          className={cn(
            'font-script mt-1 text-5xl leading-tight text-balance sm:text-6xl',
            light ? 'text-white' : 'text-shimmer',
          )}
        >
          {title}
        </h2>
      </Reveal>
      <Reveal delay={0.2} className="mt-3 flex justify-center">
        <FlourishDivider className={light ? 'opacity-80 brightness-200' : ''} />
      </Reveal>
      {subtitle ? (
        <Reveal delay={0.3}>
          <p
            className={cn(
              'font-serif mt-4 text-lg italic sm:text-xl',
              light ? 'text-lilac' : 'text-muted-foreground',
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      ) : null}
    </div>
  )
}
