import { Sparkle } from './Ornaments'

const PHRASES = [
  'Blessed',
  'Baptized in Faith',
  'Dearly Loved',
  'A Gift from Above',
  'Child of God',
  'Wrapped in Grace',
]

export function Marquee() {
  const items = [...PHRASES, ...PHRASES]

  return (
    <div
      className="relative overflow-hidden border-y border-white/20 bg-[linear-gradient(90deg,#5e4389,#8a68bd,#5e4389)] py-5"
      aria-hidden
    >
      <div className="marquee-track flex w-max items-center whitespace-nowrap">
        {items.map((phrase, i) => (
          <span
            key={`${phrase}-${i}`}
            className="flex items-center gap-10 pr-10"
          >
            <span className="font-script text-3xl text-white sm:text-4xl">
              {phrase}
            </span>
            <Sparkle
              className="size-3.5 text-lilac"
              style={{ animationDelay: `${(i % 6) * 0.4}s` }}
            />
          </span>
        ))}
      </div>
    </div>
  )
}
