import { Metadata } from "next";
import { constructMetadata, getBreadcrumbSchema, getItemListSchema } from "../lib/seo";
import { laptopProducts } from "../data/products";
import JsonLd from "../components/shared/JsonLd";

export const metadata: Metadata = constructMetadata({
  title: "Enterprise Laptops & Workstations",
  description:
    "Business laptops and mobile workstations from Dell, HP, Lenovo, and Asus with PAN India enterprise deployment and support.",
  path: "/laptops",
  keywords: [
    "enterprise laptops",
    "business laptop supplier India",
    "Dell Vostro Latitude",
    "HP EliteBook ProBook",
    "Lenovo ThinkPad India",
    "mobile workstations",
    "corporate laptop bulk purchase",
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

  const itemList = getItemListSchema(
    "Enterprise & Business Laptops",
    "/laptops",
    laptopProducts
  );

  return (
    <>
      <JsonLd data={[breadcrumb, itemList]} />
      {children}
    </>
  );
}
