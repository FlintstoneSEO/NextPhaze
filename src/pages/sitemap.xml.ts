import type { APIRoute } from 'astro';

const routes = [
  '/',
  '/training/',
  '/training/one-on-one/',
  '/training/group/',
  '/training/speed-agility/',
  '/training/wide-receiver/',
  '/coach-carrington/',
  '/book-training/',
  '/privacy/'
];

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('http://localhost:4321');
  const urls = routes.map((route) => `<url><loc>${new URL(route, base).href}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { 'Content-Type': 'application/xml' }
  });
};
