import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLaptopBrandBySlug, getLaptopsByBrand, LAPTOP_BRANDS } from "../../data/laptopData";
import { constructMetadata, getBreadcrumbSchema } from "../../lib/seo";
import JsonLd from "../../components/shared/JsonLd";

interface BrandLayoutProps {
  children: React.ReactNode;
  params: Promise<{ brand: string }>;
}

export async function generateStaticParams() {
  return LAPTOP_BRANDS.map((brand) => ({
    brand: brand.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string }>;
}): Promise<Metadata> {
  const { brand: brandSlug } = await params;
  const brand = getLaptopBrandBySlug(brandSlug);

  if (!brand) {
    return {
      title: "Brand Not Found | Authentic Infosystem",
    };
  }

  return constructMetadata({
    title: `${brand.name} Enterprise Laptops & Workstations | Series & Sourcing India`,
    description: `Explore authorized ${brand.name} enterprise laptops including ${brand.series.join(", ")}. Official OEM warranty, bulk GST invoicing, custom RAM/SSD configs, and Pan-India deployment by Authentic Infosystem.`,
    path: `/laptops/${brand.slug}`,
    keywords: [
      `${brand.name} laptops India`,
      `${brand.name} enterprise laptops`,
      ...brand.series.map((s) => `${brand.name} ${s}`),
      `bulk ${brand.name} laptop purchase`,
      `${brand.name} corporate laptop quote`,
    ],
  });
}

export default async function BrandLayout({
  children,
  params,
}: BrandLayoutProps) {
  const { brand: brandSlug } = await params;
  const brand = getLaptopBrandBySlug(brandSlug);

  if (!brand) {
    notFound();
  }

  const laptops = getLaptopsByBrand(brand.slug);

  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Laptops", url: "/laptops" },
    { name: brand.name, url: `/laptops/${brand.slug}` },
  ]);

  const brandItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${brand.name} Enterprise Laptops`,
    url: `https://authenticinfosystem.com/laptops/${brand.slug}`,
    numberOfItems: laptops.length,
    itemListElement: laptops.map((laptop, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: `${laptop.brand} ${laptop.model}`,
      url: `https://authenticinfosystem.com/laptops/${laptop.brandSlug}/${laptop.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumb, brandItemList]} />
      {children}
    </>
  );
}
