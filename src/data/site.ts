import siteData from './site.json';

export const site = {
  ...siteData,
  shortName: siteData.short_name,
  squareBookingUrl: import.meta.env.PUBLIC_SQUARE_BOOKING_URL?.trim() || 'https://squareup.com/appointments/book/L37PZ2ZJNK5ET'
} as const;

export const trainingOptions = siteData.training_options;
export const focusAreas = siteData.focus_areas;
