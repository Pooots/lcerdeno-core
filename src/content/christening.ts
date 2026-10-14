export type GalleryPhoto = {
  src: string
  alt: string
  caption: string
}

export const christening = {
  childName: 'L C. Cerdeno',
  /** The name is displayed in two rows: a large first initial, then the rest. */
  nameLead: 'L',
  nameRest: 'C. Cerdeno',
  monogram: 'LC',
  family: 'The Cerdeno Family',
  /** Every RSVP is delivered to this inbox, whatever email the guest types in the form. */
  rsvpInbox: 'jvacerdeno@gmail.com',

  /** ISO date with Philippine offset so the countdown is correct in any timezone. */
  startsAt: '2026-10-25T09:00:00+08:00',
  endsAt: '2026-10-25T14:00:00+08:00',
  date: {
    weekday: 'Sunday',
    day: '25',
    month: 'October',
    year: '2026',
    time: '9:00 AM',
    long: 'Sunday, October 25, 2026',
  },

  ceremony: {
    label: 'Christening & Dedication',
    time: '9:00 AM',
    venue: 'Our Lady of The Holy Rosary Parish',
    address: 'Amaya VI, Tanza, Cavite',
    mapQuery: 'Our Lady of the Holy Rosary Parish, Amaya VI, Tanza, Cavite',
  },

  reception: {
    label: 'Reception',
    time: 'To follow after the ceremony',
    venue: 'Wellington Residences',
    address: 'Blk 39 Lot 56 Wellington Residences, Tres Cruses, Tanza, Cavite',
    mapQuery: 'Wellington Residences, Tres Cruses, Tanza, Cavite',
  },

  verse: {
    text: 'For this child I prayed, and the Lord has granted me what I asked of Him.',
    reference: '1 Samuel 1:27',
  },

  godparentsMessage:
    'We cordially invite you to share this sacred moment as our beloved daughter receives the Sacrament of Baptism and is dedicated to the Lord. Your love, prayers, and guidance mean the world to us as you walk beside her in faith.',

  godparents: {
    ninang: [
      'Joyce',
      'Faye',
      'Rhia',
      'Matet',
      'Chery',
      'Joyjoy',
      'Bambie',
      'Bing',
      'Cheng',
      'Dayday',
      'Janet',
      'Dana',
      'Rye',
      'Camille',
      'Andrea',
      'Denice',
      'Analayn',
      'Lablee',
      'Diana',
      'Danica',
      'Janette',
    ],
    ninong: [
      'JM',
      'Keyvin',
      'Art',
      'Mark',
      'Mak',
      'Rod',
      'Jhay',
      'Kevin',
      'Zander',
      'Ricky',
      'Jhay-Ar',
      'Tonton',
      'JB',
      'Ogie',
    ],
  },

  motif: {
    note: 'We would love to see you in soft shades of lavender, lilac, or white.',
    colors: [
      { name: 'Royal Lavender', hex: '#8a68bd' },
      { name: 'Lavender', hex: '#b9a3dc' },
      { name: 'Lilac', hex: '#e4d8f4' },
      { name: 'Pearl White', hex: '#fdfbff' },
    ],
  },

  rsvpDeadline: 'October 18, 2026',

  look: {
    lavender: {
      src: '/images/christening-lavender.png',
      alt: 'L C. Cerdeno in a lavender embroidered dress',
      title: 'In Lavender Bloom',
      text: 'Wrapped in the soft color of our celebration, embroidered with lavender sprigs and tiny pearls — as gentle and sweet as she is.',
    },
    white: {
      src: '/images/christening-white.png',
      alt: 'L C. Cerdeno in her white christening gown embroidered with a cross',
      title: 'In Baptismal White',
      text: 'Clothed in white with a cross and doves upon her heart, the garment of purity and new life as she becomes a child of God.',
    },
  },

  music: {
    src: encodeURI('/Victory Worship - Tribes (Official Music Video).mp3'),
    title: 'Tribes',
    artist: 'Victory Worship',
  },

  invitationImage: '/images/invitation.png',
  heroImage: '/images/portrait-frame.png',
  revealImage: '/images/photo-reveal.jpg',

  gallery: [
    {
      src: '/images/portrait-frame.png',
      alt: 'L C. Cerdeno smiling in a lavender dress',
      caption: 'Our little blessing',
    },
    {
      src: '/images/photo-bear.png',
      alt: 'L C. Cerdeno wearing a lavender headband',
      caption: 'Curious little eyes',
    },
    {
      src: '/images/photo-highchair.png',
      alt: 'L C. Cerdeno resting on her high chair',
      caption: 'Sweet afternoons',
    },
    {
      src: '/images/photo-closeup.png',
      alt: 'A close-up of L C. Cerdeno',
      caption: 'Hello, world',
    },
    {
      src: '/images/photo-pink-bow.png',
      alt: 'L C. Cerdeno with a pink bow',
      caption: 'Pretty in pink',
    },
  ] as readonly GalleryPhoto[],
} as const

export function mapsSearchUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

export function mapsEmbedUrl(query: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`
}
