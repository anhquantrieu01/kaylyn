import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google'
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!;
const TIKTOK_URL = process.env.TIKTOK_URL
const FACEBOOK_URL = process.env.FACEBOOK_URL
const PHONE_NUMBER = process.env.PHONE_NUMBER
const playfair = Playfair_Display({
  subsets: ["vietnamese"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  verification: {
    google: "ef_IQ_gGpn_L-nTqO-XzgRhKBs2Fie9PevQn8DH3aAw",
  },
  title: {
    default: "Spa Pleiku Gia Lai | Kaylyn Spa | Meso, Filler, Trị Nám Gia Lai",
    template: "%s | Kaylyn Spa Pleiku",
  },

  description:
    "Kaylyn Spa tại Pleiku Gia Lai chuyên meso căng bóng, filler môi, botox, trị nám, trẻ hóa da công nghệ cao. Spa uy tín tại Pleiku.",

  keywords: [
    "spa Pleiku",
    "spa Gia Lai",
    "meso căng bóng Pleiku",
    "filler môi Pleiku",
    "trị nám Pleiku",
    "peel da Pleiku",
    "trẻ hoá da Pleiku",
    "chăm sóc da Pleiku",
    "điều trị da Pleiku",
    "phun xăm thẩm mỹ Pleiku",
    "spa uy tín Pleiku",
  ],

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: baseUrl,
  },

  openGraph: {
    title: "Kaylyn Spa Pleiku | Spa Uy Tín Gia Lai",
    description:
      "Kaylyn Spa chuyên meso, filler môi, botox, peel da và trẻ hoá da tại Pleiku, Gia Lai.",
    url: baseUrl,
    siteName: "Kaylyn Spa",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: `/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Kaylyn Spa Pleiku",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Kaylyn Spa Pleiku",
    description:
      "Spa uy tín tại Pleiku chuyên meso, filler, botox, trị nám và trẻ hoá da.",
    images: [`/og-image.png`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={`${playfair.variable} antialiased`}>
        {children}

        {/* Local SEO Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BeautySalon",
              name: "Kaylyn Spa",
              image: `${baseUrl}/logo.png`,
              url: baseUrl,
              telephone: PHONE_NUMBER,
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                streetAddress: "7A Nguyễn Trãi",
                addressLocality: "Pleiku",
                addressRegion: "Gia Lai",
                addressCountry: "VN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 13.981845,
                longitude: 107.993371
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday"
                  ],
                  opens: "09:00",
                  closes: "20:00"
                }
              ],

              areaServed: {
                "@type": "City",
                name: "Pleiku"
              },
              sameAs: [
                FACEBOOK_URL,
                TIKTOK_URL,
              ],
            }),
          }}
        />
      </body>
      <GoogleAnalytics gaId="G-DMGKVMB8ZM" />
    </html>
  );
}