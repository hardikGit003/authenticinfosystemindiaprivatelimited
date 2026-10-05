import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLaptopBySlug, LAPTOP_PRODUCTS } from "../../../data/laptopData";
import { constructMetadata, getBreadcrumbSchema } from "../../../lib/seo";
import JsonLd from "../../../components/shared/JsonLd";

interface ProductLayoutProps {
  children: React.ReactNode;
  params: Promise<{ brand: string; model: string }>;
}

export async function generateStaticParams() {
  return LAPTOP_PRODUCTS.map((laptop) => ({
    brand: laptop.brandSlug,
    model: laptop.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string; model: string }>;
}): Promise<Metadata> {
  const { brand: brandSlug, model: modelSlug } = await params;
  const laptop = getLaptopBySlug(brandSlug, modelSlug);

  if (!laptop) {
    return {
      title: "Product Not Found | Authentic Infosystem",
    };
  }

  const specSummary = laptop.specs.map((s) => `${s.label}: ${s.value}`).join(" | ");

  return constructMetadata({
    title: `${laptop.brand} ${laptop.model} (${laptop.modelNumber}) | Enterprise Specs & Quote`,
    description: `${laptop.tagline}. Specifications: ${specSummary}. Genuine OEM warranty, GST invoice, and B2B fleet procurement from Authentic Infosystem.`,
    path: `/laptops/${laptop.brandSlug}/${laptop.slug}`,
    keywords: [
      `${laptop.brand} ${laptop.model}`,
      laptop.modelNumber,
      `${laptop.brand} ${laptop.series}`,
      `${laptop.brand} laptop price India`,
      `${laptop.brand} corporate procurement`,
      "enterprise laptop specifications",
    ],
    ogImage: laptop.image.startsWith("http") ? laptop.image : `https://authenticinfosystem.com${laptop.image}`,
  });
}

export default async function ProductLayout({
  children,
  params,
}: ProductLayoutProps) {
  const { brand: brandSlug, model: modelSlug } = await params;
  const laptop = getLaptopBySlug(brandSlug, modelSlug);

  if (!laptop) {
    notFound();
  }

  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Laptops", url: "/laptops" },
    { name: laptop.brand, url: `/laptops/${laptop.brandSlug}` },
    { name: laptop.model, url: `/laptops/${laptop.brandSlug}/${laptop.slug}` },
  ]);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${laptop.brand} ${laptop.model}`,
    image: laptop.image.startsWith("http") ? laptop.image : `https://authenticinfosystem.com${laptop.image}`,
    description: laptop.description,
    mpn: laptop.modelNumber,
    brand: {
      "@type": "Brand",
      name: laptop.brand,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: laptop.price || 0,
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Authentic Infosystem India Private Limited",
      },
    },
  };

  return (
    <>
      <JsonLd data={[breadcrumb, productSchema]} />
      {children}
    </>
  );
}
