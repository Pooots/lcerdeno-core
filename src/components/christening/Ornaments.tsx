import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

const BUD_COLORS = ['#b79ad8', '#9c7cc9', '#d4c3ec', '#8a68bd', '#c7b0e6']

export function LavenderSprig({
  className,
  style,
}: {
  className?: string
  style?: CSSProperties
}) {
  const buds = Array.from({ length: 12 }, (_, i) => {
    const y = 22 + i * 10.5
    const rx = 3 + i * 0.22
    const ry = 5.4 + i * 0.32
    const offset = 4 + i * 0.45
    return { i, y, rx, ry, offset }
  })

  return (
    <svg
      viewBox="0 0 80 220"
      className={cn('pointer-events-none', className)}
      style={style}
      aria-hidden
    >
      <path
        d="M40 218 C 37 170, 44 110, 40 16"
        fill="none"
        stroke="#94a88c"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <ellipse
        cx="29"
        cy="186"
        rx="3.6"
        ry="19"
        fill="#a8bba0"
        transform="rotate(-28 29 186)"
      />
      <ellipse
        cx="51"
        cy="174"
        rx="3.2"
        ry="17"
        fill="#b8c9b0"
        transform="rotate(26 51 174)"
      />
      <ellipse cx="40" cy="14" rx="2.6" ry="4.6" fill="#d4c3ec" />
      {buds.map(({ i, y, rx, ry, offset }) => (
        <g key={i}>
          <ellipse
            cx={40 - offset}
            cy={y}
            rx={rx}
            ry={ry}
            fill={BUD_COLORS[i % BUD_COLORS.length]}
            transform={`rotate(-32 ${40 - offset} ${y})`}
          />
          <ellipse
            cx={40 + offset}
            cy={y + 4}
            rx={rx}
            ry={ry}
            fill={BUD_COLORS[(i + 2) % BUD_COLORS.length]}
            transform={`rotate(32 ${40 + offset} ${y + 4})`}
          />
        </g>
      ))}
    </svg>
  )
}

export function LeafSprig({
  className,
  style,
}: {
  className?: string
  style?: CSSProperties
}) {
  const leaves = Array.from({ length: 7 }, (_, i) => ({ i, y: 30 + i * 22 }))

  return (
    <svg
      viewBox="0 0 80 200"
      className={cn('pointer-events-none', className)}
      style={style}
      aria-hidden
    >
      <path
        d="M40 198 C 44 150, 34 90, 42 12"
        fill="none"
        stroke="#94a88c"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {leaves.map(({ i, y }) => (
        <g key={i}>
          <ellipse
            cx="30"
            cy={y}
            rx="9"
            ry="4.2"
            fill={i % 2 ? '#b8c9b0' : '#a3b79b'}
            transform={`rotate(-30 30 ${y})`}
          />
          <ellipse
            cx="51"
            cy={y + 9}
            rx="9"
            ry="4.2"
            fill={i % 2 ? '#a3b79b' : '#c3d2bb'}
            transform={`rotate(30 51 ${y + 9})`}
          />
        </g>
      ))}
    </svg>
  )
}

export function FlowerBloom({
  className,
  petal = '#ffffff',
  center = '#8a68bd',
  style,
}: {
  className?: string
  petal?: string
  center?: string
  style?: CSSProperties
}) {
  return (
    <svg
      viewBox="-20 -20 40 40"
      className={cn('pointer-events-none', className)}
      style={style}
      aria-hidden
    >
      {Array.from({ length: 5 }, (_, i) => (
        <ellipse
          key={i}
          cx="0"
          cy="-9"
          rx="6.4"
          ry="9.5"
          fill={petal}
          stroke="#d9c8f0"
          strokeWidth="0.6"
          transform={`rotate(${i * 72})`}
        />
      ))}
      <circle r="3.6" fill={center} />
      <circle r="1.5" fill="#f4e7b4" />
    </svg>
  )
}

