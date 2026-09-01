import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const textPair = z.object({ title: z.string(), copy: z.string() });
const labelLink = z.object({ label: z.string(), href: z.string() });
const valueLabel = z.object({ value: z.string(), label: z.string() });
const credentialPanel = valueLabel.extend({ detail: z.string().nullish(), image: z.string(), image_alt: z.string() });

const contentBlock = z.discriminatedUnion('_type', [
  z.object({ _type: z.literal('home_hero'), eyebrow: z.string(), title: z.string(), copy: z.string(), image: z.string(), image_alt: z.string(), primary_label: z.string(), primary_href: z.string(), secondary_label: z.string(), secondary_href: z.string() }),
  z.object({ _type: z.literal('pricing_rail'), eyebrow: z.string(), title: z.string() }),
  z.object({ _type: z.literal('training_focus'), title: z.string(), copy: z.string(), image: z.string(), image_alt: z.string(), featured_title: z.string(), featured_copy: z.string(), featured_href: z.string() }),
  z.object({ _type: z.literal('process'), title: z.string(), copy: z.string(), items: z.array(textPair.extend({ icon: z.enum(['target', 'timer', 'route']) })) }),
  z.object({ _type: z.literal('coach_proof'), title: z.string(), copy: z.string(), link_label: z.string(), link_href: z.string(), credentials: z.array(credentialPanel) }),
  z.object({ _type: z.literal('service_area'), title: z.string(), copy: z.string(), note: z.string() }),
  z.object({ _type: z.literal('faq'), title: z.string(), items: z.array(z.object({ question: z.string(), answer: z.string() })) }),
  z.object({ _type: z.literal('booking_cta'), title: z.string(), copy: z.string(), label: z.string(), href: z.string() }),
  z.object({ _type: z.literal('training_hero'), eyebrow: z.string(), title: z.string(), copy: z.string(), button_label: z.string(), button_href: z.string(), route_steps: z.array(z.object({ label: z.string() })) }),
  z.object({ _type: z.literal('format_section'), title: z.string(), copy: z.string() }),
  z.object({ _type: z.literal('focus_index'), title: z.string(), image: z.string(), image_alt: z.string() }),
  z.object({ _type: z.literal('coach_hero'), eyebrow: z.string(), title: z.string(), copy: z.string(), button_label: z.string(), button_href: z.string(), image: z.string(), image_alt: z.string() }),
  z.object({ _type: z.literal('career_stats'), title: z.string(), copy: z.string(), stats: z.array(valueLabel) }),
  z.object({ _type: z.literal('career_story'), title: z.string(), copy: z.string(), items: z.array(textPair) }),
  z.object({ _type: z.literal('performance_callout'), eyebrow: z.string(), title: z.string(), date: z.string(), link_label: z.string(), link_href: z.string() }),
  z.object({ _type: z.literal('source_section'), title: z.string(), copy: z.string(), links: z.array(labelLink) }),
  z.object({ _type: z.literal('booking_hero'), eyebrow: z.string(), title: z.string(), copy: z.string(), ready_title: z.string(), ready_copy: z.string(), pending_title: z.string(), pending_copy: z.string() }),
  z.object({ _type: z.literal('booking_options'), title: z.string() }),
  z.object({ _type: z.literal('booking_expectations'), title: z.string(), items: z.array(textPair.extend({ icon: z.enum(['calendar', 'check', 'dumbbell']) })), contact_prompt: z.string(), contact_label: z.string() })
]);

const pageBuilder = z.object({
  _schema: z.literal('page_builder'),
  title: z.string(),
  description: z.string(),
  preload_image: z.string().nullish(),
  content_blocks: z.array(contentBlock)
});
const legalPage = z.object({ _schema: z.literal('legal'), eyebrow: z.string(), title: z.string(), description: z.string(), effective_label: z.string(), effective_date: z.string() });

const topic = z.object({ title: z.string(), copy: z.string() });
const cta = z.object({ title: z.string(), copy: z.string(), label: z.string(), href: z.string() });
const trainingPage = z.object({
  title: z.string(),
  description: z.string(),
  service: z.object({
    eyebrow: z.string(), title: z.string(), intro: z.string(), price: z.string().nullish(), price_suffix: z.string(), image: z.string(), image_alt: z.string(),
    primary_label: z.string(), primary_href: z.string(), secondary_label: z.string(), secondary_href: z.string(),
    section_title: z.string(), section_copy: z.string(), topics: z.array(topic), related_href: z.string(), related_label: z.string()
  }),
  cta
});

const pages = defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/pages' }), schema: z.discriminatedUnion('_schema', [pageBuilder, legalPage]) });
const services = defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/services' }), schema: trainingPage });
const focusAreas = defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/focus_areas' }), schema: trainingPage });

export const collections = { pages, services, focus_areas: focusAreas };
