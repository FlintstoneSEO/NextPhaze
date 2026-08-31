import HomeHero from '@/components/blocks/HomeHero.astro';
import PricingRail from '@/components/blocks/PricingRail.astro';
import TrainingFocus from '@/components/blocks/TrainingFocus.astro';
import Process from '@/components/blocks/Process.astro';
import CoachProof from '@/components/blocks/CoachProof.astro';
import ServiceArea from '@/components/blocks/ServiceArea.astro';
import Faq from '@/components/blocks/Faq.astro';
import BookingCta from '@/components/blocks/BookingCta.astro';
import TrainingHero from '@/components/blocks/TrainingHero.astro';
import FormatSection from '@/components/blocks/FormatSection.astro';
import FocusIndex from '@/components/blocks/FocusIndex.astro';
import CoachHero from '@/components/blocks/CoachHero.astro';
import CareerStats from '@/components/blocks/CareerStats.astro';
import CareerStory from '@/components/blocks/CareerStory.astro';
import PerformanceCallout from '@/components/blocks/PerformanceCallout.astro';
import SourceSection from '@/components/blocks/SourceSection.astro';
import BookingHero from '@/components/blocks/BookingHero.astro';
import BookingOptions from '@/components/blocks/BookingOptions.astro';
import BookingExpectations from '@/components/blocks/BookingExpectations.astro';

export const componentMap = {
  home_hero: HomeHero, pricing_rail: PricingRail, training_focus: TrainingFocus, process: Process,
  coach_proof: CoachProof, service_area: ServiceArea, faq: Faq, booking_cta: BookingCta,
  training_hero: TrainingHero, format_section: FormatSection, focus_index: FocusIndex,
  coach_hero: CoachHero, career_stats: CareerStats, career_story: CareerStory,
  performance_callout: PerformanceCallout, source_section: SourceSection,
  booking_hero: BookingHero, booking_options: BookingOptions, booking_expectations: BookingExpectations
} as const;

