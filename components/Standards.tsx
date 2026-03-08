export default function Standards() {
  return (
    <section
      className="relative overflow-hidden bg-[#fff8fb] py-28 md:py-36"
      aria-labelledby="standards-heading"
      itemScope
      itemType="https://schema.org/BeautySalon"
    >
      <div className="pointer-events-none absolute -top-48 left-1/2 -translate-x-1/2 w-225 h-225 bg-linear-to-br from-pink-200/40 via-rose-200/30 to-transparent blur-[200px] rounded-full" />

      <div className="relative max-w-6xl mx-auto px-6">
        <header className="relative max-w-4xl mb-20">
          <span
            className="
              absolute -top-20 left-0
              max-w-full overflow-hidden
              text-[12vw] md:text-[120px]
              font-serif font-bold
              tracking-[0.25em]
              text-[#f2dbe3]
              select-none
              leading-none
              whitespace-nowrap
            "
            aria-hidden="true"
          >
            STANDARD
          </span>

          <p className="uppercase tracking-[0.4em] text-rose-500 text-sm font-medium mb-6 relative z-10">
            Kaylyn Spa
          </p>

          <h2
            id="standards-heading"
            className="
              relative z-10
              text-4xl md:text-5xl lg:text-6xl
              font-serif
              leading-tight
              mb-6
              text-[#7a0b32]
            "
            itemProp="name"
          >
            Khi làm đẹp
            <br className="hidden md:block" />
            trở thành một chuẩn mực
          </h2>

          <p
            className="text-[#6b4f58] text-lg leading-relaxed max-w-2xl"
            itemProp="description"
          >
            Kaylyn Spa theo đuổi triết lý làm đẹp an toàn, tinh tế và có chiều sâu —
            nơi mỗi liệu trình đều được thiết kế như một trải nghiệm cá nhân.
          </p>
        </header>

        <div className="space-y-14 md:space-y-16">
          <article className="flex gap-8 items-start">
            <span className="text-5xl md:text-6xl font-serif text-rose-300">
              01
            </span>

            <div className="max-w-2xl">
              <h3 className="font-serif text-2xl md:text-3xl text-[#7a0b32] mb-3">
                Chuẩn y khoa & an toàn
              </h3>
              <p className="text-[#6b4f58] leading-relaxed">
                Liệu trình dựa trên nền tảng da liễu hiện đại, ưu tiên phục hồi,
                nuôi dưỡng làn da khỏe từ gốc thay vì can thiệp xâm lấn.
              </p>
            </div>
          </article>

          <article className="flex gap-8 items-start md:pl-20">
            <span className="text-5xl md:text-6xl font-serif text-rose-300">
              02
            </span>

            <div className="max-w-2xl">
              <h3 className="font-serif text-2xl md:text-3xl text-[#7a0b32] mb-3">
                Cá nhân hóa tuyệt đối
              </h3>
              <p className="text-[#6b4f58] leading-relaxed">
                Mỗi làn da là một câu chuyện riêng, được soi da, tư vấn và xây dựng
                phác đồ phù hợp với tình trạng thực tế.
              </p>
            </div>
          </article>

          <article className="flex gap-8 items-start">
            <span className="text-5xl md:text-6xl font-serif text-rose-300">
              03
            </span>

            <div className="max-w-2xl">
              <h3 className="font-serif text-2xl md:text-3xl text-[#7a0b32] mb-3">
                Trải nghiệm tinh tế & riêng tư
              </h3>
              <p className="text-[#6b4f58] leading-relaxed">
                Không gian yên tĩnh, chạm nhẹ vào cảm xúc, giúp làn da và tinh thần
                cùng được thư giãn và tái tạo.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}