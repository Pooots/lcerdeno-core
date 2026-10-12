import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useCallback, useEffect } from 'react'

export type LightboxImage = {
  src: string
  alt: string
  caption?: string
}

export function Lightbox({
  images,
  index,
  onClose,
  onIndexChange,
}: {
  images: readonly LightboxImage[]
  index: number | null
  onClose: () => void
  onIndexChange: (index: number) => void
}) {
  const open = index !== null
  const count = images.length

  const step = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return
      onIndexChange((index + dir + count) % count)
    },
    [index, count, onIndexChange],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose, step])

  const current = index !== null ? images[index] : null

  return (
    <AnimatePresence>
      {current ? (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#21162f]/85 px-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>

          {count > 1 ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  step(-1)
                }}
                className="absolute left-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-6"
                aria-label="Previous photo"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  step(1)
                }}
                className="absolute right-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6"
                aria-label="Next photo"
              >
                <ChevronRight className="size-6" />
              </button>
            </>
          ) : null}

          <AnimatePresence mode="wait">
            <motion.figure
              key={current.src}
              className="relative flex max-h-[88vh] max-w-[92vw] flex-col items-center"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              drag={count > 1 ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) step(1)
                else if (info.offset.x > 80) step(-1)
              }}
            >
              <img
                src={current.src}
                alt={current.alt}
                className="max-h-[78vh] w-auto rounded-2xl border-4 border-white object-contain shadow-2xl"
                draggable={false}
              />
              {current.caption ? (
                <figcaption className="font-script mt-4 text-3xl text-lilac">
                  {current.caption}
                </figcaption>
              ) : null}
            </motion.figure>
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
