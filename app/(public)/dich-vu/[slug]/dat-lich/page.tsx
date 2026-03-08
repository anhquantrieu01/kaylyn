import BookingForm from "@/features/booking/components/BookingForm"
import { notFound } from "next/navigation"
import { getServiceBySlug } from "@/features/services/services"
import type { Metadata } from "next"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {

  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) return {}

  return {
    title: `Đặt lịch ${service.title} | Kaylyn Spa`,
    description: service.description,

    alternates: {
      canonical: `${baseUrl}/dich-vu/${slug}/dat-lich`,
    },

    openGraph: {
      title: `Đặt lịch ${service.title}`,
      description: service.description || "Đặt lịch dịch vụ làm đẹp tại Kaylyn Spa Pleiku",
      url: `${baseUrl}/dich-vu/${slug}/dat-lich`,
      type: "website",
      locale: "vi_VN",
    },

    twitter: {
      card: "summary_large_image",
      title: `Đặt lịch ${service.title}`,
      description: service.description || "Đặt lịch dịch vụ làm đẹp tại Kaylyn Spa Pleiku",
    },
  }
}

export default async function BookingPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {

  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) return notFound()

  const price = service.salePrice ?? service.price

  return (
    <main className="max-w-6xl mx-auto py-12 px-8 grid md:grid-cols-2 gap-10">

      <section>

        <h1 className="text-4xl font-bold mb-4">
          Đặt lịch {service.title}
        </h1>

        <p className="text-gray-600 mb-6">
          {service.description}
        </p>

        <div className="bg-pink-50 p-6 rounded-xl">

          <p className="text-lg font-semibold">
            Giá: {price.toLocaleString()}đ
          </p>

        </div>

      </section>

      <BookingForm serviceId={service.id} />



      {/* SERVICE SCHEMA */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            description: service.description,
            provider: {
              "@type": "BeautySalon",
              name: "Kaylyn Spa",
              url: baseUrl,
            },
            areaServed: {
              "@type": "City",
              name: "Pleiku",
            },
            offers: {
              "@type": "Offer",
              price: price,
              priceCurrency: "VND",
              availability: "https://schema.org/InStock",
              url: `${baseUrl}/dich-vu/${slug}/dat-lich`,
            },
            potentialAction: {
              "@type": "ReserveAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: `${baseUrl}/dich-vu/${slug}/dat-lich`,
              },
            },
          }),
        }}
      />

    </main>
  )
}