import type { Metadata } from "next"
import ServicesFilter from "@/components/ServicesFilter"
import { getServicesGrouped } from "@/features/services/services"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL

export const metadata: Metadata = {
    title: "Dịch vụ Spa Pleiku | Meso, Filler, Trị Nám - Kaylyn Spa",
    description:
        "Kaylyn Spa tại Pleiku Gia Lai chuyên meso căng bóng, filler môi, botox, trị nám, peel da và chăm sóc da công nghệ cao.",
    keywords: [
        "dịch vụ spa Pleiku",
        "meso căng bóng Pleiku",
        "filler môi Pleiku",
        "trị nám Pleiku",
        "peel da Pleiku",
        "spa Gia Lai"
    ],
    alternates: {
        canonical: `${baseUrl}/dich-vu`
    },
    openGraph: {
        title: "Dịch vụ Spa Pleiku | Kaylyn Spa",
        description:
            "Các dịch vụ làm đẹp tại Kaylyn Spa Pleiku: meso, filler, botox, trị nám, peel da.",
        url: `${baseUrl}/dich-vu`,
        type: "website",
        locale: "vi_VN"
    }
}

export default async function ServicesPage() {

    const categories = await getServicesGrouped()

    return (

        <main className="max-w-6xl mx-auto px-4 py-12">

            {/* HERO */}

            <header className="mb-10 text-center">

                <h1 className="text-4xl font-bold mb-4">
                    Dịch vụ làm đẹp tại Kaylyn Spa
                </h1>

                <p className="text-gray-600 max-w-2xl mx-auto">
                    Khám phá các dịch vụ làm đẹp tại Kaylyn Spa Pleiku như meso căng bóng,
                    filler môi, botox, trị nám, peel da và trẻ hóa da công nghệ cao.
                </p>

            </header>


            <ServicesFilter categories={categories} />


            {/* Local Business Schema */}

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
                        areaServed: "Pleiku",
                        priceRange: "$$"
                    })
                }}
            />

        </main>

    )
}