export function FloralCluster({
  className,
  flip = false,
}: {
  className?: string
  flip?: boolean
}) {
  return (
    <div
      className={cn('pointer-events-none relative', className)}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
      aria-hidden
    >
      <div
        className="absolute bottom-0 left-[4%] h-[78%] origin-bottom"
        style={{ transform: 'rotate(-38deg)' }}
      >
        <LeafSprig
          className="sway h-full w-auto"
          style={{ animationDelay: '0.6s' }}
        />
      </div>
      <div
        className="absolute bottom-0 left-[18%] h-[95%] origin-bottom"
        style={{ transform: 'rotate(-12deg)' }}
      >
        <LavenderSprig className="sway h-full w-auto" />
      </div>
      <div
        className="absolute bottom-0 left-[34%] h-[72%] origin-bottom"
        style={{ transform: 'rotate(8deg)' }}
      >
        <LavenderSprig
          className="sway h-full w-auto"
          style={{ animationDelay: '1.2s' }}
        />
      </div>
      <div
        className="absolute bottom-0 left-[48%] h-[64%] origin-bottom"
        style={{ transform: 'rotate(30deg)' }}
      >
        <LeafSprig
          className="sway h-full w-auto"
          style={{ animationDelay: '2s' }}
        />
      </div>
      <FlowerBloom className="absolute bottom-[6%] left-[30%] size-[26%]" />
      <FlowerBloom
        className="absolute bottom-[2%] left-[48%] size-[18%]"
        petal="#e4d8f4"
        center="#5e4389"
      />
      <FlowerBloom
        className="absolute bottom-[18%] left-[14%] size-[15%]"
        petal="#d4c3ec"
      />
    </div>
  )
}

export function Sparkle({
  className,
  style,
}: {
  className?: string
  style?: CSSProperties
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn('sparkle pointer-events-none', className)}
      style={style}
      aria-hidden
    >
      <path
        d="M12 0 L13.6 10.4 L24 12 L13.6 13.6 L12 24 L10.4 13.6 L0 12 L10.4 10.4 Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function FlourishDivider({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 28"
      className={cn('pointer-events-none h-7 w-60', className)}
      aria-hidden
    >
      <defs>
        <linearGradient id="flourish-fade-l" x1="0" x2="1">
          <stop offset="0" stopColor="#b9a3dc" stopOpacity="0" />
          <stop offset="1" stopColor="#8a68bd" />
        </linearGradient>
        <linearGradient id="flourish-fade-r" x1="1" x2="0">
          <stop offset="0" stopColor="#b9a3dc" stopOpacity="0" />
          <stop offset="1" stopColor="#8a68bd" />
        </linearGradient>
      </defs>
      <path
        d="M2 14 H 84 C 92 14, 96 6, 102 8 C 107 10, 104 17, 99 15"
        fill="none"
        stroke="url(#flourish-fade-l)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M238 14 H 156 C 148 14, 144 6, 138 8 C 133 10, 136 17, 141 15"
        fill="none"
        stroke="url(#flourish-fade-r)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M120 3 V 25 M 113 10 H 127"
        stroke="#8a68bd"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="108" cy="14" r="1.6" fill="#b9a3dc" />
      <circle cx="132" cy="14" r="1.6" fill="#b9a3dc" />
    </svg>
  )
}

export function MonogramSeal({
  letters,
  className,
}: {
  letters: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative grid place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#a585d4,#6b4c9a_55%,#4a3270)] text-white',
        className,
      )}
    >
      <div className="absolute inset-[7%] rounded-full border border-white/35" />
      <div className="absolute inset-[14%] rounded-full border border-dashed border-white/25" />
      <span className="font-script relative text-[1.9em] leading-none drop-shadow-[0_2px_2px_rgb(0_0_0_/_0.25)]">
        {letters}
      </span>
    </div>
  )
}
