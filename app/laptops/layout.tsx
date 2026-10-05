import { Metadata } from "next";
import { constructMetadata, getBreadcrumbSchema } from "../lib/seo";
import JsonLd from "../components/shared/JsonLd";
import { LAPTOP_BRANDS, LAPTOP_PRODUCTS } from "../data/laptopData";

export const metadata: Metadata = constructMetadata({
  title: "Enterprise Laptops & Commercial Notebooks | Lenovo, HP, Dell, ASUS, Acer, Apple",
  description:
    "Explore enterprise laptops from Lenovo (ThinkPad), HP (EliteBook/ProBook), Dell (Latitude/Vostro), ASUS (ExpertBook), Acer (TravelMate), and Apple (MacBook). Bulk procurement, asset tagging, and Pan-India deployment by Authentic Infosystem.",
  path: "/laptops",
  keywords: [
    "enterprise laptops India",
    "business laptop supplier",
    "Lenovo ThinkPad India",
    "HP EliteBook ProBook supplier",
    "Dell Latitude Vostro corporate fleet",
    "ASUS ExpertBook commercial laptops",
    "Acer TravelMate B2B",
    "Apple MacBook business procurement",
    "bulk corporate laptop purchase",
    "commercial IT hardware Gurugram",
  ],
});

export default function LaptopsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Laptops", url: "/laptops" },
  ]);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Enterprise & Business Laptops",
    url: "https://authenticinfosystem.com/laptops",
    numberOfItems: LAPTOP_PRODUCTS.length,
    itemListElement: LAPTOP_PRODUCTS.map((laptop, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: `${laptop.brand} ${laptop.model}`,
      url: `https://authenticinfosystem.com/laptops/${laptop.brandSlug}/${laptop.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumb, itemListSchema]} />
      {children}
    </>
  );
}
