import { Metadata } from "next";
import { constructMetadata, getBreadcrumbSchema } from "../lib/seo";
import JsonLd from "../components/shared/JsonLd";
import { amazonProducts } from "../data/amazonProducts";

export const metadata: Metadata = constructMetadata({
  title: "Official Amazon Store | Authentic Infosystem India - Video Conferencing & Enterprise Hardware",
  description:
    "Explore Authentic Infosystem's official Amazon.in Storefront. Shop Logitech MeetUp 4K Video Conferencing Systems, Enterprise Laptops, ThinkCentres, iPhones, Samsung flagships, and IT accessories directly on Amazon with Prime fast delivery.",
  path: "/amazon",
  keywords: [
    "Authentic Infosystem Amazon Store",
    "Logitech MeetUp Amazon India",
    "Enterprise IT Amazon Storefront",
    "Buy laptops on Amazon India",
    "Prime eligible enterprise hardware",
    "Logitech Brio 4K Amazon",
    "Lenovo ThinkPad Amazon India",
    "Dell Latitude Amazon seller",
  ],
});

export default function AmazonStoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Amazon Store", url: "/amazon" },
  ]);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Authentic Infosystem Amazon India Catalog",
    url: "https://authenticinfosystem.com/amazon",
    numberOfItems: amazonProducts.length,
    itemListElement: amazonProducts.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.fullName,
      url: `https://authenticinfosystem.com/amazon#${item.asin}`,
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={itemListSchema} />
      {children}
    </>
  );
}
