import type { Viewport } from "next";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export const metadata = {
  title: "AUTHENTIC INFOSYSTEM | Enterprise Technology Solutions",
  description: "Enterprise grade laptops, desktops, networking infrastructure, surveillance systems, and IT solutions across India.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="overflow-x-hidden w-full bg-white text-slate-900 selection:bg-slate-900/15 selection:text-black">
        {children}
      </body>
    </html>
  );
}