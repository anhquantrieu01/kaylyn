"use client";

import { motion } from "framer-motion";

export default function ServiceVideos({services}: {services: {title: string; desc: string; video: string}[]}) {
  return (
    <section className="relative overflow-hidden bg-[#fff8fb] py-32">
      {/* Glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-1/2 h-105 w-105 -translate-x-1/2 rounded-full bg-pink-200/40 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-80 w-[320px] bg-rose-200/40 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-rose-400">
            KAYLYN SPA
          </p>

          <h2 className="mt-6 text-4xl md:text-5xl font-semibold text-neutral-900 leading-tight">
            Trải nghiệm dịch vụ
            <span className="block bg-linear-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">
              Chăm sóc da cao cấp
            </span>
          </h2>

          <p className="mt-5 text-neutral-500">
            Video thực tế tại spa giúp bạn hiểu rõ quy trình và hiệu quả dịch vụ
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="group relative h-85 overflow-hidden rounded-[28px] shadow-lg"
            >
              <video
                src={s.video}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                title={s.title}
                className="absolute inset-0 h-full w-full object-cover brightness-100 contrast-105 transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />

              <div className="absolute inset-0 rounded-[28px] border border-white/30" />

              <div className="relative z-10 flex h-full flex-col justify-end p-6">
                <h3 className="text-lg font-semibold text-white leading-snug">
                  {s.title}
                </h3>

                <p className="mt-1 text-sm text-white/90">{s.desc}</p>

                <div className="mt-4 h-0.5 w-0 bg-white/80 transition-all duration-500 group-hover:w-12" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}