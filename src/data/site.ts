export const site = {
  name: 'NextPhaze Athletic Training',
  shortName: 'NextPhaze',
  market: 'Nashville, Tennessee',
  squareBookingUrl: import.meta.env.PUBLIC_SQUARE_BOOKING_URL?.trim() ?? '',
  navigation: [
    { label: 'Training', href: '/training/' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Coach Carrington', href: '/coach-carrington/' },
    { label: 'Service Area', href: '/#service-area' }
  ]
} as const;

export const trainingOptions = [
  {
    name: '1-on-1 Training',
    shortName: '1-on-1',
    price: '$60',
    href: '/training/one-on-one/',
    summary: 'Focused coaching with direct feedback and a session built around the work in front of you.'
  },
  {
    name: 'Group Training',
    shortName: 'Group',
    price: '$30',
    href: '/training/group/',
    summary: 'Train in a competitive group setting while building movement, skill, and disciplined habits.'
  }
] as const;

export const focusAreas = [
  {
    name: 'Speed and Agility',
    href: '/training/speed-agility/',
    summary: 'Acceleration, footwork, body control, and change of direction for movement that carries into sport.'
  },
  {
    name: 'Wide Receiver Skills',
    href: '/training/wide-receiver/',
    summary: 'Stance, releases, route detail, catching, and position movement taught by an experienced receiver.'
  }
] as const;
