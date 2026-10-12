import { AnimatePresence, MotionConfig } from 'framer-motion'
import { useEffect, useState } from 'react'
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

export default function ChristeningPage() {
  const [opened, setOpened] = useState(false)
  const music = useBackgroundMusic(christening.music.src)

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
            onOpen={() => setOpened(true)}
          />
        ) : null}
      </AnimatePresence>

      <FallingPetals />
      {opened ? <Navbar /> : null}
      {opened ? (
        <MusicToggle playing={music.playing} onToggle={music.toggle} />
      ) : null}

      <main>
        <HeroSection ready={opened} />
        <VerseSection />
        <ChristeningLookSection />
        <InvitationSection />
        <GodparentsSection />
        <DetailsSection />
        <Marquee />
        <GallerySection />
        <RsvpSection />
        <FooterSection />
      </main>
    </MotionConfig>
  )
}
