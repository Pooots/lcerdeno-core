import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion'
import { ChevronsLeftRight, Flower2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent, PointerEvent } from 'react'
import { christening } from '@/content/christening'
import { cn } from '@/lib/utils'
import { FloralCluster, Sparkle } from './Ornaments'
import { Reveal, SectionHeading } from './Reveal'

const EASE = [0.22, 1, 0.36, 1] as const

function CrossGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M12 2 V22 M5 8 H19"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function ChristeningLookSection() {
  const { lavender, white } = christening.look
  const frameRef = useRef<HTMLDivElement>(null)
  const inView = useInView(frameRef, { once: true, amount: 0.5 })
  const dragging = useRef(false)

  /** Percentage of the frame (from the left) showing the lavender photo. */
  const pos = useMotionValue(50)
  const clip = useTransform(pos, (v) => `inset(0 ${100 - v}% 0 0)`)
  const handleLeft = useTransform(pos, (v) => `${v}%`)
  const lavenderLabel = useTransform(pos, [0, 25], [0, 1])
  const whiteLabel = useTransform(pos, [75, 100], [1, 0])
  const [focus, setFocus] = useState<'lavender' | 'white' | null>(null)
  const [valueNow, setValueNow] = useState(50)

  useMotionValueEvent(pos, 'change', (v) => {
    const next = v >= 85 ? 'lavender' : v <= 15 ? 'white' : null
    setFocus((cur) => (cur === next ? cur : next))
    setValueNow(Math.round(v))
  })

  useEffect(() => {
    if (!inView) return
    const controls = animate(pos, [50, 82, 18, 50], {
      duration: 3.2,
      ease: 'easeInOut',
      delay: 0.6,
    })
    return () => controls.stop()
  }, [inView, pos])

  const setFromPointer = (clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect()
    if (!rect) return
    const pct = ((clientX - rect.left) / rect.width) * 100
    pos.stop()
    pos.set(Math.min(100, Math.max(0, pct)))
  }

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    setFromPointer(e.clientX)
  }

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) setFromPointer(e.clientX)
  }

  const onPointerUp = () => {
    dragging.current = false
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 20 : 5
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      pos.set(Math.max(0, pos.get() - step))
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      pos.set(Math.min(100, pos.get() + step))
    }
  }

  const show = (target: 'lavender' | 'white') =>
    animate(pos, target === 'lavender' ? 100 : 0, {
      duration: 1.1,
      ease: EASE,
    })

  const chapters = [
    { key: 'lavender' as const, data: lavender, icon: Flower2 },
    { key: 'white' as const, data: white, icon: null },
  ]

  return (
    <section
      id="look"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f6f1fc_0%,#fdfbff_45%,#f3ecfc_100%)] py-24 sm:py-32"
    >
      <div className="lace-pattern pointer-events-none absolute inset-0 opacity-50" />
      <div className="watercolor-blob pointer-events-none absolute -right-32 top-16 size-[28rem] rounded-full bg-lavender/25 blur-3xl" />
      <div
        className="watercolor-blob pointer-events-none absolute -left-40 bottom-10 size-[26rem] rounded-full bg-orchid/15 blur-3xl"
        style={{ animationDelay: '-7s' }}
      />

      <SectionHeading
        eyebrow={`The christening of ${christening.childName}`}
        title="Dressed in Grace"
        subtitle="From lavender blooms to baptismal white"
        className="relative px-6"
      />

      <div className="relative mx-auto mt-16 grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <Reveal y={50} className="relative mx-auto w-full max-w-[26rem]">
          <div className="relative">
            <div className="pointer-events-none absolute -inset-4 rounded-t-[999px] rounded-b-[3rem] border border-dashed border-lavender/70" />

            <div className="relative rounded-t-[999px] rounded-b-[2.5rem] bg-white p-3 shadow-[0_40px_80px_-40px_rgb(61_42_87_/_0.7)]">
              <div className="pointer-events-none absolute inset-1.5 z-10 rounded-t-[999px] rounded-b-[2.2rem] border border-lavender/70" />

              <div
                ref={frameRef}
                className="relative aspect-[792/1024] cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-t-[999px] rounded-b-[2rem] outline-none focus-visible:ring-4 focus-visible:ring-lavender/60"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onKeyDown={onKeyDown}
                role="slider"
                tabIndex={0}
                aria-label="Compare her lavender dress and white christening gown"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={valueNow}
              >
                <img
                  src={white.src}
                  alt={white.alt}
                  className="absolute inset-0 size-full object-cover"
                  draggable={false}
                />
                <motion.img
                  src={lavender.src}
                  alt={lavender.alt}
                  className="absolute inset-0 size-full object-cover"
                  style={{ clipPath: clip }}
                  draggable={false}
                />

                <motion.span
                  className="absolute bottom-6 left-5 rounded-full bg-white/85 px-3 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-orchid backdrop-blur"
                  style={{ opacity: lavenderLabel }}
                >
                  Lavender
                </motion.span>
                <motion.span
                  className="absolute bottom-6 right-5 rounded-full bg-white/85 px-3 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-primary backdrop-blur"
                  style={{ opacity: whiteLabel }}
                >
                  White
                </motion.span>

                <motion.div
                  className="pointer-events-none absolute inset-y-0 w-0"
                  style={{ left: handleLeft }}
                >
                  <div className="absolute inset-y-0 -left-px w-0.5 bg-white/90 shadow-[0_0_12px_rgb(255_255_255_/_0.9)]" />
                  <div className="absolute left-0 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-[radial-gradient(circle_at_35%_30%,#a585d4,#6b4c9a_60%,#4a3270)] text-white shadow-[0_10px_25px_-8px_rgb(61_42_87_/_0.8)]">
                    <ChevronsLeftRight className="size-5" />
                  </div>
                </motion.div>
              </div>
            </div>

            <FloralCluster className="absolute -bottom-10 -left-14 h-40 w-40 sm:h-48 sm:w-48" />
            <FloralCluster
              flip
              className="absolute -bottom-10 -right-14 h-40 w-40 sm:h-48 sm:w-48"
            />
            <Sparkle className="absolute -left-4 top-16 size-5 text-orchid" />
            <Sparkle
              className="absolute -right-3 top-32 size-4 text-lavender"
              style={{ animationDelay: '1.3s' }}
            />
          </div>

          <p className="relative z-10 mt-16 text-center text-[0.62rem] font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            Drag to see her christening gown
          </p>
        </Reveal>

        <div className="space-y-5">
          {chapters.map(({ key, data, icon: Icon }, i) => (
            <Reveal key={key} delay={0.15 * i} x={40} y={0}>
              <motion.button
                type="button"
                onClick={() => show(key)}
                className={cn(
                  'group relative w-full overflow-hidden rounded-[1.75rem] border p-6 text-left transition-colors sm:p-7',
                  focus === key
                    ? 'border-transparent bg-white shadow-[0_30px_60px_-35px_rgb(61_42_87_/_0.7)]'
                    : 'border-lilac bg-white/60 hover:bg-white',
                )}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              >
                {focus === key ? (
                  <motion.span
                    layoutId="look-active"
                    className="absolute inset-y-4 left-0 w-1 rounded-full bg-[linear-gradient(180deg,#b9a3dc,#5e4389)]"
                  />
                ) : null}
                <div className="flex items-start gap-5">
                  <div
                    className={cn(
                      'grid size-14 shrink-0 place-items-center rounded-2xl transition duration-500 group-hover:rotate-6',
                      key === 'lavender'
                        ? 'bg-[linear-gradient(140deg,#c7b0e6,#8a68bd)] text-white'
                        : 'border border-lilac bg-white text-primary',
                    )}
                  >
                    {Icon ? (
                      <Icon className="size-6" />
                    ) : (
                      <CrossGlyph className="size-6" />
                    )}
                  </div>
                  <div>
                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.38em] text-orchid">
                      {key === 'lavender'
                        ? 'Her celebration dress'
                        : 'Her christening gown'}
                    </p>
                    <h3 className="font-script mt-1 text-4xl leading-tight text-primary">
                      {data.title}
                    </h3>
                    <p className="font-serif mt-2 text-lg leading-relaxed text-muted-foreground">
                      {data.text}
                    </p>
                    <span className="mt-3 inline-block text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-primary/70 transition group-hover:text-primary">
                      View this look &rarr;
                    </span>
                  </div>
                </div>
              </motion.button>
            </Reveal>
          ))}

          <Reveal delay={0.35}>
            <figure className="relative mt-4 rounded-[1.75rem] bg-[linear-gradient(140deg,#5e4389,#3d2a57)] px-7 py-8 text-center text-white shadow-[0_30px_60px_-35px_rgb(61_42_87_/_0.9)]">
              <div className="lace-pattern pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-20" />
              <CrossGlyph className="relative mx-auto size-6 text-lilac" />
              <blockquote className="font-serif relative mt-4 text-xl italic leading-relaxed sm:text-2xl">
                &ldquo;You have been clothed in Christ.&rdquo;
              </blockquote>
              <figcaption className="relative mt-3 text-[0.6rem] font-semibold uppercase tracking-[0.42em] text-lilac">
                Galatians 3:27
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
