import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { christening } from '@/content/christening'
import { GoldFloral } from './GoldFloral'
import { MonogramSeal, Sparkle } from './Ornaments'
import { RevealPortrait } from './RevealPortrait'
import { StackedName } from './StackedName'

type Stage = 'closed' | 'glow' | 'open'

const EASE = [0.22, 1, 0.36, 1] as const
const GOLD = '#f3d98b'
const BURST_COUNT = 18
/** The portrait reveal stays up this long unless the guest taps "Open Invitation". */
const AUTO_ENTER_MS = 11000

/** Where the side flaps' tips meet, as a fraction of the viewport width. */
const LEFT_TIP = 0.54
const RIGHT_TIP = 0.46

function useViewport() {
  const [size, setSize] = useState(() => ({
    w: window.innerWidth,
    h: window.innerHeight,
  }))
  useEffect(() => {
    const onResize = () =>
      setSize({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
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
        filter: 'drop-shadow(0 0 22px rgba(30,15,50,0.45))',
      }}
      initial={false}
      animate={
        open
          ? { ...rotate, opacity: 0 }
          : { rotateX: 0, rotateY: 0, opacity: 1 }
      }
      transition={{
        duration: 1.5,
        ease: EASE,
        delay,
        opacity: { duration: 1.1, delay: delay + 0.45 },
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

export function IntroEnvelope({
  onOpen,
  onSealClick,
}: {
  onOpen: () => void
  onSealClick?: () => void
}) {
  const [stage, setStage] = useState<Stage>('closed')
  const timers = useRef<number[]>([])
  const { w, h } = useViewport()

  useEffect(() => {
    const pending = timers.current
    return () => pending.forEach((t) => window.clearTimeout(t))
  }, [])

  const burst = useMemo(
    () =>
      Array.from({ length: BURST_COUNT }, (_, i) => {
        const angle = (i / BURST_COUNT) * Math.PI * 2 + (i % 2 ? 0.18 : 0)
        const distance = 110 + ((i * 37) % 5) * 26
        return {
          id: i,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          size: i % 3 === 0 ? 'size-5' : 'size-3',
          delay: (i % 4) * 0.05,
        }
      }),
    [],
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
      window.setTimeout(() => setStage('open'), 1250),
      window.setTimeout(enter, AUTO_ENTER_MS),
    )
  }

  const glowing = stage !== 'closed'
  const opened = stage === 'open'

  const lx = w * LEFT_TIP
  const rx = w * RIGHT_TIP
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
        scale: 1.06,
        filter: 'blur(10px) brightness(1.2)',
        transition: { duration: 0.9, ease: EASE },
      }}
    >
      {/* Inside of the envelope, revealed when the flaps open */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#fffaf0_0%,#f3ecfc_32%,#d9c8f0_70%,#b9a3dc_100%)]">
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 size-[220vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'repeating-conic-gradient(from 0deg, rgba(243,217,139,0.45) 0deg 4deg, rgba(255,255,255,0) 4deg 10deg, rgba(255,255,255,0.6) 10deg 13deg, rgba(255,255,255,0) 13deg 20deg)',
            maskImage:
              'radial-gradient(circle, black 4%, rgba(0,0,0,0.5) 18%, transparent 40%)',
            WebkitMaskImage:
              'radial-gradient(circle, black 4%, rgba(0,0,0,0.5) 18%, transparent 40%)',
          }}
          initial={{ opacity: 0, rotate: 0 }}
          animate={opened ? { opacity: 0.5, rotate: 120 } : { opacity: 0 }}
          transition={{
            opacity: { duration: 1, delay: 0.3 },
            rotate: { duration: 14, ease: 'linear' },
          }}
        />
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 size-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,244,214,0.95),rgba(243,217,139,0.35)_45%,transparent_70%)] blur-2xl"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={opened ? { opacity: 1, scale: 1 } : { opacity: 0 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
        />

        <RevealPortrait show={opened} onEnter={enter} />
      </div>

      {/* Flaps: bottom and top sit underneath the decorated side flaps */}
      <Flap
        clip={`polygon(0 100%, 100% 100%, 50% 47%)`}
        origin="50% 100%"
        background="linear-gradient(0deg, #6f52a3 0%, #8a6dbd 65%, #9d83cb 100%)"
        open={opened}
        rotate={{ rotateX: -80 }}
        delay={0.18}
        zIndex={1}
      />
      <Flap
        clip={`polygon(0 0, 100% 0, 50% 53%)`}
        origin="50% 0%"
        background="linear-gradient(180deg, #7a5cad 0%, #9479c6 65%, #a58bd1 100%)"
        open={opened}
        rotate={{ rotateX: 80 }}
        delay={0.18}
        zIndex={2}
      >
        <motion.div
          className="absolute inset-x-0 top-[7%] flex flex-col items-center text-center sm:top-[9%]"
          initial={false}
          animate={{
            filter: glowing
              ? 'drop-shadow(0 0 10px rgba(247,215,130,0.9))'
              : 'drop-shadow(0 0 0px rgba(247,215,130,0))',
          }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="max-w-[70%] text-balance text-[0.56rem] font-semibold uppercase leading-relaxed tracking-[0.38em] text-[#f6ecd2] sm:max-w-none sm:text-[0.65rem] sm:tracking-[0.45em]">
            You are invited to the christening of
          </p>
          <StackedName size="flap" tone="gold" show className="mt-1" />

        </motion.div>
      </Flap>
      <Flap
        clip={`polygon(0 0, ${LEFT_TIP * 100}% 50%, 0 100%)`}
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
          <GoldFloral active={glowing} delay={0.2} className="h-full w-auto" />
        </div>
      </Flap>
      <Flap
        clip={`polygon(100% 0, ${RIGHT_TIP * 100}% 50%, 100% 100%)`}
        origin="100% 50%"
        background="linear-gradient(260deg, #3d2a57 0%, #563b80 55%, #6b4c9a 100%)"
        open={opened}
        rotate={{ rotateY: 80 }}
        delay={0}
        zIndex={3}
      >
        <div
          className="absolute right-[1.5%] top-1/2 -translate-y-1/2"
          style={{ height: floralHeight, transform: 'scaleX(-1)' }}
        >
          <GoldFloral active={glowing} delay={0.2} className="h-full w-auto" />
        </div>
      </Flap>

      {/* Gold seams along the folds */}
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
        <g style={{ filter: 'drop-shadow(0 0 6px rgba(247,215,130,1))' }}>
          {seams.map((d, i) => (
            <motion.path
              key={`glow-${d}`}
              d={d}
              stroke="#fff3cf"
              strokeWidth={2.6}
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                glowing
                  ? { pathLength: 1, opacity: 1 }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={{
                duration: 0.9,
                ease: 'easeOut',
                delay: 0.15 + (i % 2) * 0.06,
              }}
            />
          ))}
        </g>
      </motion.svg>

      {/* Ambient gold twinkles */}
      {[
        'left-[10%] top-[14%] size-3',
        'right-[12%] top-[20%] size-2.5',
        'left-[18%] bottom-[18%] size-3',
        'right-[16%] bottom-[14%] size-4',
        'left-[46%] top-[30%] size-2',
        'right-[40%] bottom-[30%] size-2',
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
            className="absolute left-0 top-0 size-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#f7e3a3] shadow-[0_0_20px_rgba(247,215,130,0.95),inset_0_0_14px_rgba(247,215,130,0.6)]"
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
            style={{ color: b.id % 3 === 0 ? '#fffaf0' : GOLD }}
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
            <Sparkle
              className={`${b.size} -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_8px_rgba(247,215,130,1)]`}
            />
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
            ? {
                opacity: 0,
                scale: 1.5,
                filter:
                  'brightness(1.8) drop-shadow(0px 0px 30px rgba(247,215,130,1))',
              }
            : glowing
              ? {
                  opacity: 1,
                  scale: [1, 0.9, 1.08],
                  filter:
                    'brightness(1.25) drop-shadow(0px 0px 26px rgba(247,215,130,1))',
                }
              : {
                  opacity: 1,
                  scale: 1,
                  filter:
                    'brightness(1) drop-shadow(0px 0px 10px rgba(247,215,130,0.45))',
                }
        }
        transition={{ duration: opened ? 0.6 : 0.7, ease: EASE }}
      >
        <span
          className="seal-pulse block rounded-full p-[5px]"
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
        className="pointer-events-none absolute left-1/2 top-[calc(50%+5.5rem)] z-[6] -translate-x-1/2 whitespace-nowrap rounded-full bg-[#3d2a57]/45 px-4 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-[#f6ecd2] backdrop-blur-sm sm:top-[calc(50%+6.5rem)]"
        initial={{ opacity: 0 }}
        animate={
          glowing ? { opacity: 0 } : { opacity: [0.55, 1, 0.55] }
        }
        transition={
          glowing
            ? { duration: 0.3 }
            : { duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }
        }
      >
        Tap the seal to open
      </motion.p>
    </motion.div>
  )
}
