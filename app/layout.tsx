import type { Metadata } from "next";
import { Fraunces, Public_Sans } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "500", "600", "700"],
  style: ["normal", "italic"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = "https://www.sigmalambda.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sigma Lambda Chapter | Alpha Phi Alpha Fraternity, Inc.",
    template: "%s | Sigma Lambda Chapter",
  },
  description:
    "Sigma Lambda Chapter of Alpha Phi Alpha Fraternity, Inc. in New Orleans, Louisiana — chapter history, leadership, programs, events and news since 1925.",
  openGraph: {
    title: "Sigma Lambda Chapter | Alpha Phi Alpha Fraternity, Inc.",
    description:
      "A century of brotherhood in New Orleans. Chapter history, leadership, programs, events and news from Sigma Lambda Chapter.",
    url: siteUrl,
    siteName: "Sigma Lambda Chapter",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sigma Lambda Chapter | Alpha Phi Alpha Fraternity, Inc.",
    description:
      "A century of brotherhood in New Orleans. Chapter history, leadership, programs, events and news from Sigma Lambda Chapter.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${publicSans.variable}`}>
      <body className="flex min-h-screen flex-col">
        <noscript>
          <style>{".reveal{opacity:1!important;transform:none!important;}"}</style>
        </noscript>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
