/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-sans)", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
        heading: ["var(--font-family-heading)", "var(--font-inter)", "Inter", "sans-serif"],
        lato: ["var(--font-lato)", "Lato", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
      },
      fontSize: {
        h1: ["var(--font-size-h1)", { lineHeight: "var(--line-height-h1)", letterSpacing: "var(--letter-spacing-h1)", fontWeight: "var(--font-weight-h1)" }],
        h2: ["var(--font-size-h2)", { lineHeight: "var(--line-height-h2)", letterSpacing: "var(--letter-spacing-h2)", fontWeight: "var(--font-weight-h2)" }],
        h3: ["var(--font-size-h3)", { lineHeight: "var(--line-height-h3)", letterSpacing: "var(--letter-spacing-h3)", fontWeight: "var(--font-weight-h3)" }],
        h4: ["var(--font-size-h4)", { lineHeight: "var(--line-height-h4)", letterSpacing: "var(--letter-spacing-h4)", fontWeight: "var(--font-weight-h4)" }],
        body: ["var(--font-size-body)", { lineHeight: "var(--line-height-body)" }],
        "body-sm": ["var(--font-size-body-sm)", { lineHeight: "var(--line-height-body-sm)" }],
        "body-xs": ["var(--font-size-body-xs)", { lineHeight: "var(--line-height-body-xs)" }],
        nav: ["var(--font-size-nav)", { lineHeight: "var(--line-height-nav)", fontWeight: "var(--font-weight-nav)" }],
        btn: ["var(--font-size-button)", { lineHeight: "var(--line-height-button)", letterSpacing: "var(--letter-spacing-button)", fontWeight: "var(--font-weight-button)" }],
        "product-title": ["var(--font-size-product-title)", { lineHeight: "var(--line-height-product-title)", fontWeight: "var(--font-weight-product-title)" }],
        "product-spec": ["var(--font-size-product-spec)", { lineHeight: "var(--line-height-product-spec)" }],
        "product-price": ["var(--font-size-product-price)", { lineHeight: "var(--line-height-product-price)", fontWeight: "var(--font-weight-product-price)" }],
      },
      letterSpacing: {
        badge: "var(--letter-spacing-badge)",
      },
    },
  },
  plugins: [],
};