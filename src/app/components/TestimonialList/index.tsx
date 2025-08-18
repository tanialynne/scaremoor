"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

import { testimonials } from "@/app/constants/Testimonies";
import Testimony from "../Testimonial";

const TestimonialList = () => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      pagination={{ clickable: true }}
      spaceBetween={20}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 6000,
        disableOnInteraction: false,
      }}>
      {testimonials.map((testimony) => (
        <SwiperSlide key={testimony.name} className="mb-20">
          <Testimony name={testimony.name} message={testimony.message} rating={testimony.rating} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TestimonialList;
