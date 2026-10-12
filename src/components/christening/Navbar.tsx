import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { christening } from '@/content/christening'
import { cn } from '@/lib/utils'

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#look', label: 'Her Look' },
  { href: '#invitation', label: 'Invitation' },
  { href: '#godparents', label: 'Godparents' },
  { href: '#details', label: 'Details' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#rsvp', label: 'RSVP' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('#home')
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(
      (el): el is Element => el !== null,
    )
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5] },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <motion.header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-lilac/70 bg-white/75 shadow-[0_10px_30px_-20px_rgb(61_42_87_/_0.35)] backdrop-blur-xl'
          : 'bg-transparent',
      )}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
    >
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[linear-gradient(90deg,#b9a3dc,#8a68bd,#5e4389)]"
        style={{ scaleX: progress }}
      />

      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <a
          href="#home"
          className="font-script text-3xl text-primary transition hover:text-orchid sm:text-4xl"
        >
          {christening.monogram}
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex xl:gap-1">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  'relative whitespace-nowrap rounded-full px-3 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] transition-colors xl:px-4 xl:tracking-[0.28em]',
                  active === link.href
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-primary',
                )}
              >
                {active === link.href ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-secondary"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                ) : null}
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#rsvp"
          className="button-sheen hidden rounded-full bg-primary px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-primary-foreground shadow-[0_10px_25px_-12px_rgb(94_67_137_/_0.8)] transition hover:bg-plum lg:inline-flex"
        >
          RSVP Now
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="grid size-11 place-items-center rounded-full border border-lilac bg-white/70 text-primary backdrop-blur lg:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="overflow-hidden border-t border-lilac/70 bg-white/95 backdrop-blur-xl lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="flex flex-col items-center gap-1 py-5">
              {LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      'block px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.32em]',
                      active === link.href
                        ? 'text-primary'
                        : 'text-muted-foreground',
                    )}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  )
}
