import { site } from '../config/site';

export function localBusinessSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': site.schemaType,
    '@id': `${site.url}/#business`,
    name: site.name,
    url: site.url,
    image: `${site.url}/og.png`,
    description: site.description,
    telephone: site.phoneHref,
    email: site.email,
    priceRange: site.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    areaServed: site.areaServed.map((name) => ({ '@type': 'City', name })),
    openingHoursSpecification: site.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.schema,
      opens: h.open,
      closes: h.close,
    })),
    makesOffer: site.services.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.title, description: s.description },
    })),
    ...(site.social.length ? { sameAs: site.social.map((s) => s.href) } : {}),
  };
}

export function faqSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: site.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function websiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: site.name,
    url: site.url,
    inLanguage: site.locale,
  };
}
