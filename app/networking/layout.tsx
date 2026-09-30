import { Metadata } from "next";
import { constructMetadata, getBreadcrumbSchema, getItemListSchema } from "../lib/seo";
import { networkingProducts } from "../data/networkingData";
import JsonLd from "../components/shared/JsonLd";

export const metadata: Metadata = constructMetadata({
  title: "Enterprise Networking & Servers",
  description:
    "Enterprise network switches, Wi-Fi 6/7 access points, firewalls, and server rack infrastructure by Cisco, TP-Link, and Ubiquiti.",
  path: "/networking",
  keywords: [
    "enterprise networking hardware",
    "managed switches India",
    "corporate Wi-Fi 6 access points",
    "network rack servers",
    "firewall router procurement",
    "TP-Link Omada Cisco Ubiquiti India",
  ],
});

export default function NetworkingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Networking", url: "/networking" },
  ]);

  const itemList = getItemListSchema(
    "Enterprise Networking Infrastructure",
    "/networking",
    networkingProducts
  );

  return (
    <>
      <JsonLd data={[breadcrumb, itemList]} />
      {children}
    </>
  );
}
