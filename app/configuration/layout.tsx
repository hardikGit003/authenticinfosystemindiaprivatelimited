import { Metadata } from "next";
import { constructMetadata, getBreadcrumbSchema } from "../lib/seo";
import JsonLd from "../components/shared/JsonLd";

export const metadata: Metadata = constructMetadata({
  title: "Custom PC Configurator & Workstation Builder | Authentic Infosystem India",
  description:
    "Build and configure custom desktop PCs, AI & deep learning workstations, creator editing rigs, and enterprise business laptops from Lenovo, HP, Dell, ASUS, and Acer. Get instant B2B quotes, 18% GST invoices, and Pan-India onsite warranty.",
  path: "/configuration",
  keywords: [
    "custom PC builder India",
    "PC configurator online India",
    "custom workstation builder",
    "AI deep learning workstation PC",
    "CAD 3D simulation workstation India",
    "custom gaming rig builder Delhi NCR",
    "video editing PC configurator",
    "enterprise desktop deployment",
    "Lenovo Dell HP ASUS business computers",
    "bulk computer procurement 18% GST",
  ],
});

export default function ConfigurationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "System Configurator", url: "/configuration" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      {children}
    </>
  );
}
