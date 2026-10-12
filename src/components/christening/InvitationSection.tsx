import { motion } from 'framer-motion'
import { Download, Expand, Heart } from 'lucide-react'
import { useState } from 'react'
import { christening } from '@/content/christening'
import { Lightbox } from './Lightbox'
import { FloralCluster, Sparkle } from './Ornaments'
import { Reveal, SectionHeading } from './Reveal'

export function InvitationSection() {
  const [open, setOpen] = useState<number | null>(null)
  const invitation = [
    {
      src: christening.invitationImage,
      alt: `Christening invitation for ${christening.childName}`,
      caption: 'Our invitation to you',
    },
  ]

  return (
    <section
      id="invitation"
      className="relative overflow-hidden bg-mist py-24 sm:py-32"
    >
      <div className="watercolor-blob pointer-events-none absolute -right-40 top-20 size-[28rem] rounded-full bg-lavender/25 blur-3xl" />

      <SectionHeading
        eyebrow="A heartfelt invitation"
        title="For our Dearest Ninong & Ninang"
        subtitle="and to every family and friend who holds her close"
        className="px-6"
      />

      <div className="relative mx-auto mt-16 grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
        <Reveal x={-40} y={0} className="relative mx-auto w-full max-w-sm">
          <div className="pointer-events-none absolute -inset-6 rotate-3 rounded-[2rem] bg-[linear-gradient(140deg,#e4d8f4,#c7b0e6)]" />
          <motion.button
            type="button"
            onClick={() => setOpen(0)}
            className="group relative block w-full -rotate-2 overflow-hidden rounded-2xl border-[6px] border-white bg-white shadow-[0_40px_80px_-40px_rgb(61_42_87_/_0.7)]"
            whileHover={{ rotate: 0, y: -8, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            aria-label="View the invitation"
          >
            <img
              src={christening.invitationImage}
              alt={`Christening invitation for ${christening.childName}`}
              className="w-full"
              loading="lazy"
            />
            <span className="absolute inset-0 grid place-items-center bg-plum/0 transition duration-500 group-hover:bg-plum/30">
              <span className="flex translate-y-4 items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-primary opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <Expand className="size-3.5" />
                View
              </span>
            </span>
          </motion.button>
          <Sparkle className="absolute -right-8 -top-6 size-6 text-orchid" />
          <Sparkle
            className="absolute -bottom-6 -left-8 size-4 text-lavender"
            style={{ animationDelay: '1.2s' }}
          />
        </Reveal>

        <div className="text-center lg:text-left">
          <Reveal>
            <div className="mx-auto inline-flex items-center gap-3 lg:mx-0">
              <span className="h-px w-10 bg-lavender" />
              <Heart className="size-4 fill-orchid text-orchid" />
              <span className="h-px w-10 bg-lavender" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-serif mt-6 text-2xl leading-relaxed text-foreground sm:text-[1.7rem]">
              {christening.godparentsMessage}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
              Join us on{' '}
              <span className="font-semibold text-primary">
                {christening.date.long}
              </span>{' '}
              at{' '}
              <span className="font-semibold text-primary">
                {christening.date.time}
              </span>{' '}
              as we celebrate this sacred moment together.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="font-script mt-8 text-4xl text-orchid">
              With joyful hearts,
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.4em] text-primary">
              {christening.family}
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start">
              <button
                type="button"
                onClick={() => setOpen(0)}
                className="inline-flex items-center gap-2 rounded-full border border-lavender bg-white px-6 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-primary transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-18px_rgb(61_42_87_/_0.7)]"
              >
                <Expand className="size-4" />
                View Invitation
              </button>
              <a
                href={christening.invitationImage}
                download="LC-Cerdeno-Christening-Invitation.png"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-primary-foreground transition hover:-translate-y-0.5 hover:bg-plum"
              >
                <Download className="size-4" />
                Save Invitation
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <FloralCluster className="absolute -bottom-6 -left-10 hidden h-60 w-60 opacity-80 md:block" />

      <Lightbox
        images={invitation}
        index={open}
        onClose={() => setOpen(null)}
        onIndexChange={setOpen}
      />
    </section>
  )
}
