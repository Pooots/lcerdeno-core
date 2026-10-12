import { motion } from 'framer-motion'
import {
  CalendarHeart,
  CalendarPlus,
  Church,
  Clock,
  MapPin,
  Navigation,
  Sparkles,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { christening, mapsEmbedUrl, mapsSearchUrl } from '@/content/christening'
import { downloadIcs, googleCalendarUrl } from '@/lib/calendar'
import { LavenderSprig, Sparkle } from './Ornaments'
import { Reveal, SectionHeading } from './Reveal'

type Venue = {
  label: string
  time: string
  venue: string
  address: string
  mapQuery: string
}

const calendarEvent = {
  title: `Christening of ${christening.childName}`,
  description: `With joyful hearts and blessings, join us for the Christening and Dedication of ${christening.childName}.\n\nCeremony: ${christening.ceremony.venue}, ${christening.ceremony.address} at ${christening.ceremony.time}\nReception: ${christening.reception.address}`,
  location: `${christening.ceremony.venue}, ${christening.ceremony.address}`,
  startsAt: christening.startsAt,
  endsAt: christening.endsAt,
}

function VenueCard({
  venue,
  icon: Icon,
  index,
}: {
  venue: Venue
  icon: LucideIcon
  index: number
}) {
  return (
    <Reveal delay={index * 0.15} y={50}>
      <motion.article
        className="group relative h-full overflow-hidden rounded-[2rem] border border-lilac bg-white p-2 shadow-[0_30px_60px_-40px_rgb(61_42_87_/_0.6)]"
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      >
        <div className="paper relative flex h-full flex-col rounded-[1.6rem] px-6 pb-6 pt-8 sm:px-8">
          <div className="pointer-events-none absolute inset-2.5 rounded-[1.3rem] border border-dashed border-lavender/70" />

          <div className="relative flex items-center gap-4">
            <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(140deg,#8a68bd,#5e4389)] text-white shadow-[0_14px_30px_-14px_rgb(94_67_137_/_0.9)] transition duration-500 group-hover:rotate-6">
              <Icon className="size-6" />
            </div>
            <div>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.38em] text-orchid">
                {venue.label}
              </p>
              <h3 className="font-serif mt-1 text-2xl font-semibold leading-tight text-primary sm:text-[1.7rem]">
                {venue.venue}
              </h3>
            </div>
          </div>

          <div className="relative mt-6 space-y-3 text-sm text-muted-foreground">
            <p className="flex items-start gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-orchid" />
              <span>
                <span className="font-semibold text-foreground">
                  {christening.date.long}
                </span>
                <br />
                {venue.time}
              </span>
            </p>
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-orchid" />
              <span>{venue.address}</span>
            </p>
          </div>

          <div className="relative mt-6 overflow-hidden rounded-2xl border border-lilac">
            <iframe
              title={`Map to ${venue.venue}`}
              src={mapsEmbedUrl(venue.mapQuery)}
              className="h-48 w-full grayscale-[35%] saturate-[0.85] transition duration-700 group-hover:grayscale-0 group-hover:saturate-100"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute inset-0 bg-orchid/10 mix-blend-multiply transition duration-700 group-hover:opacity-0" />
          </div>

          <a
            href={mapsSearchUrl(venue.mapQuery)}
            target="_blank"
            rel="noreferrer"
            className="relative mt-6 inline-flex items-center justify-center gap-2 self-start rounded-full bg-secondary px-5 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            <Navigation className="size-3.5" />
            Get Directions
          </a>
        </div>
      </motion.article>
    </Reveal>
  )
}

export function DetailsSection() {
  return (
    <section
      id="details"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f6f1fc_0%,#fdfbff_35%,#fdfbff_100%)] py-24 sm:py-32"
    >
      <LavenderSprig className="sway absolute -left-6 top-24 hidden h-72 w-auto -rotate-12 opacity-40 lg:block" />
      <LavenderSprig
        className="sway absolute -right-6 bottom-24 hidden h-72 w-auto opacity-40 lg:block"
        style={{ animationDelay: '2s' }}
      />

      <SectionHeading
        eyebrow="The celebration"
        title="When & Where"
        subtitle="We would be honored by your presence"
        className="px-6"
      />

      <Reveal delay={0.2} className="mx-auto mt-14 max-w-xl px-6">
        <div className="relative overflow-hidden rounded-full border border-lilac bg-white/80 px-6 py-4 text-center shadow-[0_18px_40px_-30px_rgb(61_42_87_/_0.7)] backdrop-blur">
          <div className="flex items-center justify-center gap-3 text-primary">
            <CalendarHeart className="size-5 text-orchid" />
            <span className="font-serif text-xl font-semibold sm:text-2xl">
              {christening.date.long}
            </span>
          </div>
        </div>
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-6xl gap-8 px-6 md:grid-cols-2">
        <VenueCard venue={christening.ceremony} icon={Church} index={0} />
        <VenueCard venue={christening.reception} icon={Sparkles} index={1} />
      </div>

      <Reveal delay={0.1} className="mt-12 flex flex-wrap justify-center gap-3 px-6">
        <a
          href={googleCalendarUrl(calendarEvent)}
          target="_blank"
          rel="noreferrer"
          className="button-sheen inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-primary-foreground shadow-[0_16px_34px_-16px_rgb(94_67_137_/_0.9)] transition hover:-translate-y-0.5 hover:bg-plum"
        >
          <CalendarPlus className="size-4" />
          Add to Google Calendar
        </a>
        <button
          type="button"
          onClick={() =>
            downloadIcs(calendarEvent, 'LC-Cerdeno-Christening.ics')
          }
          className="inline-flex items-center gap-2 rounded-full border border-lavender bg-white px-6 py-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-primary transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-18px_rgb(61_42_87_/_0.7)]"
        >
          <CalendarHeart className="size-4" />
          Apple / Outlook
        </button>
      </Reveal>

      <Reveal delay={0.1} className="mx-auto mt-20 max-w-3xl px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-lilac bg-[linear-gradient(140deg,#ffffff,#f3ecfc)] px-6 py-10 text-center sm:px-12">
          <Sparkle className="absolute left-8 top-8 size-4 text-lavender" />
          <Sparkle
            className="absolute bottom-8 right-10 size-3 text-orchid"
            style={{ animationDelay: '1.4s' }}
          />
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.42em] text-orchid">
            Color Motif
          </p>
          <p className="font-script text-shimmer mt-2 text-4xl sm:text-5xl">
            Lavender Dreams
          </p>
          <p className="font-serif mt-3 text-lg italic text-muted-foreground">
            {christening.motif.note}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-5 sm:gap-8">
            {christening.motif.colors.map((color, i) => (
              <motion.div
                key={color.hex}
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.4 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: 'spring',
                  stiffness: 220,
                  damping: 14,
                  delay: 0.2 + i * 0.12,
                }}
              >
                <motion.span
                  className="size-14 rounded-full border-4 border-white shadow-[0_12px_24px_-12px_rgb(61_42_87_/_0.7)] ring-1 ring-lilac sm:size-16"
                  style={{ backgroundColor: color.hex }}
                  whileHover={{ scale: 1.15, rotate: 8 }}
                />
                <span className="mt-2 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  {color.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
