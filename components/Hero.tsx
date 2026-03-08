"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Hero() {
  const images = [
    "/images/banners/b1.png",
    "/images/banners/b2.png",
    "/images/banners/b3.png",
    "/images/banners/b4.png",
    "/images/banners/b5.png",
    "/images/banners/b6.png",
  ];

  return (
    <section className="w-full">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        <Carousel
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnInteraction: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem key={src}>
                {/* Banner full width chuẩn */}
                <div className="relative w-full h-65 sm:h-85 md:h-105 lg:h-130 xl:h-155">
                  <Image
                    src={src}
                    alt={`Banner Kaylyn Spa ${index + 1}`}
                    fill
                    priority={index === 0}
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </motion.div>
    </section>
  );
}