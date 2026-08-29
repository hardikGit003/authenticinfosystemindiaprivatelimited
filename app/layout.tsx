import type { Viewport } from "next";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export const metadata = {
  title: "AUTHENTIC INFOSYSTEM",
  description: "Premium Electronics Website",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="overflow-x-hidden w-full bg-black text-white selection:bg-blue-500/30">
        {children}
      </body>
    </html>
  );
}