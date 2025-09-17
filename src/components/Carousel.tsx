"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function Carousel() {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      modules={[Autoplay]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
    >
      <SwiperSlide>
        <img
          src="/image/B1.jpg"
          alt="Banner 1"
          className="w-full h-96 object-cover rounded-xl"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/image/B4.jpg"
          alt="Banner 2"
          className="w-full h-96 object-cover rounded-xl"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/image/B3.jpg"
          alt="Banner 3"
          className="w-full h-96 object-cover rounded-xl"
        />
      </SwiperSlide>
    </Swiper>
  );
}
