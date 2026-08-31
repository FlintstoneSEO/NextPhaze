import { registerAstroComponent } from '@cloudcannon/editable-regions/astro';
import { componentMap } from './componentMap';
import ServicePage from '@/components/ServicePage.astro';
import BookingCTA from '@/components/BookingCTA.astro';
import Header from '@/components/Header.astro';
import Footer from '@/components/Footer.astro';
import PricingOptions from '@/components/shared/PricingOptions.astro';
import HomeFocusAreas from '@/components/shared/HomeFocusAreas.astro';
import FormatOptions from '@/components/shared/FormatOptions.astro';
import FocusIndexAreas from '@/components/shared/FocusIndexAreas.astro';
import BookingOptionCards from '@/components/shared/BookingOptionCards.astro';

for (const [name, component] of Object.entries(componentMap)) {
  registerAstroComponent(name, component);
}

registerAstroComponent('service_page', ServicePage);
registerAstroComponent('service_booking_cta', BookingCTA);
registerAstroComponent('site_header', Header);
registerAstroComponent('site_footer', Footer);
registerAstroComponent('pricing_options', PricingOptions);
registerAstroComponent('home_focus_areas', HomeFocusAreas);
registerAstroComponent('format_options', FormatOptions);
registerAstroComponent('focus_index_areas', FocusIndexAreas);
registerAstroComponent('booking_option_cards', BookingOptionCards);
