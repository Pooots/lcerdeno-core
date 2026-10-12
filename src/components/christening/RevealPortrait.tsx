import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useMemo } from 'react'
import { christening } from '@/content/christening'
import { FloralCluster, Sparkle } from './Ornaments'
import { StackedName } from './StackedName'

const EASE = [0.22, 1, 0.36, 1] as const
const GOLD = '#f3d98b'
const PARTICLES = 16

const ARCH = 'rounded-t-full rounded-b-[1.75rem]'

function GoldDivider({ show, delay }: { show: boolean; delay: number }) {
  return (
    <motion.div
      className="mx-auto flex w-56 items-center gap-3"
      initial={{ opacity: 0, scaleX: 0 }}
      animate={show ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4a640]" />
      <span className="size-2 rotate-45 bg-[linear-gradient(135deg,#f7e3a3,#b8862b)] shadow-[0_0_8px_rgba(247,215,130,0.9)]" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4a640]" />
    </motion.div>
  )
}

export function RevealPortrait({
  show,
  onEnter,
}: {
  show: boolean
  onEnter: () => void
}) {
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLES }, (_, i) => ({
        id: i,
        left: `${(i * 61) % 100}%`,
        size: 3 + ((i * 7) % 4),
        duration: 6 + ((i * 13) % 5),
        delay: (i * 0.45) % 4,
        drift: i % 2 ? 24 : -24,
      })),
    [],
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute bottom-[-2%] rounded-full bg-[radial-gradient(circle,#fff8e1,#e8c56a_60%,transparent_75%)] shadow-[0_0_10px_rgba(247,215,130,0.9)]"
          style={{ left: p.left, width: p.size, height: p.size }}
          initial={{ y: 0, opacity: 0 }}
          animate={
            show
              ? {
                  y: '-105vh',
                  x: [0, p.drift, 0],
                  opacity: [0, 1, 1, 0],
                }
              : { y: 0, opacity: 0 }
          }
          transition={{
            duration: p.duration,
            delay: 0.6 + p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <div className="relative w-[min(58vw,20rem,34vh)]">
          <motion.div
            className="absolute -inset-[38%] rounded-full blur-2xl"
            style={{
              background:
                'conic-gradient(from 0deg, rgba(247,215,130,0.75), rgba(185,163,220,0.55), rgba(255,248,225,0.85), rgba(212,166,64,0.6), rgba(185,163,220,0.55), rgba(247,215,130,0.75))',
            }}
            initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
            animate={
              show
                ? { opacity: 0.7, scale: 1, rotate: 360 }
                : { opacity: 0, scale: 0.5 }
            }
            transition={{
              opacity: { duration: 1.2, delay: 0.4 },
              scale: { duration: 1.4, ease: EASE, delay: 0.4 },
              rotate: { duration: 24, ease: 'linear', repeat: Infinity },
            }}
          />

          <motion.div
            className="absolute -inset-[16%]"
            initial={{ opacity: 0, rotate: 0 }}
            animate={show ? { opacity: 1, rotate: 360 } : { opacity: 0 }}
            transition={{
              opacity: { duration: 0.8, delay: 1.6 },
              rotate: { duration: 18, ease: 'linear', repeat: Infinity },
            }}
          >
            {[
              'left-1/2 top-0 size-4',
              'right-0 top-1/2 size-3',
              'left-[12%] bottom-[8%] size-3.5',
              'right-[14%] bottom-[6%] size-2.5',
            ].map((pos, i) => (
              <Sparkle
                key={pos}
                className={`absolute ${pos} drop-shadow-[0_0_6px_rgba(247,215,130,1)]`}
                style={{ color: GOLD, animationDelay: `${i * 0.4}s` }}
              />
            ))}
          </motion.div>

          <motion.div
            className={`absolute -inset-3.5 ${ARCH} border border-[#e8d29a]`}
            initial={{ opacity: 0, scale: 1.15 }}
            animate={show ? { opacity: 1, scale: 1 } : { opacity: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.9 }}
          />
          <motion.div
            className={`absolute -inset-[0.4rem] ${ARCH} border border-dashed border-[#d4a640]/60`}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={show ? { opacity: 1, scale: 1 } : { opacity: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 1.05 }}
          />

          <motion.div
            className={`relative aspect-[3/4] ${ARCH} p-[3px] shadow-[0_0_40px_6px_rgba(247,215,130,0.55),0_30px_60px_-24px_rgba(61,42,87,0.55)]`}
            style={{
              background:
                'linear-gradient(140deg, #fff3cf, #c8962e 30%, #f7e3a3 50%, #b8862b 72%, #f3d98b)',
            }}
            initial={{ opacity: 0, scale: 0.7, y: 40 }}
            animate={
              show
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.7, y: 40 }
            }
            transition={{ duration: 1.3, ease: EASE, delay: 0.55 }}
          >
            <div
              className={`relative h-full overflow-hidden ${ARCH} bg-[#e4d8f4]`}
            >
              <motion.div
                className="absolute inset-0"
                initial={{ clipPath: 'circle(0% at 50% 42%)' }}
                animate={{
                  clipPath: show
                    ? 'circle(80% at 50% 42%)'
                    : 'circle(0% at 50% 42%)',
                }}
                transition={{ duration: 1.6, ease: EASE, delay: 0.95 }}
              >
                <motion.img
                  src={christening.revealImage}
                  alt={`${christening.childName} smiling in her lavender headband`}
                  className="size-full object-cover object-[50%_30%]"
                  initial={{ scale: 1.35 }}
                  animate={show ? { scale: 1.04 } : { scale: 1.35 }}
                  transition={{ duration: 7, ease: 'easeOut', delay: 0.95 }}
                />
              </motion.div>
              <div
                className={`pointer-events-none absolute inset-0 ${ARCH} shadow-[inset_0_0_28px_rgba(61,42,87,0.28)]`}
              />
              <motion.div
                className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/55 to-transparent"
                initial={{ left: '-50%' }}
                animate={show ? { left: '130%' } : { left: '-50%' }}
                transition={{
                  duration: 1.4,
                  ease: 'easeInOut',
                  delay: 2.4,
                  repeat: Infinity,
                  repeatDelay: 3.6,
                }}
              />
            </div>
          </motion.div>

          <motion.div
            className="absolute -top-5 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, scale: 0, rotate: -90 }}
            animate={
              show
                ? { opacity: 1, scale: 1, rotate: 0 }
                : { opacity: 0, scale: 0 }
            }
            transition={{ duration: 0.9, ease: EASE, delay: 1.5 }}
          >
            <Sparkle
              className="size-9 drop-shadow-[0_0_10px_rgba(247,215,130,1)]"
              style={{ color: GOLD }}
            />
          </motion.div>

          <motion.div
            className="absolute -bottom-7 -left-14 h-24 w-32 sm:-left-16 sm:h-28 sm:w-36"
            initial={{ opacity: 0, x: -20, scale: 0.6 }}
            animate={
              show
                ? { opacity: 1, x: 0, scale: 1 }
                : { opacity: 0, x: -20, scale: 0.6 }
            }
            transition={{ duration: 1, ease: EASE, delay: 1.7 }}
          >
            <FloralCluster className="size-full" />
          </motion.div>
          <motion.div
            className="absolute -bottom-7 -right-14 h-24 w-32 sm:-right-16 sm:h-28 sm:w-36"
            initial={{ opacity: 0, x: 20, scale: 0.6 }}
            animate={
              show
                ? { opacity: 1, x: 0, scale: 1 }
                : { opacity: 0, x: 20, scale: 0.6 }
            }
            transition={{ duration: 1, ease: EASE, delay: 1.8 }}
          >
            <FloralCluster flip className="size-full" />
          </motion.div>
        </div>

        <div className="relative mt-10 text-center sm:mt-12">
          <motion.p
            className="text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-orchid sm:text-[0.68rem]"
            initial={{ opacity: 0, y: 12 }}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.9 }}
          >
            The Christening &amp; Dedication of
          </motion.p>

          <StackedName
            as="h2"
            size="reveal"
            show={show}
            delay={2.05}
            className="-mt-1"
          />

          <GoldDivider show={show} delay={2.7} />

          <motion.p
            className="font-serif mt-3 text-base italic text-plum/80 sm:text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.8, ease: EASE, delay: 2.9 }}
          >
            {christening.date.long} &middot; {christening.date.time}
          </motion.p>

          <motion.button
            type="button"
            onClick={onEnter}
            className="button-sheen pointer-events-auto relative mt-6 inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full border border-[#e8d29a] bg-[linear-gradient(135deg,#6b4c9a,#5e4389_50%,#3d2a57)] px-7 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#f6ecd2] shadow-[0_0_24px_rgba(247,215,130,0.45),0_14px_30px_-12px_rgba(61,42,87,0.7)]"
            initial={{ opacity: 0, y: 16 }}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.8, ease: EASE, delay: 3.3 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            tabIndex={show ? 0 : -1}
          >
            Open Invitation
            <ChevronDown className="size-4" />
          </motion.button>
        </div>
      </div>
    </div>
  )
}
