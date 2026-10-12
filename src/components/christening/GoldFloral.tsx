import { motion } from 'framer-motion'
import { useId } from 'react'
import { cn } from '@/lib/utils'

const STEM =
  'M 6 632 C 40 580, 70 540, 58 470 C 48 410, 96 370, 104 320 C 112 268, 66 236, 74 180 C 80 130, 44 92, 14 20'

/** [x, y, scale] */
const ROSES = [
  [104, 320, 1.9],
  [60, 470, 1.4],
  [74, 180, 1.3],
  [30, 585, 1],
  [22, 70, 0.9],
] as const

/** [x, y, rotation, scale] */
const LEAVES = [
  [80, 402, -32, 1.2],
  [122, 362, 22, 1],
  [40, 522, 200, 1.1],
  [86, 252, -150, 1],
  [98, 140, 32, 0.9],
  [32, 128, 212, 0.9],
  [68, 560, -22, 1],
  [134, 300, 62, 0.9],
  [50, 422, 160, 1],
  [16, 300, 190, 0.8],
] as const

/** [x, y, rotation, length] */
const SPRIGS = [
  [112, 288, -38, 92],
  [66, 452, 42, 72],
  [80, 160, -26, 62],
  [32, 600, 52, 52],
  [40, 250, -60, 50],
] as const

/** [x, y, scale] */
const BLOOMS = [
  [142, 334, 0.85],
  [46, 352, 0.7],
  [98, 212, 0.75],
  [20, 500, 0.7],
  [50, 40, 0.6],
  [96, 540, 0.65],
] as const

const PEARLS = [
  [126, 354],
  [52, 300],
  [104, 236],
  [26, 522],
  [60, 110],
  [142, 292],
  [84, 600],
  [12, 400],
] as const

function Artwork({ fill, stroke }: { fill: string; stroke: string }) {
  return (
    <g>
      <path
        d={STEM}
        fill="none"
        stroke={fill}
        strokeWidth={2.6}
        strokeLinecap="round"
      />

      {SPRIGS.map(([x, y, r, len], i) => (
        <g key={`s${i}`} transform={`translate(${x} ${y}) rotate(${r})`}>
          <path
            d={`M0 0 L0 ${-len}`}
            stroke={fill}
            strokeWidth={1.4}
            strokeLinecap="round"
          />
          {Array.from({ length: Math.floor(len / 9) }, (_, j) => {
            const yy = -len + j * 9
            return (
              <g key={j}>
                <ellipse
                  cx={-2.8}
                  cy={yy}
                  rx={2.3}
                  ry={4}
                  transform={`rotate(-28 -2.8 ${yy})`}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={0.4}
                />
                <ellipse
                  cx={2.8}
                  cy={yy + 4}
                  rx={2.3}
                  ry={4}
                  transform={`rotate(28 2.8 ${yy + 4})`}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={0.4}
                />
              </g>
            )
          })}
        </g>
      ))}

      {LEAVES.map(([x, y, r, s], i) => (
        <g
          key={`l${i}`}
          transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}
        >
          <path
            d="M0 0 C 8 -9, 22 -9, 30 0 C 22 9, 8 9, 0 0 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth={0.6}
          />
          <path d="M2 0 L 27 0" stroke={stroke} strokeWidth={0.6} />
        </g>
      ))}

      {ROSES.map(([x, y, s], i) => (
        <g key={`r${i}`} transform={`translate(${x} ${y}) scale(${s})`}>
          {Array.from({ length: 5 }, (_, p) => (
            <path
              key={p}
              d="M0 0 C -10 -5, -10 -17, 0 -20 C 10 -17, 10 -5, 0 0 Z"
              transform={`rotate(${p * 72 + 18})`}
              fill={fill}
              stroke={stroke}
              strokeWidth={0.7}
            />
          ))}
          <circle r={9} fill={fill} stroke={stroke} strokeWidth={0.7} />
          <path
            d="M0,-1 C 3,-2 4,2 1,3 C -3,4 -5,0 -3,-3 C 0,-7 6,-5 7,0 C 8,5 3,9 -2,8 C -8,7 -10,0 -7,-6"
            fill="none"
            stroke={stroke}
            strokeWidth={1}
            strokeLinecap="round"
          />
        </g>
      ))}

      {BLOOMS.map(([x, y, s], i) => (
        <g key={`b${i}`} transform={`translate(${x} ${y}) scale(${s})`}>
          {Array.from({ length: 5 }, (_, p) => (
            <ellipse
              key={p}
              cx={0}
              cy={-6.5}
              rx={4.2}
              ry={6.6}
              transform={`rotate(${p * 72})`}
              fill={fill}
              stroke={stroke}
              strokeWidth={0.5}
            />
          ))}
          <circle r={2.6} fill={stroke} />
        </g>
      ))}

      {PEARLS.map(([x, y], i) => (
        <circle key={`p${i}`} cx={x} cy={y} r={2.3} fill={fill} />
      ))}
    </g>
  )
}

const VIEWBOX = '0 0 220 640'

/**
 * Engraved gold floral column. Every layer is a static SVG; the glow and the
 * flash only fade their opacity, so the browser never re-rasterises the art
 * while animating (no animated filters or masks).
 */
export function GoldFloral({
  active,
  delay = 0,
  className,
}: {
  /** Omit for a purely decorative, non-animated floral. */
  active?: boolean
  delay?: number
  className?: string
}) {
  const id = useId().replace(/:/g, '')
  const animated = active !== undefined

  return (
    <div className={cn('relative aspect-[220/640]', className)} aria-hidden>
      <svg
        viewBox={VIEWBOX}
        preserveAspectRatio="xMinYMid meet"
        className="absolute inset-0 size-full overflow-visible"
      >
        <defs>
          <linearGradient
            id={`${id}-gold`}
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="70"
            y2="110"
            spreadMethod="reflect"
          >
            <stop offset="0" stopColor="#f7e3a3" />
            <stop offset="0.35" stopColor="#d4a640" />
            <stop offset="0.55" stopColor="#fff1c4" />
            <stop offset="0.8" stopColor="#b8862b" />
            <stop offset="1" stopColor="#e8c56a" />
          </linearGradient>
        </defs>
        <g transform="translate(1.2 2.2)" opacity={0.5}>
          <Artwork fill="#1e0f32" stroke="#1e0f32" />
        </g>
        <Artwork fill={`url(#${id}-gold)`} stroke="#9a7221" />
      </svg>

      {animated ? (
        <>
          <motion.svg
            viewBox={VIEWBOX}
            preserveAspectRatio="xMinYMid meet"
            className="absolute inset-0 size-full overflow-visible [&_*]:[stroke-linejoin:round] [&_*]:[stroke-width:5] [&_*]:[stroke:#ffe08a]"
            style={{ willChange: 'opacity' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: active ? 0.45 : 0 }}
            transition={{ duration: 0.9, delay }}
          >
            <Artwork fill="#ffe08a" stroke="#ffe08a" />
          </motion.svg>
          <motion.svg
            viewBox={VIEWBOX}
            preserveAspectRatio="xMinYMid meet"
            className="absolute inset-0 size-full overflow-visible"
            style={{ willChange: 'opacity' }}
            initial={{ opacity: 0 }}
            animate={
              active ? { opacity: [0, 0.95, 0.2, 0.7, 0] } : { opacity: 0 }
            }
            transition={{
              duration: 2.2,
              delay: delay + 0.1,
              times: [0, 0.22, 0.48, 0.68, 1],
            }}
          >
            <Artwork fill="#fff8e1" stroke="#fffbea" />
          </motion.svg>
        </>
      ) : null}
    </div>
  )
}

