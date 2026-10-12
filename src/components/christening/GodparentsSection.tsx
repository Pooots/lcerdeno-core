import { animate, motion, useInView } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { christening } from '@/content/christening'
import { GoldFloral } from './GoldFloral'
import { Sparkle } from './Ornaments'
import { Reveal } from './Reveal'

const EASE = [0.22, 1, 0.36, 1] as const
const GOLD = '#f3d98b'

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.8 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value])

  return <span ref={ref}>{display}</span>
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center px-4 sm:px-8">
      <span className="font-serif text-gold text-5xl font-semibold leading-none sm:text-6xl">
        <CountUp value={value} />
      </span>
      <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.38em] text-lilac sm:text-[0.65rem]">
        {label}
      </span>
    </div>
  )
}

function NameCard({
  title,
  name,
  index,
}: {
  title: string
  name: string
  index: number
}) {
  return (
    <motion.li
      className="group relative overflow-hidden rounded-2xl border border-[#e8d29a]/25 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(255,255,255,0.03))] px-3 py-3.5 text-center shadow-[0_12px_30px_-18px_rgba(0,0,0,0.6)] transition-[border-color,box-shadow] duration-300 hover:border-[#e8d29a]/80 hover:shadow-[0_0_28px_-4px_rgba(247,215,130,0.45)]"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        ease: EASE,
        delay: 0.1 + (index % 6) * 0.06,
      }}
      whileHover={{ y: -4 }}
    >
      <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-[#fff3cf]/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[400%]" />
      <span className="block text-[0.55rem] font-semibold uppercase tracking-[0.42em] text-[#e8c56a]">
        {title}
      </span>
      <span className="font-serif mt-0.5 block truncate text-xl font-semibold text-[#fbf5e6] sm:text-[1.4rem]">
        {name}
      </span>
    </motion.li>
  )
}

function GodparentPanel({
  title,
  caption,
  names,
  delay,
}: {
  title: 'Ninang' | 'Ninong'
  caption: string
  names: readonly string[]
  delay: number
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="relative h-full overflow-hidden rounded-[2rem] border border-[#e8d29a]/35 bg-white/[0.05] p-5 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)] backdrop-blur-sm sm:p-8">
        <div className="pointer-events-none absolute inset-2.5 rounded-[1.6rem] border border-dashed border-[#e8d29a]/25" />
        <motion.div
          className="pointer-events-none absolute inset-y-0 left-0 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-[#f7e3a3]/10 to-transparent"
          initial={{ x: '-150%' }}
          animate={{ x: '550%' }}
          transition={{
            duration: 2.4,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 4,
            delay: delay + 1,
          }}
        />

        <div className="relative text-center">
          <p className="font-script text-gold text-6xl leading-none sm:text-7xl">
            {title}
          </p>
          <p className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.4em] text-lilac">
            {caption}
          </p>
          <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#e8d29a]/40 bg-[#e8d29a]/10 px-4 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[#f3d98b]">
            <Heart className="size-3 fill-current" />
            {names.length} {title === 'Ninang' ? 'Godmothers' : 'Godfathers'}
          </span>
        </div>

        <ul className="relative mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {names.map((name, i) => (
            <NameCard
              key={`${title}-${name}`}
              title={title}
              name={name}
              index={i}
            />
          ))}
        </ul>
      </div>
    </Reveal>
  )
}

export function GodparentsSection() {
  const { ninang, ninong } = christening.godparents
  const total = ninang.length + ninong.length

  return (
    <section
      id="godparents"
      className="relative overflow-hidden bg-[linear-gradient(165deg,#5e4389_0%,#4b3473_40%,#3d2a57_75%,#2e1f45_100%)] text-white"
    >
      <div
        className="scallop-bottom relative z-10"
        style={{ '--scallop-color': '#f6f1fc' } as CSSProperties}
      />
      <div className="lace-pattern pointer-events-none absolute inset-0 opacity-15" />
      <div className="pointer-events-none absolute -left-40 top-1/4 size-[32rem] rounded-full bg-orchid/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-10 size-[34rem] rounded-full bg-[#e8c56a]/10 blur-3xl" />

      <div
        className="pointer-events-none absolute -left-6 top-[30%] hidden h-[34rem] -translate-y-1/2 opacity-25 xl:block"
        aria-hidden
      >
        <GoldFloral className="h-full" />
      </div>
      <div
        className="pointer-events-none absolute -right-6 top-[70%] hidden h-[34rem] -translate-y-1/2 -scale-x-100 opacity-25 xl:block"
        aria-hidden
      >
        <GoldFloral className="h-full" />
      </div>

      {[
        'left-[12%] top-[10%] size-3',
        'right-[14%] top-[16%] size-4',
        'left-[8%] bottom-[22%] size-3',
        'right-[10%] bottom-[12%] size-2.5',
        'left-1/2 top-[6%] size-2.5',
      ].map((pos, i) => (
        <Sparkle
          key={pos}
          className={`absolute ${pos}`}
          style={{ color: GOLD, animationDelay: `${i * 0.6}s` }}
        />
      ))}

      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.42em] text-[#e8c56a]">
              With love &amp; gratitude
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-script text-gold mt-1 text-5xl leading-tight text-balance sm:text-7xl">
              Our Ninong &amp; Ninang
            </h2>
          </Reveal>
          <Reveal delay={0.2} className="mt-2 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4a640]" />
            <span className="size-2 rotate-45 bg-[linear-gradient(135deg,#f7e3a3,#b8862b)] shadow-[0_0_8px_rgba(247,215,130,0.9)]" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4a640]" />
          </Reveal>
          <Reveal delay={0.3}>
            <p className="font-serif mt-4 text-lg italic text-lilac sm:text-xl">
              Thank you for saying yes to walking beside our little{' '}
              {christening.nameLead} in faith, love, and prayer. Your
              presence is a blessing to our family.
            </p>
          </Reveal>
        </div>

        <Reveal
          delay={0.35}
          className="mx-auto mt-10 flex w-fit items-center divide-x divide-[#e8d29a]/25 rounded-full border border-[#e8d29a]/30 bg-white/[0.05] px-2 py-4 backdrop-blur-sm sm:px-4"
        >
          <Stat value={ninang.length} label="Ninang" />
          <Stat value={ninong.length} label="Ninong" />
          <Stat value={total} label="Godparents" />
        </Reveal>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
          <GodparentPanel
            title="Ninang"
            caption="Our beloved godmothers"
            names={ninang}
            delay={0.1}
          />
          <GodparentPanel
            title="Ninong"
            caption="Our beloved godfathers"
            names={ninong}
            delay={0.25}
          />
        </div>

        <Reveal delay={0.2} className="mt-14 text-center">
          <p className="font-script text-gold text-4xl sm:text-5xl">
            For our Dearest Ninong and Ninang
          </p>
          <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-lilac">
            {christening.family}
          </p>
        </Reveal>
      </div>

      <div
        className="scallop-top relative"
        style={{ '--scallop-color': '#f6f1fc' } as CSSProperties}
      />
    </section>
  )
}
