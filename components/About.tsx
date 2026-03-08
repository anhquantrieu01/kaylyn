import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="w-full py-16 md:py-20"
      aria-labelledby="about-heading"
      itemScope
      itemType="https://schema.org/BeautySalon"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT CONTENT */}
        <div className="space-y-6">
          <header className="space-y-4">
            <p className="inline-block text-pink-500 font-semibold tracking-wide uppercase">
              Kaylyn Spa
            </p>

            <h2
              id="about-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight"
              itemProp="name"
            >
              Spa chăm sóc da chuyên sâu tại Pleiku
              <span className="block text-pink-500">
                Nơi làn da được yêu chiều đúng cách
              </span>
            </h2>
          </header>

          <p
            className="text-gray-600 text-base md:text-lg leading-relaxed"
            itemProp="description"
          >
            Kaylyn Spa mang đến trải nghiệm chăm sóc da chuyên sâu,
            kết hợp giữa công nghệ hiện đại và liệu trình an toàn,
            nhẹ nhàng – phù hợp cho làn da châu Á.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Chúng tôi tập trung vào các dịch vụ như
            <strong className="text-pink-500 font-semibold">
              {" "}
              meso không kim
            </strong>
            , phục hồi – cấp ẩm – tái tạo da, giúp bạn sở hữu làn da khỏe đẹp
            tự nhiên và bền vững theo thời gian.
          </p>

          {/* STATS */}
          <div className="flex items-center gap-10 pt-6">
            <div>
              <p className="text-3xl font-bold text-pink-500">5+</p>
              <p className="text-gray-500 text-sm md:text-base">
                Năm kinh nghiệm
              </p>
            </div>

            <div>
              <p className="text-3xl font-bold text-pink-500">1000+</p>
              <p className="text-gray-500 text-sm md:text-base">
                Khách hàng hài lòng
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative w-full" itemProp="image">
          <div className="absolute -top-6 -left-6 w-full h-full bg-pink-200 rounded-3xl opacity-30" />

          <div className="relative w-full aspect-4/5 md:aspect-square">
            <Image
              src="/images/banners/about.png"
              alt="Kaylyn Spa Pleiku chăm sóc da công nghệ hiện đại"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-3xl shadow-xl"
              itemProp="image"
            />
          </div>
        </div>

      </div>
    </section>
  );
}