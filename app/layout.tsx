import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export const metadata = {
  title: "AUTHENTIC INFOSYSTEM",
  description: "Premium Electronics Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}