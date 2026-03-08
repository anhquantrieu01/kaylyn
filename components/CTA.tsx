import CTAClient from "./CTAClient";
import Image from "next/image";

const PHONE_NUMBER = process.env.PHONE_NUMBER!;
const FACEBOOK_URL = process.env.FACEBOOK_URL!;
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

const schema = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: "Kaylyn Spa",
  telephone: PHONE_NUMBER,
  url: baseUrl,
  sameAs: [FACEBOOK_URL],
};

export default function CTA() {
  return (
    <section
      id="contact"
      className="py-24 px-6 bg-linear-to-b from-pink-50 to-white"
    >
      {/* SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="max-w-5xl mx-auto text-center">

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-serif text-pink-600 mb-4">
          Kết nối với Kaylyn Spa
        </h2>

        <p className="text-neutral-600 max-w-xl mx-auto mb-12">
          Tư vấn trực tiếp – đặt lịch – giải đáp liệu trình chăm sóc da
          phù hợp với làn da của bạn.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">

          {/* Zalo */}
          <div className="flex items-center gap-4 px-6 py-4 rounded-full 
          border border-pink-200 bg-white 
          hover:border-pink-400 hover:shadow-lg transition">

            <a
              href={`https://zalo.me/${PHONE_NUMBER}`}
              target="_blank"
              className="flex items-center gap-3"
            >
              <Image
                src="/images/zalo.png"
                alt="Zalo Kaylyn Spa Pleiku"
                width={28}
                height={28}
              />

              <span className="font-medium text-neutral-800">
                {PHONE_NUMBER}
              </span>
            </a>

            <CTAClient phone={PHONE_NUMBER} />
          </div>

          {/* Facebook */}
          <a
            href={FACEBOOK_URL}
            target="_blank"
            className="px-8 py-4 rounded-full 
            border border-pink-200 bg-white 
            hover:bg-pink-500 hover:text-white 
            hover:border-pink-500
            transition font-medium"
          >
            Facebook
          </a>

        </div>
      </div>
    </section>
  );
}