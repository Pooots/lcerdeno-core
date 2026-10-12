import { motion } from 'framer-motion'
import { memo, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { christening } from '@/content/christening'
import { useLiteMotion } from '@/lib/useLiteMotion'
import { GoldFloral } from './GoldFloral'
import { MonogramSeal, Sparkle } from './Ornaments'
import { RevealPortrait } from './RevealPortrait'
import { StackedName } from './StackedName'

/** closed -> glow (seal tapped) -> open (flaps swing) -> revealed (flaps unmounted) */
type Stage = 'closed' | 'glow' | 'open' | 'revealed'

const EASE = [0.22, 1, 0.36, 1] as const
const GOLD = '#f3d98b'
/** The portrait reveal stays up this long unless the guest taps "Open Invitation". */
const AUTO_ENTER_MS = 11000
const OPEN_AT_MS = 1250
/** Flaps finish swinging and fading ~2s after opening; unmount them afterwards. */
const REVEALED_AT_MS = OPEN_AT_MS + 2100
/** The portrait's entrance animations have settled by now; safe to lay out the page behind it. */
const PREPARE_AT_MS = OPEN_AT_MS + 4400

/**
 * How far the side flaps' tips cross the centre line. Kept in pixels (not %)
 * so the tips always stay hidden under the seal on wide screens.
 */
const TIP_OVERLAP = 34

function useViewport() {
  const [size, setSize] = useState(() => ({
    w: window.innerWidth,
    h: window.innerHeight,
  }))
  useEffect(() => {
    let frame = 0
    const onResize = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() =>
        setSize({ w: window.innerWidth, h: window.innerHeight }),
      )
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
    }
  }, [])
  return size
}

function Flap({
  clip,
  origin,
  background,
  open,
  rotate,
  delay,
  zIndex,
  children,
}: {
  clip: string
  origin: string
  background: string
  open: boolean
  rotate: { rotateX?: number; rotateY?: number }
  delay: number
  zIndex: number
  children?: ReactNode
}) {
  return (
    <motion.div
      className="absolute inset-0"
      style={{
        transformOrigin: origin,
        zIndex,
        pointerEvents: open ? 'none' : 'auto',
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
      }}
      initial={false}
      animate={
        open
          ? { ...rotate, opacity: 0 }
          : { rotateX: 0, rotateY: 0, opacity: 1 }
      }
      transition={{
        duration: 1.4,
        ease: EASE,
        delay,
        opacity: { duration: 1, delay: delay + 0.45 },
      }}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: clip, background }}
      >
        <div className="lace-pattern absolute inset-0 opacity-[0.12]" />
        {children}
      </div>
    </motion.div>
  )
}

