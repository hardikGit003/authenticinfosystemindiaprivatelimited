import { Metadata } from "next";
import { constructMetadata, getBreadcrumbSchema, getItemListSchema } from "../lib/seo";
import { desktopProducts } from "../data/products";
import JsonLd from "../components/shared/JsonLd";

export const metadata: Metadata = constructMetadata({
  title: "Custom Desktops & PC Workstations",
  description:
    "High-performance desktop computers, AI workstations, creator towers, and office desktop packages from Authentic Infosystem India.",
  path: "/desktops",
  keywords: [
    "workstation PC India",
    "custom desktop computers",
    "developer desktop PCs",
    "video editing workstation",
    "AI training PC build",
    "office computer packages",
    "Dell OptiPlex HP ProDesk Lenovo ThinkCentre",
  ],
});

export default function DesktopsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Desktops", url: "/desktops" },
  ]);

  const itemList = getItemListSchema(
    "Workstations & Desktop Systems",
    "/desktops",
    desktopProducts
  );

  return (
    <>
      <JsonLd data={[breadcrumb, itemList]} />
      {children}
    </>
  );
}
