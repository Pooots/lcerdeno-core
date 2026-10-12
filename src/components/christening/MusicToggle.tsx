import { AnimatePresence, motion } from 'framer-motion'
import { Music2, Pause, Play } from 'lucide-react'
import { useState } from 'react'
import { christening } from '@/content/christening'
import { cn } from '@/lib/utils'

const BARS = [0.55, 1, 0.7, 0.9]

export function MusicToggle({
  playing,
  onToggle,
}: {
  playing: boolean
  onToggle: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const { title, artist } = christening.music

  return (
    <motion.div
      className="fixed bottom-5 right-4 z-[60] flex items-center gap-3 sm:bottom-8 sm:right-8"
      initial={{ opacity: 0, x: 40, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered ? (
          <motion.div
            className="hidden items-center gap-3 rounded-full border border-lilac bg-white/90 py-2 pl-4 pr-5 shadow-[0_18px_40px_-20px_rgb(61_42_87_/_0.7)] backdrop-blur-xl sm:flex"
            initial={{ opacity: 0, x: 16, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 16, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Music2 className="size-4 text-orchid" />
            <div className="leading-tight">
              <p className="text-[0.55rem] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                {playing ? 'Now playing' : 'Paused'}
              </p>
              <p className="font-serif text-sm font-semibold text-primary">
                {title}
                <span className="font-normal italic text-muted-foreground">
                  {' '}
                  · {artist}
                </span>
              </p>
            </div>
            <div className="ml-1 flex h-4 items-end gap-[3px]" aria-hidden>
              {BARS.map((h, i) => (
                <motion.span
                  key={i}
                  className="h-full w-[3px] origin-bottom rounded-full bg-orchid"
                  initial={{ scaleY: 0.25 }}
                  animate={
                    playing
                      ? { scaleY: [0.3, h, 0.4, 0.85, 0.3] }
                      : { scaleY: 0.25 }
                  }
                  transition={
                    playing
                      ? {
                          duration: 1.1 + i * 0.15,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }
                      : { duration: 0.3 }
                  }
                />
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={onToggle}
        className="relative grid size-14 place-items-center rounded-full text-white sm:size-16"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.92 }}
        aria-label={playing ? 'Pause music' : 'Play music'}
        aria-pressed={playing}
      >
        <span
          className={cn(
            'absolute -inset-2 rounded-full border border-dashed border-orchid/60',
            playing ? 'spin-slow' : 'opacity-40',
          )}
          style={{ animationDuration: '8s' }}
        />
        {playing ? (
          <motion.span
            className="absolute inset-0 rounded-full bg-lavender/50"
            animate={{ scale: [1, 1.45], opacity: [0.6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
          />
        ) : null}
        <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,#a585d4,#6b4c9a_55%,#4a3270)] shadow-[0_14px_30px_-10px_rgb(61_42_87_/_0.8)]" />
        <span className="absolute inset-[5px] rounded-full border border-white/30" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={playing ? 'pause' : 'play'}
            className="relative"
            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
            transition={{ duration: 0.25 }}
          >
            {playing ? (
              <Pause className="size-5 fill-current sm:size-6" />
            ) : (
              <Play className="ml-0.5 size-5 fill-current sm:size-6" />
            )}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </motion.div>
  )
}
