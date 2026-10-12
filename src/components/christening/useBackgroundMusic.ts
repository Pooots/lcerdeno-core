import { useCallback, useEffect, useRef, useState } from 'react'

const TARGET_VOLUME = 0.6
const FADE_MS = 1200

export function useBackgroundMusic(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fadeRef = useRef<number | null>(null)
  const resumeOnVisible = useRef(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = new Audio(src)
    audio.loop = true
    audio.preload = 'auto'
    audio.volume = 0
    audioRef.current = audio

    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    return () => {
      if (fadeRef.current) cancelAnimationFrame(fadeRef.current)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.pause()
      audioRef.current = null
    }
  }, [src])

  const fadeTo = useCallback((target: number, onDone?: () => void) => {
    const audio = audioRef.current
    if (!audio) return
    if (fadeRef.current) cancelAnimationFrame(fadeRef.current)

    const from = audio.volume
    const start = performance.now()
    const step = (now: number) => {
      const t = Math.min((now - start) / FADE_MS, 1)
      audio.volume = Math.min(1, Math.max(0, from + (target - from) * t))
      if (t < 1) {
        fadeRef.current = requestAnimationFrame(step)
      } else {
        fadeRef.current = null
        onDone?.()
      }
    }
    fadeRef.current = requestAnimationFrame(step)
  }, [])

  /** Must be called from a user gesture (e.g. a click) to satisfy autoplay rules. */
  const play = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio
      .play()
      .then(() => fadeTo(TARGET_VOLUME))
      .catch(() => setPlaying(false))
  }, [fadeTo])

  const pause = useCallback(() => {
    const audio = audioRef.current
    if (!audio || audio.paused) return
    fadeTo(0, () => audio.pause())
  }, [fadeTo])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) play()
    else pause()
  }, [play, pause])

  useEffect(() => {
    const onVisibility = () => {
      const audio = audioRef.current
      if (!audio) return
      if (document.hidden) {
        resumeOnVisible.current = !audio.paused
        if (!audio.paused) audio.pause()
      } else if (resumeOnVisible.current) {
        resumeOnVisible.current = false
        audio.play().catch(() => setPlaying(false))
      }
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  return { playing, play, pause, toggle }
}
