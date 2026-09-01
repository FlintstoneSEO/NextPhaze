import { site } from '@/data/site';

const bookingPageHref = '/book-training/';

export function bookingHref(href: string) {
  return href === bookingPageHref && site.squareBookingUrl ? site.squareBookingUrl : href;
}

export function isExternalBookingHref(href: string) {
  return bookingHref(href) === site.squareBookingUrl;
}
