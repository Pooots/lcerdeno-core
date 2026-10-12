import { motion, useScroll, useTransform } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ChevronDown, Heart } from 'lucide-react'
import { useRef } from 'react'
import type { CSSProperties } from 'react'
import { christening } from '@/content/christening'
import { Countdown } from './Countdown'
import { FloralCluster, FlourishDivider, Sparkle } from './Ornaments'
import { StackedName } from './StackedName'

const EASE = [0.22, 1, 0.36, 1] as const

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: EASE },
  },
}

export function HeroSection({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const { date } = christening

  return (
    <section
      id="home"
      ref={ref}
      className="relative overflow-hidden bg-[linear-gradient(170deg,#fdfbff_0%,#f3ecfc_50%,#ebe1f9_100%)] pt-24 sm:pt-28"
    >
      <div className="lace-pattern pointer-events-none absolute inset-0 opacity-50" />
      <div className="watercolor-blob pointer-events-none absolute -left-40 top-10 size-[30rem] rounded-full bg-lavender/30 blur-3xl" />
      <div
        className="watercolor-blob pointer-events-none absolute -right-32 bottom-0 size-[34rem] rounded-full bg-orchid/20 blur-3xl"
        style={{ animationDelay: '-8s' }}
      />
      <div
        className="watercolor-blob pointer-events-none absolute left-1/3 top-1/2 size-80 rounded-full bg-white/60 blur-3xl"
        style={{ animationDelay: '-4s' }}
      />

      <motion.div
        className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-32"
        style={{ opacity: fade }}
      >
        <motion.div
          className="text-center lg:text-left"
          style={{ y: textY }}
          variants={container}
          initial="hidden"
          animate={ready ? 'show' : 'hidden'}
        >
          <motion.p
            variants={item}
            className="font-script text-3xl text-orchid sm:text-4xl"
          >
            With Joyful Hearts and Blessings
          </motion.p>

          <motion.p
            variants={item}
            className="mt-4 text-[0.7rem] font-semibold uppercase tracking-[0.42em] text-muted-foreground sm:text-xs"
          >
            The Christening &amp; Dedication
            <span className="block mt-1.5 font-serif text-base normal-case italic tracking-normal sm:text-lg">
              of our beloved daughter
            </span>
          </motion.p>

          <div className="-mt-5 sm:-mt-7">
            <StackedName as="h1" size="hero" show={ready} delay={0.55} />
          </div>

          <motion.div
            variants={item}
            className="mt-2 flex justify-center lg:justify-start"
          >
            <FlourishDivider />
          </motion.div>

          <motion.div
            variants={item}
            className="mx-auto mt-6 max-w-md lg:mx-0"
          >
            <p className="text-center text-[0.68rem] font-semibold uppercase tracking-[0.5em] text-orchid">
              {date.month} {date.year}
            </p>
            <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-4 text-primary">
              <span className="border-y border-lavender py-2 text-center text-xs font-semibold uppercase tracking-[0.32em]">
                {date.weekday}
              </span>
              <span className="font-serif text-6xl font-semibold leading-none">
                {date.day}
              </span>
              <span className="border-y border-lavender py-2 text-center text-xs font-semibold uppercase tracking-[0.32em]">
                {date.time}
              </span>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-9 flex justify-center lg:justify-start"
          >
            <Countdown target={christening.startsAt} />
          </motion.div>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start"
          >
            <a
              href="#rsvp"
              className="button-sheen inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground shadow-[0_18px_40px_-16px_rgb(94_67_137_/_0.9)] transition hover:-translate-y-0.5 hover:bg-plum"
            >
              <Heart className="size-4 fill-current" />
              Kindly RSVP
            </a>
            <a
              href="#details"
              className="inline-flex items-center rounded-full border border-lavender bg-white/70 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.3em] text-primary backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
            >
              Event Details
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative order-first mx-auto w-full max-w-[16.5rem] sm:max-w-[24rem] lg:order-last lg:max-w-[26rem]"
          style={{ y: portraitY }}
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={ready ? { opacity: 1, scale: 1, y: 0 } : undefined}
          transition={{ duration: 1.3, ease: EASE, delay: 0.1 }}
        >
          <div className="spin-slow pointer-events-none absolute -inset-10 rounded-full border border-dashed border-lavender/70" />
          <div
            className="spin-slow pointer-events-none absolute -inset-4 rounded-full border border-lilac"
            style={{ animationDirection: 'reverse', animationDuration: '60s' }}
          />

          <div className="relative rounded-t-[999px] rounded-b-[2.5rem] bg-white p-3 shadow-[0_40px_80px_-40px_rgb(61_42_87_/_0.65)]">
            <div className="pointer-events-none absolute inset-1.5 rounded-t-[999px] rounded-b-[2.2rem] border border-lavender/70" />
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-[2rem]">
              <motion.img
                src={christening.heroImage}
                alt={`${christening.childName} in her christening dress`}
                className="size-full object-cover object-[50%_42%]"
                initial={{ scale: 1.25 }}
                animate={ready ? { scale: 1.08 } : undefined}
                transition={{ duration: 2.4, ease: EASE }}
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,rgb(94_67_137_/_0.25))]" />
            </div>
          </div>

          <FloralCluster className="absolute -bottom-10 -left-14 h-44 w-44 sm:h-52 sm:w-52" />
          <FloralCluster
            flip
            className="absolute -bottom-10 -right-14 h-44 w-44 sm:h-52 sm:w-52"
          />

          <Sparkle className="absolute -left-6 top-10 size-5 text-orchid" />
          <Sparkle
            className="absolute -right-4 top-24 size-4 text-lavender"
            style={{ animationDelay: '1s' }}
          />
          <Sparkle
            className="absolute right-6 -top-6 size-3 text-orchid"
            style={{ animationDelay: '2s' }}
          />

          <motion.div
            className="absolute inset-x-0 -bottom-6 z-10 flex justify-center sm:-bottom-8"
            initial={{ opacity: 0, y: 18, scale: 0.92 }}
            animate={ready ? { opacity: 1, y: 0, scale: 1 } : undefined}
            transition={{ duration: 1, ease: EASE, delay: 1.2 }}
          >
            <div className="rounded-full bg-[linear-gradient(135deg,#f7e3a3,#c8962e_35%,#fff3cf_55%,#b8862b)] p-px shadow-[0_18px_36px_-18px_rgb(61_42_87_/_0.75)]">
              <div className="relative flex flex-col items-center rounded-full bg-[linear-gradient(180deg,#ffffff,#f7f2fd)] px-6 pb-2 pt-1.5 sm:px-10 sm:pb-3 sm:pt-2.5">
                <span className="pointer-events-none absolute inset-[3px] rounded-full border border-[#e8d29a]/70" />
                <p className="font-script text-2xl leading-none text-orchid sm:text-3xl">
                  Blessed
                </p>
                <div className="mt-1 flex items-center gap-1.5 sm:gap-2">
                  <span className="h-px w-3 bg-gradient-to-r from-transparent to-[#d4a640] sm:w-5" />
                  <span className="size-1 rotate-45 bg-[#d4a640]" />
                  <span className="mr-[-0.3em] whitespace-nowrap text-[0.48rem] font-semibold uppercase tracking-[0.3em] sm:mr-[-0.34em] sm:tracking-[0.34em] text-plum/70 sm:text-[0.55rem]">
                    &amp; Dearly Loved
                  </span>
                  <span className="size-1 rotate-45 bg-[#d4a640]" />
                  <span className="h-px w-3 bg-gradient-to-l from-transparent to-[#d4a640] sm:w-5" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#verse"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-primary/60 lg:flex"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        Scroll
        <ChevronDown className="size-4" />
      </motion.a>

      <div
        className="scallop-top relative"
        style={{ '--scallop-color': '#5e4389' } as CSSProperties}
      />
    </section>
  )
}
