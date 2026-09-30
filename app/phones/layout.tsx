import { Metadata } from "next";
import { constructMetadata, getBreadcrumbSchema, getItemListSchema } from "../lib/seo";
import { phoneProducts } from "../data/products";
import JsonLd from "../components/shared/JsonLd";

export const metadata: Metadata = constructMetadata({
  title: "Smartphones & Mobility Solutions",
  description:
    "Enterprise mobile solutions, corporate fleet deployments, Apple iPhone 18/17 series, and Samsung Galaxy devices across India.",
  path: "/phones",
  keywords: [
    "enterprise mobility India",
    "iPhone bulk order India",
    "corporate smartphones",
    "Apple iPhone 18 Pro enterprise",
    "Samsung Galaxy enterprise mobile",
    "fleet mobile procurement",
  ],
});

export default function PhonesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Mobiles", url: "/phones" },
  ]);

  const itemList = getItemListSchema(
    "Smartphones & Enterprise Mobility Devices",
    "/phones",
    phoneProducts
  );

  return (
    <>
      <JsonLd data={[breadcrumb, itemList]} />
      {children}
    </>
  );
}
