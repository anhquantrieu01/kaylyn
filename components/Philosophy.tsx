import { TextGenerateEffect } from "./ui/text-generate-effect";

export default function Philosophy() {
  return (
    <section
      className="relative overflow-hidden bg-white py-24 md:py-32 lg:py-40"
      aria-labelledby="philosophy-heading"
    >
      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-225 h-225 bg-rose-100/40 blur-[180px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 -left-32 w-125 h-125 bg-pink-100/40 blur-[160px] rounded-full" />

      <div className="relative max-w-6xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-16 lg:gap-20 items-center">
        
        {/* LEFT */}
        <div className="relative">
          {/* Ghost text (decorative) */}
          <span
            aria-hidden="true"
            className="
              absolute -top-14 -left-2
              text-[70px] md:text-[110px]
              font-serif font-bold
              text-neutral-100
              select-none
              leading-none
            "
          >
            Skin
          </span>

          <p className="uppercase tracking-[0.35em] text-pink-500 text-sm font-semibold mb-6 relative z-10">
            Kaylyn Spa
          </p>

          <h2
            id="philosophy-heading"
            className="
              relative z-10
              text-3xl md:text-4xl lg:text-5xl
              font-serif
              text-neutral-900
              leading-tight
            "
          >
            Khi làn da <br />
            được <span className="italic text-rose-500">hiểu</span> đúng cách
          </h2>

          <div className="mt-8 w-20 h-0.5 bg-linear-to-r from-pink-400 to-rose-400 rounded-full" />
        </div>

        {/* RIGHT CONTENT */}
        <div>
          {/* Text animation nhưng vẫn thân thiện SEO */}
          <p className="sr-only">
            Mỗi làn da là một cá thể riêng biệt. Tại Kaylyn Spa, mọi liệu trình
            đều bắt đầu từ sự thấu hiểu — thăm khám chính xác, phân tích chuyên
            sâu và thiết kế cá nhân hóa. Chúng tôi kết hợp công nghệ hiện đại
            cùng tư duy thẩm mỹ tinh tế để mang lại hiệu quả an toàn, tự nhiên
            và bền vững theo thời gian.
          </p>

          <TextGenerateEffect
            words="Mỗi làn da là một cá thể riêng biệt. Tại Kaylyn Spa, mọi liệu trình đều bắt đầu từ sự thấu hiểu — thăm khám chính xác, phân tích chuyên sâu và thiết kế cá nhân hóa. Chúng tôi kết hợp công nghệ hiện đại cùng tư duy thẩm mỹ tinh tế để mang lại hiệu quả an toàn, tự nhiên và bền vững theo thời gian."
            className="
              text-neutral-600
              text-base md:text-lg lg:text-xl
              leading-relaxed
            "
          />
        </div>
      </div>
    </section>
  );
}