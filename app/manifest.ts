import { MetadataRoute } from "next";
import { SITE_NAME, COMPANY_LEGAL_NAME } from "./lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: COMPANY_LEGAL_NAME,
    short_name: SITE_NAME,
    description:
      "India's premier technology hardware and IT solutions provider. Enterprise laptops, workstations, mobile devices, networking infrastructure, and custom configurations across India.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
