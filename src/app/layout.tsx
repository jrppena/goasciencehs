import type { Metadata } from "next";
import { Anybody, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { getSiteSettings } from "@/lib/db/content";

const anybody = Anybody({
  variable: "--font-anybody",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

// Public pages read live content (e.g. the advisory strip); ISR lets that
// content expire on its own instead of waiting on an admin save.
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();

  return {
    title: {
      default: site.name,
      template: `%s — ${site.shortName}`,
    },
    description: site.description,
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        anybody.variable,
        hankenGrotesk.variable,
        jetbrainsMono.variable,
      )}
    >
      <body className="flex min-h-full flex-col">
        {/* Reveals start at opacity 0 and are un-hidden on hydration. Without
            JS that never happens, so hand those blocks straight back. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
