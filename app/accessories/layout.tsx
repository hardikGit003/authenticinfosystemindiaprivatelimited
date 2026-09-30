import { Metadata } from "next";
import { constructMetadata, getBreadcrumbSchema, getItemListSchema } from "../lib/seo";
import { accessoriesProducts } from "../data/accessoriesData";
import JsonLd from "../components/shared/JsonLd";

export const metadata: Metadata = constructMetadata({
  title: "IT Peripherals & PC Accessories",
  description:
    "Professional monitors, wireless keyboards, mice, docking stations, and computer peripherals for enterprise offices across India.",
  path: "/accessories",
  keywords: [
    "PC accessories India",
    "enterprise IT peripherals",
    "business monitors BenQ Dell",
    "Logitech wireless combos",
    "USB-C docking stations",
    "computer hardware accessories",
  ],
});

export default function AccessoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Accessories", url: "/accessories" },
  ]);

  const itemList = getItemListSchema(
    "IT Accessories & Peripherals",
    "/accessories",
    accessoriesProducts
  );

  return (
    <>
      <JsonLd data={[breadcrumb, itemList]} />
      {children}
    </>
  );
}
