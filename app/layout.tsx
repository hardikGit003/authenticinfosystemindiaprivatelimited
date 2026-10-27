import type { Metadata, Viewport } from "next";
import { Inter, Lato } from "next/font/google";
import "./globals.css";
import JsonLd from "./components/shared/JsonLd";
import {
  SITE_URL,
  SITE_NAME,
  COMPANY_LEGAL_NAME,
  DEFAULT_SEO,
  getOrganizationSchema,
  getLocalBusinessSchema,
  getWebSiteSchema,
} from "./lib/seo";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
  variable: "--font-lato",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_SEO.title,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_SEO.description,
  keywords: DEFAULT_SEO.keywords,
  authors: [{ name: COMPANY_LEGAL_NAME, url: SITE_URL }],
  creator: COMPANY_LEGAL_NAME,
  publisher: COMPANY_LEGAL_NAME,
  category: "Technology",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: DEFAULT_SEO.title,
    description: DEFAULT_SEO.description,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: DEFAULT_SEO.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Enterprise IT Solutions & Hardware India`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_SEO.title,
    description: DEFAULT_SEO.description,
    images: [DEFAULT_SEO.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const globalSchemas = [
    getOrganizationSchema(),
    getLocalBusinessSchema(),
    getWebSiteSchema(),
  ];

  return (
    <html
      lang="en"
      className={`${inter.variable} ${lato.variable}`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          id="strip-extension-attributes"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var ATTRS = ['bis_skin_checked', 'data-new-gr-c-s-check-loaded', 'data-gr-ext-installed', 'cz-shortcut-listen'];
                  function clean() {
                    for (var a = 0; a < ATTRS.length; a++) {
                      var els = document.querySelectorAll('[' + ATTRS[a] + ']');
                      for (var i = 0; i < els.length; i++) {
                        els[i].removeAttribute(ATTRS[a]);
                      }
                    }
                  }
                  clean();
                  if (typeof MutationObserver !== 'undefined') {
                    var obs = new MutationObserver(function(mutations) {
                      for (var i = 0; i < mutations.length; i++) {
                        var m = mutations[i];
                        if (m.type === 'attributes' && ATTRS.indexOf(m.attributeName) !== -1) {
                          m.target.removeAttribute(m.attributeName);
                        }
                      }
                    });
                    obs.observe(document.documentElement, {
                      subtree: true,
                      attributes: true,
                      attributeFilter: ATTRS
                    });
                    window.addEventListener('load', function() {
                      setTimeout(function() { obs.disconnect(); }, 3500);
                    });
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.className} font-sans overflow-x-hidden w-full bg-white text-slate-900 selection:bg-blue-500/30 selection:text-inherit`}
      >
        <JsonLd data={globalSchemas} />
        {children}
      </body>
    </html>
  );
}