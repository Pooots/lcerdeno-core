import { AnimatePresence, MotionConfig } from 'framer-motion'
import { memo, useCallback, useEffect, useState } from 'react'
import { ChristeningLookSection } from '@/components/christening/ChristeningLookSection'
import { DetailsSection } from '@/components/christening/DetailsSection'
import { FallingPetals } from '@/components/christening/FallingPetals'
import { FooterSection } from '@/components/christening/FooterSection'
import { GallerySection } from '@/components/christening/GallerySection'
import { HeroSection } from '@/components/christening/HeroSection'
import { IntroEnvelope } from '@/components/christening/IntroEnvelope'
import { InvitationSection } from '@/components/christening/InvitationSection'
import { GodparentsSection } from '@/components/christening/GodparentsSection'
import { Marquee } from '@/components/christening/Marquee'
import { MusicToggle } from '@/components/christening/MusicToggle'
import { Navbar } from '@/components/christening/Navbar'
import { RsvpSection } from '@/components/christening/RsvpSection'
import { VerseSection } from '@/components/christening/VerseSection'
import { useBackgroundMusic } from '@/components/christening/useBackgroundMusic'
import { christening } from '@/content/christening'
import { useLiteMotion } from '@/lib/useLiteMotion'

/** Memoised so music state changes don't re-render every section. */
const PageSections = memo(function PageSections({ ready }: { ready: boolean }) {
  return (
    <>
      <HeroSection ready={ready} />
      <VerseSection />
      <ChristeningLookSection />
      <InvitationSection />
      <GodparentsSection />
      <DetailsSection />
      <Marquee />
      <GallerySection />
      <RsvpSection />
      <FooterSection />
    </>
  )
})

export default function ChristeningPage() {
  const [opened, setOpened] = useState(false)
  const [prepared, setPrepared] = useState(false)
  const music = useBackgroundMusic(christening.music.src)
  const lite = useLiteMotion()
  const handleOpen = useCallback(() => setOpened(true), [])
  const handlePrepare = useCallback(() => setPrepared(true), [])

  useEffect(() => {
    if (opened) return
    window.scrollTo(0, 0)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [opened])

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {!opened ? (
          <IntroEnvelope
            key="intro"
            onSealClick={music.play}
            onPrepare={handlePrepare}
            onOpen={handleOpen}
          />
        ) : null}
      </AnimatePresence>

      {opened ? <FallingPetals count={lite ? 9 : 16} /> : null}
      {opened ? <Navbar /> : null}
      {opened ? (
        <MusicToggle playing={music.playing} onToggle={music.toggle} />
      ) : null}

      {/* Skip rendering the page entirely while the envelope animation runs. */}
      <main
        style={{
          visibility: opened ? 'visible' : 'hidden',
          contentVisibility: opened || prepared ? 'visible' : 'hidden',
        }}
      >
        <PageSections ready={opened} />
      </main>
    </MotionConfig>
  )
}
