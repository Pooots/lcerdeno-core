import { useMemo } from 'react'
import type { CSSProperties } from 'react'

const PETAL_COLORS = ['#d4c3ec', '#b9a3dc', '#e4d8f4', '#c7b0e6', '#ffffff']

function seeded(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

export function FallingPetals({ count = 18 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const r = (n: number) => seeded(i * 7 + n)
        return {
          id: i,
          left: `${r(1) * 100}%`,
          size: 10 + r(2) * 14,
          color: PETAL_COLORS[i % PETAL_COLORS.length],
          style: {
            '--petal-duration': `${12 + r(3) * 12}s`,
            '--petal-delay': `${-r(4) * 20}s`,
            '--petal-drift': `${(r(5) - 0.5) * 220}px`,
            '--petal-spin': `${360 + r(6) * 540}deg`,
            '--petal-opacity': `${0.45 + r(7) * 0.45}`,
          } as CSSProperties,
        }
      }),
    [count],
  )

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
    >
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{ ...p.style, left: p.left }}
        >
          <svg
            className="petal-sway block"
            width={p.size}
            height={p.size * 1.3}
            viewBox="0 0 20 26"
          >
            <path
              d="M10 0 C 18 6, 20 16, 10 26 C 0 16, 2 6, 10 0 Z"
              fill={p.color}
              stroke="rgb(94 67 137 / 0.18)"
              strokeWidth="0.8"
            />
            <path
              d="M10 3 C 11 10, 11 17, 10 23"
              stroke="#ffffff"
              strokeOpacity="0.55"
              strokeWidth="0.8"
              fill="none"
            />
          </svg>
        </span>
      ))}
    </div>
  )
}