export const IntroEnvelope = memo(function IntroEnvelope({
  onOpen,
  onSealClick,
  onPrepare,
}: {
  onOpen: () => void
  onSealClick?: () => void
  /** Called once the reveal is calm, so the page behind can render ahead of time. */
  onPrepare?: () => void
}) {
  const [stage, setStage] = useState<Stage>('closed')
  const timers = useRef<number[]>([])
  const { w, h } = useViewport()
  const lite = useLiteMotion()

  useEffect(() => {
    const pending = timers.current
    return () => pending.forEach((t) => window.clearTimeout(t))
  }, [])

  const burstCount = lite ? 10 : 16
  const burst = useMemo(
    () =>
      Array.from({ length: burstCount }, (_, i) => {
        const angle = (i / burstCount) * Math.PI * 2 + (i % 2 ? 0.18 : 0)
        const distance = 110 + ((i * 37) % 5) * 26
        return {
          id: i,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          size: i % 3 === 0 ? 'size-5' : 'size-3.5',
          delay: (i % 4) * 0.05,
        }
      }),
    [burstCount],
  )

  const entered = useRef(false)
  const enter = () => {
    if (entered.current) return
    entered.current = true
    timers.current.forEach((t) => window.clearTimeout(t))
    onOpen()
  }

  const open = () => {
    if (stage !== 'closed') return
    onSealClick?.()
    setStage('glow')
    timers.current.push(
      window.setTimeout(() => setStage('open'), OPEN_AT_MS),
      window.setTimeout(() => setStage('revealed'), REVEALED_AT_MS),
      window.setTimeout(() => onPrepare?.(), PREPARE_AT_MS),
      window.setTimeout(enter, AUTO_ENTER_MS),
    )
  }

  const glowing = stage !== 'closed'
  const opened = stage === 'open' || stage === 'revealed'
  const showEnvelope = stage !== 'revealed'

  const lx = w / 2 + TIP_OVERLAP
  const rx = w / 2 - TIP_OVERLAP
  const cy = h / 2
  const seams = [
    `M ${lx} ${cy} L 0 0`,
    `M ${lx} ${cy} L 0 ${h}`,
    `M ${rx} ${cy} L ${w} 0`,
    `M ${rx} ${cy} L ${w} ${h}`,
  ]

  const floralHeight = 'min(86vh, calc(36vw * 2.9))'

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden bg-[#3d2a57]"
      style={{ perspective: 1800 }}
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.04,
        transition: { duration: 0.8, ease: EASE },
      }}
    >
      {/* Inside of the envelope, revealed when the flaps open */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#fffaf0_0%,#f3ecfc_32%,#d9c8f0_70%,#b9a3dc_100%)]">
        {opened ? (
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 size-[110vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                'repeating-conic-gradient(from 0deg, rgba(243,217,139,0.45) 0deg 4deg, rgba(255,255,255,0) 4deg 10deg, rgba(255,255,255,0.6) 10deg 13deg, rgba(255,255,255,0) 13deg 20deg)',
              maskImage:
                'radial-gradient(circle closest-side, black 12%, rgba(0,0,0,0.5) 50%, transparent 100%)',
              WebkitMaskImage:
                'radial-gradient(circle closest-side, black 12%, rgba(0,0,0,0.5) 50%, transparent 100%)',
              willChange: 'transform, opacity',
            }}
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 0.5, rotate: 120 }}
            transition={{
              opacity: { duration: 1, delay: 0.3 },
              rotate: { duration: 14, ease: 'linear' },
            }}
          />
        ) : null}
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 size-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,244,214,0.95)_0%,rgba(243,217,139,0.4)_35%,rgba(243,217,139,0.12)_55%,transparent_70%)]"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={opened ? { opacity: 1, scale: 1 } : { opacity: 0 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
        />

        <RevealPortrait show={opened} onEnter={enter} />
      </div>

      {showEnvelope ? (
        <>
          {/* Flaps: bottom and top sit underneath the decorated side flaps */}
          <Flap
            clip="polygon(0 100%, 100% 100%, 50% 47%)"
            origin="50% 100%"
            background="linear-gradient(0deg, #6f52a3 0%, #8a6dbd 65%, #9d83cb 100%)"
            open={opened}
            rotate={{ rotateX: -80 }}
            delay={0.18}
            zIndex={1}
          />
          <Flap
            clip="polygon(0 0, 100% 0, 50% 53%)"
            origin="50% 0%"
            background="linear-gradient(180deg, #7a5cad 0%, #9479c6 65%, #a58bd1 100%)"
            open={opened}
            rotate={{ rotateX: 80 }}
            delay={0.18}
            zIndex={2}
          >
            <div className="absolute inset-x-0 top-[7%] flex flex-col items-center text-center sm:top-[9%]">
              <motion.div
                className="pointer-events-none absolute left-1/2 top-[40%] h-[150%] w-[min(90vw,34rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(247,215,130,0.38),rgba(247,215,130,0.1)_45%,transparent_70%)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: glowing ? 1 : 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              <p className="relative max-w-[70%] text-balance text-[0.56rem] font-semibold uppercase leading-relaxed tracking-[0.38em] text-[#f6ecd2] sm:max-w-none sm:text-[0.65rem] sm:tracking-[0.45em]">
                You are invited to the christening of
              </p>
              <StackedName
                size="flap"
                tone="gold"
                show
                className="relative mt-1"
              />
            </div>
          </Flap>
          <Flap
            clip={`polygon(0 0, calc(50% + ${TIP_OVERLAP}px) 50%, 0 100%)`}
            origin="0% 50%"
            background="linear-gradient(100deg, #3d2a57 0%, #563b80 55%, #6b4c9a 100%)"
            open={opened}
            rotate={{ rotateY: -80 }}
            delay={0}
            zIndex={3}
          >
            <div
              className="absolute left-[1.5%] top-1/2 -translate-y-1/2"
              style={{ height: floralHeight }}
            >
              <GoldFloral active={glowing} delay={0.2} className="h-full" />
            </div>
          </Flap>
          <Flap
            clip={`polygon(100% 0, calc(50% - ${TIP_OVERLAP}px) 50%, 100% 100%)`}
            origin="100% 50%"
            background="linear-gradient(260deg, #3d2a57 0%, #563b80 55%, #6b4c9a 100%)"
            open={opened}
            rotate={{ rotateY: 80 }}
            delay={0}
            zIndex={3}
          >
            <div
              className="absolute right-[1.5%] top-1/2 -translate-y-1/2 -scale-x-100"
              style={{ height: floralHeight }}
            >
              <GoldFloral active={glowing} delay={0.2} className="h-full" />
            </div>
          </Flap>

          {/* Gold seams along the folds (two strokes instead of a blur filter) */}
          <motion.svg
            className="pointer-events-none absolute inset-0 z-[4]"
            width={w}
            height={h}
            viewBox={`0 0 ${w} ${h}`}
            aria-hidden
            initial={false}
            animate={{ opacity: opened ? 0 : 1 }}
            transition={{ duration: 0.5 }}
          >
            <defs>
              <linearGradient
                id="seam-gold"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="0"
                x2={w}
                y2={h}
              >
                <stop offset="0" stopColor="#b8862b" />
                <stop offset="0.5" stopColor="#f7e3a3" />
                <stop offset="1" stopColor="#b8862b" />
              </linearGradient>
            </defs>
            {seams.map((d) => (
              <path
                key={`base-${d}`}
                d={d}
                stroke="url(#seam-gold)"
                strokeWidth={1.4}
                strokeOpacity={0.75}
                fill="none"
              />
            ))}
            {seams.map((d, i) =>
              [
                { width: 8, color: '#f7d782', opacity: 0.35 },
                { width: 2.4, color: '#fff3cf', opacity: 1 },
              ].map((s) => (
                <motion.path
                  key={`glow-${s.width}-${d}`}
                  d={d}
                  stroke={s.color}
                  strokeWidth={s.width}
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={
                    glowing
                      ? { pathLength: 1, opacity: s.opacity }
                      : { pathLength: 0, opacity: 0 }
                  }
                  transition={{
                    duration: 0.9,
                    ease: 'easeOut',
                    delay: 0.15 + (i % 2) * 0.06,
                  }}
                />
              )),
            )}
          </motion.svg>

          {/* Ambient gold twinkles (kept clear of the name and the seal) */}
          {[
            'left-[10%] top-[14%] size-3',
            'right-[12%] top-[20%] size-2.5',
            'left-[18%] bottom-[18%] size-3',
            'right-[16%] bottom-[14%] size-4',
            'left-[30%] bottom-[34%] size-2',
            'right-[28%] top-[44%] size-2',
          ].map((pos, i) => (
            <Sparkle
              key={pos}
              className={`absolute z-[5] ${pos}`}
              style={{ color: GOLD, animationDelay: `${i * 0.5}s` }}
            />
          ))}

          {/* Seal + gold burst */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-[7]">
            <motion.div
              className="absolute left-0 top-0 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,250,232,1)_0%,rgba(247,215,130,0.85)_30%,rgba(212,166,64,0.35)_55%,transparent_72%)]"
              style={{ willChange: 'transform, opacity' }}
              initial={{ opacity: 0, scale: 0.2 }}
              animate={
                glowing
                  ? { opacity: [0, 1, 0.55, 0], scale: [0.2, 2.6, 4, 6] }
                  : { opacity: 0, scale: 0.2 }
              }
              transition={{ duration: 1.6, ease: 'easeOut' }}
            />
            {[0, 0.16, 0.32].map((delay) => (
              <motion.div
                key={delay}
                className="absolute left-0 top-0 size-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#f7e3a3] shadow-[0_0_18px_rgba(247,215,130,0.9)]"
                style={{ willChange: 'transform, opacity' }}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={
                  glowing
                    ? { opacity: [0, 1, 0], scale: [0.4, 4.6] }
                    : { opacity: 0, scale: 0.4 }
                }
                transition={{ duration: 1.3, delay, ease: 'easeOut' }}
              />
            ))}
            {burst.map((b) => (
              <motion.span
                key={b.id}
                className="absolute left-0 top-0"
                style={{
                  color: b.id % 3 === 0 ? '#fffaf0' : GOLD,
                  willChange: 'transform, opacity',
                }}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0, rotate: 0 }}
                animate={
                  glowing
                    ? {
                        x: b.x,
                        y: b.y,
                        opacity: [0, 1, 0],
                        scale: [0, 1.3, 0.5],
                        rotate: 180,
                      }
                    : { x: 0, y: 0, opacity: 0, scale: 0, rotate: 0 }
                }
                transition={{ duration: 1.5, delay: 0.1 + b.delay, ease: EASE }}
              >
                <Sparkle className={`${b.size} -translate-x-1/2 -translate-y-1/2`} />
              </motion.span>
            ))}
          </div>

          <motion.button
            type="button"
            onClick={open}
            aria-label="Open the invitation"
            className={`absolute left-1/2 top-1/2 z-[8] -translate-x-1/2 -translate-y-1/2 rounded-full ${glowing ? 'pointer-events-none' : 'cursor-pointer'}`}
            whileHover={glowing ? undefined : { scale: 1.06 }}
            whileTap={glowing ? undefined : { scale: 0.94 }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={
              opened
                ? { opacity: 0, scale: 1.5 }
                : glowing
                  ? { opacity: 1, scale: [1, 0.9, 1.08] }
                  : { opacity: 1, scale: 1 }
            }
            transition={{ duration: opened ? 0.6 : 0.7, ease: EASE }}
          >
            <motion.span
              className="pointer-events-none absolute left-1/2 top-1/2 size-[190%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,244,214,0.9)_0%,rgba(247,215,130,0.45)_35%,transparent_68%)]"
              initial={false}
              animate={{
                opacity: glowing ? 1 : 0.45,
                scale: glowing ? 1.15 : 0.9,
              }}
              transition={{ duration: 0.7, ease: EASE }}
            />
            <span
              className="seal-pulse relative block rounded-full p-[5px]"
              style={{
                background:
                  'conic-gradient(from 30deg, #b8862b, #f7e3a3, #d4a640, #fff3cf, #b8862b, #f3d98b, #b8862b)',
              }}
            >
              <MonogramSeal
                letters={christening.monogram}
                className="size-24 text-lg sm:size-28 sm:text-xl"
              />
            </span>
          </motion.button>

          <motion.p
            className="pointer-events-none absolute left-1/2 top-[calc(50%+5.5rem)] z-[6] -translate-x-1/2 whitespace-nowrap rounded-full bg-[#3d2a57]/60 px-4 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-[#f6ecd2] sm:top-[calc(50%+6.5rem)]"
            initial={{ opacity: 0 }}
            animate={glowing ? { opacity: 0 } : { opacity: [0.55, 1, 0.55] }}
            transition={
              glowing
                ? { duration: 0.3 }
                : {
                    duration: 2.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.8,
                  }
            }
          >
            Tap the seal to open
          </motion.p>
        </>
      ) : null}
    </motion.div>
  )
})
