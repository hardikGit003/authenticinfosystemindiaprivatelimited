import { Metadata } from "next";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://authenticinfosystem.com";
export const SITE_NAME = "AUTHENTIC INFOSYSTEM";
export const COMPANY_LEGAL_NAME = "AUTHENTIC INFOSYSTEM INDIA PRIVATE LIMITED";

export const DEFAULT_SEO = {
  title: "Authentic Infosystem | Enterprise IT & Tech Hardware India",
  description:
    "India's premier IT hardware & technology solutions provider. Enterprise laptops, custom workstations, networking, servers & surveillance systems.",
  keywords: [
    "Authentic Infosystem",
    "IT hardware provider India",
    "enterprise laptops India",
    "workstation PC builder",
    "custom PC configurator",
    "Dell HP Lenovo laptops",
    "bulk IT hardware procurement",
    "networking equipment Gurugram",
    "server infrastructure India",
    "Apple iPhone enterprise sales",
    "CCTV surveillance IT hardware",
    "refurbished and new business laptops",
  ],
  ogImage: `${SITE_URL}/Full_Logo_Dark.png`,
};

export const COMPANY_INFO = {
  name: COMPANY_LEGAL_NAME,
  alternateName: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/Full_Logo_Dark.png`,
  email: "Info@authenticinfosystem.com",
  telephone: "+919643990077",
  address: {
    streetAddress: "9th Floor Tower D, Unitech Cyber Park, Sector 39",
    addressLocality: "Gurugram",
    addressRegion: "Haryana",
    postalCode: "122001",
    addressCountry: "IN",
  },
  geo: {
    latitude: "28.4418",
    longitude: "77.0602",
  },
  sameAs: [
    "https://www.linkedin.com/company/authentic-infosystem-india-private-limited/",
    "https://www.instagram.com/authenticinfosystem",
    "https://facebook.com",
    "https://twitter.com",
    "https://youtube.com",
  ],
};

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: "website" | "article";
}

export function constructMetadata({
  title,
  description,
  path,
  keywords = [],
  ogImage = DEFAULT_SEO.ogImage,
  ogType = "website",
}: PageMetadataOptions): Metadata {
  const url = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const combinedKeywords = Array.from(new Set([...keywords, ...DEFAULT_SEO.keywords]));

  return {
    title,
    description,
    keywords: combinedKeywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_IN",
      type: ogType,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} - ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [ogImage],
    },
  };
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: COMPANY_INFO.name,
    alternateName: COMPANY_INFO.alternateName,
    url: COMPANY_INFO.url,
    logo: COMPANY_INFO.logo,
    email: COMPANY_INFO.email,
    telephone: COMPANY_INFO.telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY_INFO.address.streetAddress,
      addressLocality: COMPANY_INFO.address.addressLocality,
      addressRegion: COMPANY_INFO.address.addressRegion,
      postalCode: COMPANY_INFO.address.postalCode,
      addressCountry: COMPANY_INFO.address.addressCountry,
    },
    sameAs: COMPANY_INFO.sameAs,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: COMPANY_INFO.telephone,
        contactType: "sales",
        email: COMPANY_INFO.email,
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
      {
        "@type": "ContactPoint",
        telephone: COMPANY_INFO.telephone,
        contactType: "customer service",
        email: COMPANY_INFO.email,
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
    ],
  };
}

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ComputerStore",
    "@id": `${SITE_URL}/#localbusiness`,
    name: COMPANY_INFO.name,
    alternateName: COMPANY_INFO.alternateName,
    image: COMPANY_INFO.logo,
    url: COMPANY_INFO.url,
    telephone: COMPANY_INFO.telephone,
    email: COMPANY_INFO.email,
    priceRange: "₹₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY_INFO.address.streetAddress,
      addressLocality: COMPANY_INFO.address.addressLocality,
      addressRegion: COMPANY_INFO.address.addressRegion,
      postalCode: COMPANY_INFO.address.postalCode,
      addressCountry: COMPANY_INFO.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: COMPANY_INFO.geo.latitude,
      longitude: COMPANY_INFO.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:30",
        closes: "19:00",
      },
    ],
    sameAs: COMPANY_INFO.sameAs,
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/laptops?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function getItemListSchema(
  categoryName: string,
  categoryUrl: string,
  products: Array<{ name: string; brand?: string; price?: number; image?: string; modelNumber?: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: categoryName,
    url: `${SITE_URL}${categoryUrl}`,
    numberOfItems: products.length,
    itemListElement: products.slice(0, 30).map((product, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Product",
        name: product.name,
        image: product.image?.startsWith("http") ? product.image : `${SITE_URL}${product.image}`,
        mpn: product.modelNumber,
        brand: {
          "@type": "Brand",
          name: product.brand || "Authentic Infosystem",
        },
        offers: product.price
          ? {
              "@type": "Offer",
              priceCurrency: "INR",
              price: product.price,
              availability: "https://schema.org/InStock",
              seller: {
                "@type": "Organization",
                name: COMPANY_LEGAL_NAME,
              },
            }
          : undefined,
      },
    })),
  };
}

export function getFAQSchema(faqs: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

export function getServiceSchema(services: Array<{ title: string; description?: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Enterprise IT Procurement & Solutions",
    provider: {
      "@type": "Organization",
      name: COMPANY_LEGAL_NAME,
      url: SITE_URL,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Enterprise IT Services",
      itemListElement: services.map((s, idx) => ({
        "@type": "OfferCatalog",
        position: idx + 1,
        name: s.title,
      })),
    },
  };
}

