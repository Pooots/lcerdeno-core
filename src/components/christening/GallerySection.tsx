import { motion } from 'framer-motion'
import { Expand } from 'lucide-react'
import { useState } from 'react'
import { christening } from '@/content/christening'
import { cn } from '@/lib/utils'
import { Lightbox } from './Lightbox'
import { SectionHeading } from './Reveal'

export function GallerySection() {
  const [open, setOpen] = useState<number | null>(null)
  const photos = christening.gallery

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-mist py-24 sm:py-32"
    >
      <div className="lace-pattern pointer-events-none absolute inset-0 opacity-60" />
      <div className="watercolor-blob pointer-events-none absolute -left-32 top-1/3 size-[26rem] rounded-full bg-lavender/30 blur-3xl" />

      <SectionHeading
        eyebrow="Precious moments"
        title="Our Little Blessing"
        subtitle="Every smile, a prayer answered"
        className="relative px-6"
      />

      <div className="relative mx-auto mt-16 grid max-w-6xl grid-cols-2 gap-3 px-4 sm:gap-5 sm:px-6 md:h-[640px] md:grid-cols-4 md:grid-rows-2">
        {photos.map((photo, i) => (
          <motion.button
            key={photo.src}
            type="button"
            onClick={() => setOpen(i)}
            className={cn(
              'group relative overflow-hidden rounded-[1.75rem] border-[5px] border-white bg-white shadow-[0_30px_60px_-36px_rgb(61_42_87_/_0.7)]',
              i === 0
                ? 'col-span-2 aspect-[4/5] md:row-span-2 md:aspect-auto'
                : 'aspect-[3/4] md:aspect-auto',
            )}
            initial={{ opacity: 0, y: 60, rotate: i % 2 ? 3 : -3, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 1,
              delay: i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            aria-label={`Open photo: ${photo.caption}`}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className={cn(
                'size-full object-cover transition duration-[1.4s] ease-out group-hover:scale-110',
                i === 0 ? 'object-[50%_38%]' : 'object-[50%_30%]',
              )}
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgb(61_42_87_/_0.75))] opacity-70 transition duration-700 group-hover:opacity-100" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 sm:p-5">
              <span
                className={cn(
                  'font-script translate-y-2 text-left text-white drop-shadow transition duration-700 group-hover:translate-y-0',
                  i === 0 ? 'text-4xl sm:text-5xl' : 'text-2xl sm:text-3xl',
                )}
              >
                {photo.caption}
              </span>
              <span className="grid size-9 shrink-0 scale-75 place-items-center rounded-full bg-white/90 text-primary opacity-0 transition duration-500 group-hover:scale-100 group-hover:opacity-100">
                <Expand className="size-4" />
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      <Lightbox
        images={photos}
        index={open}
        onClose={() => setOpen(null)}
        onIndexChange={setOpen}
      />
    </section>
  )
}
