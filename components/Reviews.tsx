import { AnimatedTestimonials } from "./ui/animated-testimonials";

const testimonials = [
  {
    quote:
      "Da mình mỏng và dễ kích ứng nhưng làm meso ở Kaylyn Spa rất nhẹ. Sau 1 tuần da căng mịn rõ rệt.",
    name: "Ngọc Trâm",
    designation: "Khách hàng Meso",
    src: "/images/users/a1.jpg",
  },
  {
    quote:
      "Kỹ thuật viên làm rất kỹ, da săn chắc hơn nhưng vẫn tự nhiên. Không bị đơ hay cứng mặt.",
    name: "Thuỳ Linh",
    designation: "Khách trẻ hoá da",
    src: "/images/users/a2.jpg",
  },
  {
    quote:
      "Tư vấn rất kỹ, không hề chèo kéo. Làm xong da khoẻ chứ không bị bóng giả.",
    name: "Mai Anh",
    designation: "Khách chăm sóc da",
    src: "/images/users/a3.jpg",
  },
  {
    quote:
      "Da yếu sau treatment nhưng được phục hồi nhanh. Cảm giác spa làm việc rất có tâm.",
    name: "Khánh Vy",
    designation: "Khách phục hồi da",
    src: "/images/users/a4.jpg",
  },
  {
    quote:
      "Không gian yên tĩnh, làm xong da dịu hẳn. Mỗi lần tới là thấy dễ chịu hơn.",
    name: "Bảo Ngọc",
    designation: "Khách thư giãn da",
    src: "/images/users/a5.jpg",
  },
];

export default function Reviews() {
  return (
    <section
      className="relative overflow-hidden py-32"
      itemScope
      itemType="https://schema.org/Review"
    >
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(244,114,182,0.2),transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <header className="mx-auto mb-24 max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-rose-400">
            Real Feedback
          </p>

          <h2 className="mt-6 text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900">
            Khách hàng nói gì về Kaylyn Spa
          </h2>

          <p className="mt-5 text-neutral-500">
            Trải nghiệm thật – Hiệu quả thật – Không quảng cáo quá đà
          </p>
        </header>

        <AnimatedTestimonials autoplay testimonials={testimonials} />
      </div>
    </section>
  );
}