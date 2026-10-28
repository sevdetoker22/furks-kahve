import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import "./globals.css";

const siteUrl =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : `http://localhost:${process.env.PORT ?? 3000}`);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Furks Kahve",
  description: "Furks Kahve web sitesi",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Furks Kahve",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr">
      <body>
        <a
          href="#main-content"
          className="sr-only z-[100] rounded bg-espresso px-4 py-3 text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          İçeriğe geç
        </a>
        <Header />
        {children}
      </body>
    </html>
  );
}
