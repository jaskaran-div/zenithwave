import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const interTight = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin"] });
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});
// Hero headlines (reference-site style): condensed, bold, via the width/optical-size axes.
const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], axes: ["wdth", "opsz"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Learn the craft. Trade the capital.`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | Learn the craft. Trade the capital.`,
    description: site.description,
    url: site.url,
    locale: "en_GB",
  },
};

export const viewport: Viewport = {
  themeColor: "#f2f3f7",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${interTight.variable} ${instrument.variable} ${jetbrains.variable} ${bricolage.variable}`}>
      {/* Header/footer come from each site's route-group layout: (main), (funded), (it) */}
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
