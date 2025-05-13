'use client';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFade, A11y, Autoplay, Zoom } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/a11y';
import 'swiper/css/effect-fade';
import 'swiper/css/zoom';
// import Swiper core and required modules
import Image from 'next/image';

interface GoodsSliderProps {
  images: { id: number; url: string; productId: number }[];
}

function GoodsSlider({ images }: GoodsSliderProps) {
  return (
    <Swiper
      modules={[Pagination, A11y, Autoplay, EffectFade, Zoom]}
      spaceBetween={10}
      slidesPerView={1}
      zoom={true}
      pagination={{ clickable: true }}
      effect={'fade'}
      autoplay={{ delay: 5000 }}
      //   onSlideChange={() => console.log('slide change')}
      //   onSwiper={(swiper) => console.log(swiper)}
    >
      {images.map((image) => (
        <SwiperSlide key={image.id}>
          <div className="swiper-zoom-container">
            <Image
              src={image.url}
              alt={`Картинка продукта ${image.productId.toString()}`}
              width={295}
              height={393}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default GoodsSlider;
