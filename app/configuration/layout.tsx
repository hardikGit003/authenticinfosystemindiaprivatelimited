import { Metadata } from "next";
import { constructMetadata, getBreadcrumbSchema } from "../lib/seo";
import JsonLd from "../components/shared/JsonLd";

export const metadata: Metadata = constructMetadata({
  title: "Custom PC & System Configurator",
  description:
    "Design and configure custom desktop PCs, developer workstations, and office systems with live hardware specifications and quotes.",
  path: "/configuration",
  keywords: [
    "custom PC builder India",
    "PC configurator online",
    "custom gaming rig builder",
    "workstation PC builder India",
    "custom developer computer configure",
    "custom desktop quotes Gurugram",
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
