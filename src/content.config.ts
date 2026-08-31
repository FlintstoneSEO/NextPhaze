import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const topic = z.object({ title: z.string(), copy: z.string() });
const service = z.object({
  eyebrow: z.string(),
  title: z.string(),
  description: z.string(),
  intro: z.string(),
  price: z.string().nullish(),
  image: z.string(),
  image_alt: z.string(),
  topics: z.array(topic),
  related_href: z.string(),
  related_label: z.string()
});

const pages = defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/pages' }), schema: z.object({ title: z.string(), description: z.string(), content_blocks: z.array(z.any()) }) });
const services = defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/services' }), schema: service });
const focusAreas = defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/focus_areas' }), schema: service });
const legal = defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/legal' }), schema: z.object({ title: z.string(), description: z.string(), effective_date: z.string() }) });

export const collections = { pages, services, focus_areas: focusAreas, legal };
