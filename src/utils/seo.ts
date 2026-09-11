import { site } from '@/data/site';

type Breadcrumb = {
  name: string;
  path: string;
};

type SeoGraphOptions = {
  baseUrl: URL;
  canonicalUrl: URL;
  pageTitle: string;
  pageDescription: string;
  breadcrumbs?: Breadcrumb[];
};

const services = [
  { id: 'athletic-performance-training', name: 'Athletic Performance Training', path: '/training/' },
  { id: 'speed-agility-training', name: 'Speed and Agility Training', path: '/training/speed-agility/' },
  { id: 'wide-receiver-training', name: 'Wide Receiver Training', path: '/training/wide-receiver/' },
  { id: 'group-training', name: 'Group Training', path: '/training/group/' },
  { id: 'one-on-one-training', name: 'One-on-One Training', path: '/training/one-on-one/' }
];

export function buildSeoGraph({ baseUrl, canonicalUrl, pageTitle, pageDescription, breadcrumbs = [] }: SeoGraphOptions) {
  const websiteId = new URL('/#website', baseUrl).href;
  const businessId = new URL('/#business', baseUrl).href;
  const coachId = new URL('/#carrington-thompson', baseUrl).href;

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: new URL('/', baseUrl).href,
      name: site.name,
      publisher: { '@id': businessId },
      inLanguage: 'en-US'
    },
    {
      '@type': 'Organization',
      '@id': businessId,
      name: site.name,
      url: new URL('/', baseUrl).href,
      email: site.contact_email,
      telephone: site.contact_phone,
      description: 'Athletic performance, speed and agility, wide receiver, group, and one-on-one training in Nashville, Tennessee.',
      areaServed: {
        '@type': 'City',
        name: 'Nashville',
        containedInPlace: { '@type': 'State', name: 'Tennessee' }
      },
      employee: { '@id': coachId }
    },
    {
      '@type': 'Person',
      '@id': coachId,
      name: 'Carrington Thompson',
      jobTitle: 'Coach',
      worksFor: { '@id': businessId },
      url: new URL('/coach-carrington/', baseUrl).href,
      sameAs: ['https://wmubroncos.com/sports/football/roster/carrington-thompson/4346']
    },
    ...services.map((service) => ({
      '@type': 'Service',
      '@id': new URL(`/#${service.id}`, baseUrl).href,
      name: service.name,
      url: new URL(service.path, baseUrl).href,
      provider: { '@id': businessId },
      areaServed: { '@type': 'City', name: 'Nashville' }
    })),
    {
      '@type': 'WebPage',
      '@id': `${canonicalUrl.href}#webpage`,
      url: canonicalUrl.href,
      name: pageTitle,
      description: pageDescription,
      isPartOf: { '@id': websiteId },
      about: { '@id': businessId },
      inLanguage: 'en-US'
    }
  ];

  if (breadcrumbs.length > 1) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl.href}#breadcrumb`,
      itemListElement: breadcrumbs.map((breadcrumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: breadcrumb.name,
        item: new URL(breadcrumb.path, baseUrl).href
      }))
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}
