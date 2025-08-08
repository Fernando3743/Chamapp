import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { BANNER_SLIDES, SWIPER_CONFIG } from '../constants';

export default function HeroBanner() {
  return (
    <div className="px-4 mt-4">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={16}
        slidesPerView={1}
        pagination={SWIPER_CONFIG.pagination}
        autoplay={SWIPER_CONFIG.autoplay}
        loop={true}
        className="swiper-hero"
      >
        {BANNER_SLIDES.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className={`bg-gradient-to-r ${slide.gradient} rounded-2xl p-6 text-white overflow-hidden h-[224px]`}>
              <div className="flex justify-between items-start h-full">
                <div className="flex-1 z-10 flex flex-col justify-center">
                  <h2 className="text-2xl font-bold mb-1">{slide.title}</h2>
                  <p className="text-sm opacity-90 mb-1">{slide.subtitle}</p>
                  <p className="text-sm opacity-90 mb-4">{slide.description}</p>
                  <button className="bg-white text-blue-600 px-6 py-2 rounded-full text-sm font-semibold w-fit">
                    Shop Now
                  </button>
                </div>
                <div className="relative w-32 h-full flex items-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-20 h-28 ${slide.phoneColor} rounded-xl transform rotate-6 shadow-2xl`}></div>
                    <div className="absolute w-20 h-28 bg-pink-300 rounded-xl transform -rotate-6 opacity-80"></div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}