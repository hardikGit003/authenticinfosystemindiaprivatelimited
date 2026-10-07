import { MetadataRoute } from "next";
import { SITE_URL } from "./lib/seo";
import { LAPTOP_BRANDS, LAPTOP_PRODUCTS } from "./data/laptopData";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  const staticRoutes = [
    {
      url: `${SITE_URL}`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/amazon`,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/laptops`,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/desktops`,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/phones`,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/networking`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/enterprise`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/accessories`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/configuration`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/configuration/basic`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/configuration/office`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/configuration/development`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/configuration/creator`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/configuration/gaming`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/configuration/workstation`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    },
  ];

  // Brand routes (/laptops/lenovo, /laptops/hp, etc.)
  const brandRoutes = LAPTOP_BRANDS.map((brand) => ({
    url: `${SITE_URL}/laptops/${brand.slug}`,
    lastModified: currentDate,
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  // Product model routes (/laptops/lenovo/thinkpad-e14, etc.)
  const productRoutes = LAPTOP_PRODUCTS.map((laptop) => ({
    url: `${SITE_URL}/laptops/${laptop.brandSlug}/${laptop.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...brandRoutes, ...productRoutes];
}
