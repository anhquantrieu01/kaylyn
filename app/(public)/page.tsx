import type { Metadata } from "next"
import About from "@/components/About";
import CTA from "@/components/CTA";
import CustomerResults from "@/components/CustomerResults";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Process from "@/components/Process";
import Reviews from "@/components/Reviews";
import ServicesSection from "@/components/Service";
import Standards from "@/components/Standards";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL


export const metadata: Metadata = {
  title: "Kaylyn Spa Pleiku | Spa Uy Tín Gia Lai",
  description:
    "Kaylyn Spa tại Pleiku chuyên meso, filler môi, botox, peel da và trẻ hoá da tại Pleiku, Gia Lai.",
  alternates: {
    canonical: baseUrl
  },
  openGraph: {
    title: "Kaylyn Spa Pleiku",
    description:
      "Spa uy tín tại Pleiku Gia Lai chuyên meso, filler, botox và trị nám.",
    url: baseUrl,
    locale: "vi_VN",
    type: "website"
  }
}
export default function Home() {
  return (

    <main className="bg-white bg-[url(/images/bg.png)] overflow-hidden">
      <Hero />
      <About />
      <Philosophy />
      <ServicesSection />
      <CustomerResults />
      <Reviews />
      <Standards />
      <Process />
      <CTA />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BeautySalon",
            name: "Kaylyn Spa",
            url: baseUrl,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Pleiku",
              addressRegion: "Gia Lai",
              addressCountry: "VN"
            },
            areaServed: "Pleiku"
          })
        }}
      />
    </main>

  );
}
