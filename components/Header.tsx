import Link from "next/link";
import Image from "next/image";
import PromoMarquee from "./PromoMarquee";
import HeaderClient from "./HeaderClient";

const navItems = [
  { href: "/dich-vu", label: "Dịch vụ Spa" },
  { href: "/#contact", label: "Liên hệ" },
  { href: "/bai-viet", label: "Bài viết làm đẹp" },
];

export default function Header() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <PromoMarquee />

        <div className="backdrop-blur-xl bg-white/80 shadow-sm border-b border-pink-100">
          <div className="max-w-7xl mx-auto px-4 md:px-6 h-18 flex items-center justify-between">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
              aria-label="Kaylyn Spa trang chủ"
            >
              <Image
                src="/favicon.png"
                alt="Kaylyn Spa Pleiku Gia Lai"
                width={46}
                height={46}
                priority
                className="transition-transform duration-300 group-hover:scale-105"
              />

              <span className="font-serif text-xl md:text-2xl font-bold tracking-wide bg-linear-to-r from-pink-500 via-fuchsia-500 to-rose-400 bg-clip-text text-transparent">
                Kaylyn Spa
              </span>
            </Link>

            {/* Desktop menu SEO */}
            <nav aria-label="Main navigation" className="hidden md:block">
              <ul className="flex items-center gap-10 text-[15px] font-semibold text-neutral-700">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="
                        relative transition-colors duration-300
                        hover:text-rose-500
                        after:absolute after:left-0 after:-bottom-1
                        after:h-0.5 after:w-0
                        after:bg-linear-to-r after:from-pink-400 after:to-rose-400
                        after:transition-all after:duration-300
                        hover:after:w-full
                      "
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Phần interactive */}
            <HeaderClient navItems={navItems} />
          </div>
        </div>
      </header>

      {/* tránh header che content */}
      <div className="h-28" />
    </>
  );
}