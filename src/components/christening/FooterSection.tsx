import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { christening } from '@/content/christening'
import { FloralCluster, FlourishDivider, MonogramSeal } from './Ornaments'
import { Reveal } from './Reveal'

export function FooterSection() {
  return (
    <footer className="relative overflow-hidden bg-mist pb-10 pt-24 text-center">
      <div className="lace-pattern pointer-events-none absolute inset-0 opacity-60" />

      <FloralCluster className="absolute -bottom-4 -left-8 h-52 w-52 sm:h-64 sm:w-64" />
      <FloralCluster
        flip
        className="absolute -bottom-4 -right-8 h-52 w-52 sm:h-64 sm:w-64"
      />

      <div className="relative mx-auto max-w-2xl px-6">
        <Reveal scale={0.8} y={0}>
          <MonogramSeal
            letters={christening.monogram}
            className="mx-auto size-24 text-lg"
          />
        </Reveal>
        <Reveal delay={0.15}>
          <p className="font-serif mt-8 text-xl italic text-muted-foreground sm:text-2xl">
            Thank you for being part of her first steps in faith.
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="font-script text-shimmer mt-6 text-5xl sm:text-6xl">
            With love &amp; gratitude
          </p>
        </Reveal>
        <Reveal delay={0.35}>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.45em] text-primary">
            {christening.family}
          </p>
          <div className="mt-6 flex justify-center">
            <FlourishDivider />
          </div>
          <p className="mt-4 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-muted-foreground">
            {christening.date.long} · Tanza, Cavite
          </p>
        </Reveal>

        <motion.a
          href="#home"
          className="mx-auto mt-14 grid size-12 place-items-center rounded-full border border-lavender bg-white text-primary shadow-[0_14px_30px_-16px_rgb(61_42_87_/_0.7)] transition hover:bg-primary hover:text-primary-foreground"
          whileHover={{ y: -4 }}
          aria-label="Back to top"
        >
          <ArrowUp className="size-5" />
        </motion.a>
      </div>
    </footer>
  )
}
