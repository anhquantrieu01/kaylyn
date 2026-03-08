import Image from "next/image";

const results = [
  {
    title: "Laser Carbon – Làm sáng da, hỗ trợ ngăn ngừa lão hoá",
    image: "/images/customers/k1.jpg",
  },
  {
    title: "Điều trị nám, tàn nhang – Thu nhỏ lỗ chân lông",
    image: "/images/customers/k2.jpg",
  },
  {
    title: "Xoá nhăn – Da mịn màng rõ rệt sau vài ngày",
    image: "/images/customers/k3.jpg",
  },
  {
    title: "Filler môi – Dáng môi căng mọng tự nhiên",
    image: "/images/customers/k4.jpg",
  },
  {
    title: "Meso săn cơ – Da săn chắc và đàn hồi hơn",
    image: "/images/customers/k5.jpg",
  },
  {
    title: "Filler môi – Cải thiện môi mỏng, tạo form hài hòa",
    image: "/images/customers/k6.jpg",
  },
  {
    title: "Căn chỉnh Full Face – Gương mặt cân đối hài hòa",
    image: "/images/customers/k7.jpg",
  },
  {
    title: "Combo Full Face – Trẻ hoá toàn diện gương mặt",
    image: "/images/customers/k8.jpg",
  },
  {
    title: "Làm đầy trũng mắt – Gương mặt tươi tắn hơn",
    image: "/images/customers/k9.jpg",
  },
  {
    title: "Căn chỉnh tai tài lộc – Dáng tai hài hòa tự nhiên",
    image: "/images/customers/k10.jpg",
  },
  {
    title: "Tạo hình tai phong thủy – Cân đối và tinh tế",
    image: "/images/customers/k11.jpg",
  },
  {
    title: "Điều trị nám và tàn nhang – Da sáng đều màu",
    image: "/images/customers/k12.jpg",
  },
  {
    title: "Combo Full Face – Nâng cơ và trẻ hoá tổng thể",
    image: "/images/customers/k13.jpg",
  },
  {
    title: "Combo Full Face – Cải thiện đường nét gương mặt",
    image: "/images/customers/k14.jpg",
  },
];

export default function CustomerResults() {
  return (
    <section
      className="relative bg-white py-28"
      itemScope
      itemType="https://schema.org/ImageGallery"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header SEO */}
        <header className="mx-auto mb-20 max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-rose-400">
            KẾT QUẢ THỰC TẾ
          </p>

          <h2 className="mt-6 text-4xl md:text-5xl font-semibold text-neutral-900">
            Hình ảnh khách hàng
            <span className="block bg-linear-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">
              Sau khi làm dịch vụ
            </span>
          </h2>

          <p className="mt-5 text-neutral-500">
            Hình ảnh được chụp trực tiếp tại spa sau khi khách hoàn thành dịch vụ
          </p>
        </header>

        {/* Gallery */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {results.map((item, i) => (
            <article
              key={i}
              className="group relative overflow-hidden rounded-[26px] shadow-md hover:shadow-xl transition duration-500"
              itemScope
              itemType="https://schema.org/ImageObject"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={500}
                height={320}
                className="h-80 w-full object-cover transition duration-700 group-hover:scale-105"
                itemProp="contentUrl"
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent opacity-80" />

              {/* content */}
              <div className="absolute bottom-0 p-5 text-white">
                <h3
                  className="text-sm font-semibold tracking-wide"
                  itemProp="name"
                >
                  {item.title}
                </h3>
              </div>

              {/* border glow */}
              <div className="absolute inset-0 rounded-[26px] border border-white/30" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}