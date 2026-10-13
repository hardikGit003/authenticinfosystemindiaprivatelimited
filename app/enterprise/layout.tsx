import { Metadata } from "next";
import { constructMetadata, getBreadcrumbSchema, getServiceSchema, getFAQSchema } from "../lib/seo";
import JsonLd from "../components/shared/JsonLd";

export const metadata: Metadata = constructMetadata({
  title: "B2B Enterprise IT Infrastructure",
  description:
    "End-to-end B2B IT procurement, server rack deployments, computing clusters, and enterprise surveillance systems across India.",
  path: "/enterprise",
  keywords: [
    "enterprise IT procurement",
    "B2B computer hardware India",
    "bulk IT hardware supply",
    "server rack deployment",
    "corporate IT infrastructure",
    "turnkey IT hardware solutions Gurgaon Delhi NCR",
  ],
});

const enterpriseServices = [
  { title: "IT Procurement" },
  { title: "Annual IT Supply" },
  { title: "Asset Management" },
  { title: "Deployment" },
  { title: "Cloud Consulting" },
  { title: "Networking" },
  { title: "AMC Services" },
  { title: "Onsite Support" },
  { title: "Software Licensing" },
  { title: "Device Lifecycle" },
];

const faqs = [
  { q: "How long does deployment take?", a: "Deployment timelines vary based on the scale and complexity of the project. A standard office setup typically takes 1-2 weeks from procurement to final installation." },
  { q: "Do you provide PAN India delivery?", a: "Yes, we have a robust logistics network that ensures safe and timely delivery of enterprise hardware across all major cities and remote locations in India." },
  { q: "Can you customize configurations?", a: "Absolutely. We specialize in custom configurations for workstations, servers, and networking equipment to perfectly match your specific workload requirements." },
  { q: "Do you offer onsite installation?", a: "Yes, our certified engineers provide comprehensive onsite installation, testing, and configuration services for all enterprise deployments." },
  { q: "What brands do you support?", a: "We provide solutions with leading enterprise technology brands including Dell, HP, Lenovo, Cisco, Apple, Microsoft, ASUS, Acer, and many other global OEMs." },
  { q: "Is financing available?", a: "We offer flexible payment terms and leasing options for qualified enterprise customers and large procurement orders." },
  { q: "Do you provide AMC?", a: "Yes, we offer comprehensive Annual Maintenance Contracts (AMC) with customizable SLAs, including 24x7 support and rapid hardware replacement." },
  { q: "Can you manage IT assets?", a: "Our IT asset lifecycle management services cover everything from procurement and tagging to secure data wiping and e-waste disposal." },
];

export default function EnterpriseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Enterprise Solutions", url: "/enterprise" },
  ]);

  const serviceSchema = getServiceSchema(enterpriseServices);
  const faqSchema = getFAQSchema(faqs);

  return (
    <>
      <JsonLd data={[breadcrumb, serviceSchema, faqSchema]} />
      {children}
    </>
  );
}
