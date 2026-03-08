

const steps = [
  {
    step: "01",
    title: "Thăm khám & soi da chuyên sâu",
    desc: "Phân tích tình trạng da bằng thiết bị hiện đại, xác định nguyên nhân gốc rễ."
  },
  {
    step: "02",
    title: "Tư vấn liệu trình cá nhân hóa",
    desc: "Xây dựng phác đồ riêng biệt, phù hợp cơ địa và mục tiêu làn da."
  },
  {
    step: "03",
    title: "Thực hiện điều trị",
    desc: "Ứng dụng công nghệ an toàn trong không gian chuẩn da liễu."
  },
  {
    step: "04",
    title: "Theo dõi & chăm sóc sau",
    desc: "Đồng hành lâu dài, tối ưu hiệu quả và duy trì làn da khỏe."
  }
];

export default function Process() {
  return (
    <section className="py-32 px-6 " id="process">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-20 text-neutral-900">
          Quy trình chuẩn y khoa
        </h2>

        <div className="space-y-14">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className={`
                group relative flex flex-col md:flex-row gap-10 p-12 rounded-[32px]
                bg-white/70 backdrop-blur-xl
                border border-[#f2dbe4]
                shadow-[0_10px_40px_-20px_rgba(236,72,153,0.25)]
                hover:shadow-[0_20px_60px_-15px_rgba(236,72,153,0.35)]
                transition-all duration-500
                ${index % 2 === 1 ? "md:flex-row-reverse" : ""}
              `}
            >
              {/* Step number */}
              <div
                className="
                  text-7xl font-serif leading-none
                  bg-linear-to-br from-pink-400 via-rose-400 to-fuchsia-500
                  bg-clip-text text-transparent
                  opacity-80 group-hover:opacity-100
                  transition
                "
              >
                {item.step}
              </div>

              {/* Content */}
              <div className="max-w-xl">
                <h3 className="text-xl md:text-2xl font-medium text-neutral-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Soft glow */}
              <div
                className="
                  pointer-events-none absolute inset-0 rounded-[32px]
                  bg-linear-to-br from-pink-200/20 via-transparent to-fuchsia-200/20
                  opacity-0 group-hover:opacity-100
                  transition duration-500
                "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
