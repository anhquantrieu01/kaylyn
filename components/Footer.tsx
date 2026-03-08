
const PHONE_NUMBER = process.env.PHONE_NUMBER!;
const FACEBOOK_URL = process.env.FACEBOOK_URL!;
export default function Footer() {
  return (
    <footer className="relative ">
      {/* soft glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-90 w-90 -translate-x-1/2 rounded-full bg-rose-200/30 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-24 grid gap-14 md:grid-cols-4">
        {/* Brand */}
        <div>
          <h3 className="font-serif text-2xl tracking-wide mb-6 text-neutral-900">
            Kaylyn Spa
          </h3>
          <p className="text-neutral-600 text-sm leading-relaxed max-w-sm">
            Spa da liễu cao cấp chuyên chăm sóc da, phun xăm thẩm mỹ
            và liệu trình Meso chuẩn an toàn – cá nhân hóa theo từng làn da.
          </p>

          {/* Social */}
          <div className="mt-8 flex items-center gap-4">
            <a
              href={`https://zalo.me/${PHONE_NUMBER}`}
              target="_blank"
              className="text-sm text-neutral-700 hover:text-rose-500 transition"
            >
              Zalo
            </a>
            <span className="h-1 w-1 rounded-full bg-neutral-300" />
            <a
              href={FACEBOOK_URL}
              target="_blank"
              className="text-sm text-neutral-700 hover:text-rose-500 transition"
            >
              Facebook
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-xs uppercase tracking-widest mb-6 text-neutral-500">
            Dịch vụ
          </h4>
          <ul className="space-y-3 text-sm text-neutral-700">
            <li className="hover:text-rose-500 transition cursor-default">
              Chăm sóc da chuyên sâu
            </li>
            <li className="hover:text-rose-500 transition cursor-default">
              Phun xăm thẩm mỹ
            </li>
            <li className="hover:text-rose-500 transition cursor-default">
              Meso & trẻ hoá da
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest mb-6 text-neutral-500">
            Liên hệ
          </h4>
          <ul className="space-y-3 text-sm text-neutral-700">
            <li>📍 7A Nguyễn Trãi, phường Diên Hồng, TP Pleiku, Tỉnh Gia Lai</li>
            <li>📞 {PHONE_NUMBER}</li>
            <li>⏰ 08:00 – 22:00 (Hằng ngày)</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest mb-6 text-neutral-500">
            Thông tin
          </h4>
          <ul className="space-y-3 text-sm text-neutral-700">
            <li className="hover:text-rose-500 transition cursor-default">
              Chính sách bảo mật
            </li>
            <li className="hover:text-rose-500 transition cursor-default">
              Điều khoản sử dụng
            </li>
            <li className="hover:text-rose-500 transition cursor-default">
              Giấy phép hoạt động
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#f2dbe4] py-6 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} Kaylyn Spa — Spa chăm sóc da chuyên sâu tại Pleiku, Gia Lai. Mọi quyền được bảo lưu.
      </div>
    </footer>
  );
}
