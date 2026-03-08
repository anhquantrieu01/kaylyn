"use client";

import { motion } from "framer-motion";

export default function PromoMarquee() {
  return (
    <div className="bg-[#7F0D34] py-2">
      {/* vùng chạy ở giữa */}
      <div className="relative overflow-hidden max-w-4xl mx-auto">
        <motion.div
          className="flex w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 10,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {/* block gốc */}
          <div className="flex whitespace-nowrap text-white text-lg font-semibold px-6">
            KAYLYN SPA | ƯU ĐÃI VIP 💎 CHẠM TỚI VẺ ĐẸP TINH TẾ – 50 SUẤT ĐẶC QUYỀN DÀNH RIÊNG CHO KHÁCH HÀNG KHU VỰC
          </div>

          {/* block clone để nối đuôi */}
          <div className="flex whitespace-nowrap text-white text-lg font-semibold px-6">
            KAYLYN SPA | ƯU ĐÃI VIP 💎 CHẠM TỚI VẺ ĐẸP TINH TẾ – 50 SUẤT ĐẶC QUYỀN DÀNH RIÊNG CHO KHÁCH HÀNG KHU VỰC
          </div>
        </motion.div>
      </div>
    </div>
  );
}
