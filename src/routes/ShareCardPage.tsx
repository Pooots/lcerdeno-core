import { Heart } from 'lucide-react'
import { christening } from '@/content/christening'
import {
  FloralCluster,
  FlowerBloom,
  LavenderSprig,
} from '@/components/christening/Ornaments'

/**
 * Social-media preview card (Open Graph image), rendered at exactly 1200x630.
 * Screenshot this page to regenerate `public/og-image.jpg`.
 */

const HEARTS = [
  { left: 34, top: 40, size: 14 },
  { left: 78, top: 24, size: 9 },
  { left: 20, top: 62, size: 10 },
  { left: 64, top: 70, size: 8 },
  { left: 70, top: 48, size: 12 },
  { left: 26, top: 30, size: 8 },
  { left: 82, top: 60, size: 10 },
  { left: 16, top: 46, size: 7 },
] as const

/** Crop of the portrait inside `portrait-frame.png` (752x1024 source pixels). */
const CROP = { x: 250, y: 196, w: 276, h: 480 }
const PHOTO_W = 236
const SCALE = PHOTO_W / CROP.w

function SideDate() {
  const { date } = christening
  return (
    <div className="flex flex-col items-center text-center text-primary">
      <p className="text-[0.8rem] font-semibold uppercase tracking-[0.45em] text-orchid">
        Save the Date
      </p>
      <div className="mt-5 h-px w-24 bg-gradient-to-r from-transparent via-lavender to-transparent" />
      <p className="mt-5 text-sm font-semibold uppercase tracking-[0.4em]">
        {date.weekday}
      </p>
      <p className="font-serif mb-3 text-[6.5rem] font-semibold leading-[0.95]">
        {date.day}
      </p>
      <p className="text-sm font-semibold uppercase tracking-[0.4em]">
        {date.month} {date.year}
      </p>
      <div className="mt-5 h-px w-24 bg-gradient-to-r from-transparent via-lavender to-transparent" />
      <p className="font-serif mt-4 text-2xl italic">{date.time}</p>
    </div>
  )
}

function SideVenue() {
  return (
    <div className="flex flex-col items-center text-center text-primary">
      <p className="text-[0.8rem] font-semibold uppercase tracking-[0.45em] text-orchid">
        You&rsquo;re Invited
      </p>
      <div className="mt-5 h-px w-24 bg-gradient-to-r from-transparent via-lavender to-transparent" />
      <p className="font-serif mt-5 text-[1.55rem] font-semibold leading-snug">
        Our Lady of The
        <br />
        Holy Rosary Parish
      </p>
      <p className="font-serif mt-2 text-lg italic text-plum/75">
        Amaya VI, Tanza, Cavite
      </p>
      <div className="mt-5 h-px w-24 bg-gradient-to-r from-transparent via-lavender to-transparent" />
      <p className="mt-5 rounded-full bg-primary px-6 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.35em] text-white shadow-[0_12px_24px_-12px_rgba(61,42,87,0.8)]">
        Kindly RSVP
      </p>
    </div>
  )
}

export default function ShareCardPage() {
  return (
    <div className="relative h-[630px] w-[1200px] overflow-hidden bg-[radial-gradient(circle_at_50%_40%,#efe7fa,#d9c8f0_70%,#cbb6ea)]">
      <div className="lace-pattern absolute inset-0 opacity-70" />

      <div className="absolute inset-y-0 left-0 grid w-[250px] place-items-center">
        <SideDate />
      </div>
      <div className="absolute inset-y-0 right-0 grid w-[250px] place-items-center">
        <SideVenue />
      </div>

      <FloralCluster className="absolute -bottom-4 -left-6 h-40 w-44" />
      <FloralCluster flip className="absolute -bottom-4 -right-6 h-40 w-44" />

      {/* Invitation card, modelled on the printed template */}
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[660px] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] bg-white/70 p-2.5 shadow-[0_30px_60px_-30px_rgba(61,42,87,0.6)]">
        <div className="relative h-full overflow-hidden rounded-[1.6rem] border border-lavender/70 bg-[radial-gradient(ellipse_at_50%_48%,#f1e9fb_0%,#fbf8f1_55%,#f8f3ea_100%)]">
          <div className="pointer-events-none absolute inset-2 rounded-[1.3rem] border border-dashed border-lavender/80" />

          {HEARTS.map((h, i) => (
            <Heart
              key={i}
              className="absolute fill-current text-[#c5b0e6]"
              style={{
                left: `${h.left}%`,
                top: `${h.top}%`,
                width: h.size,
                height: h.size,
              }}
            />
          ))}

          <div className="absolute bottom-0 left-3 flex h-44 items-end">
            <LavenderSprig className="h-40 w-auto -rotate-12" />
            <LavenderSprig className="-ml-6 h-32 w-auto rotate-6" />
            <FlowerBloom className="absolute bottom-3 left-8 size-12" />
          </div>
          <div className="absolute bottom-0 right-3 flex h-44 -scale-x-100 items-end">
            <LavenderSprig className="h-40 w-auto -rotate-12" />
            <LavenderSprig className="-ml-6 h-32 w-auto rotate-6" />
            <FlowerBloom className="absolute bottom-3 left-8 size-12" />
          </div>

          <div className="relative flex h-full flex-col items-center pt-7 text-center">
            <p className="font-script text-[2.1rem] leading-none text-plum">
              With Joyful Hearts and Blessings,
            </p>
            <p className="font-serif mt-1.5 text-[2.35rem] font-semibold leading-tight text-[#2e2440]">
              The Christening and Dedication
            </p>
            <p className="font-script text-[1.9rem] leading-none text-plum">
              of our beloved daughter
            </p>

            <div
              className="absolute left-1/2 top-[136px] -translate-x-1/2"
              style={{ width: PHOTO_W + 60, height: CROP.h * SCALE }}
            >
              <div className="absolute inset-x-0 top-0 aspect-square rounded-full bg-[radial-gradient(circle,rgba(201,180,236,0.9),rgba(228,216,244,0.5)_45%,transparent_70%)]" />
              <div
                className="absolute left-1/2 top-0 -translate-x-1/2 overflow-hidden"
                style={{
                  width: PHOTO_W,
                  height: CROP.h * SCALE,
                  maskImage:
                    'radial-gradient(ellipse 52% 56% at 50% 44%, black 66%, transparent 100%)',
                  WebkitMaskImage:
                    'radial-gradient(ellipse 52% 56% at 50% 44%, black 66%, transparent 100%)',
                }}
              >
                <img
                  src={christening.heroImage}
                  alt=""
                  className="absolute max-w-none"
                  style={{
                    width: 752 * SCALE,
                    height: 1024 * SCALE,
                    left: -CROP.x * SCALE,
                    top: -CROP.y * SCALE,
                  }}
                />
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-6">
              <p className="font-script text-[1.95rem] leading-none text-plum">
                For our Dearest Ninong and Ninang
              </p>
              <p className="font-serif mt-1 text-[3.1rem] font-semibold leading-tight text-[#2e2440]">
                {christening.childName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
