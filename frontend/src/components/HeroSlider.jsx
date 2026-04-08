import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const HeroSlider = () => {
  const slides = [
    {
      image: '/hero1.png',
      quote: '"Education is the most powerful weapon which you can use to change the world."'
    },
    {
      image: '/hero2.png',
      quote: '"Opportunity does not knock, it presents itself when you beat down the door."'
    },
    {
      image: '/hero3.png',
      quote: '"Success is not the key to happiness. Happiness is the key to success."'
    },
    {
      image: '/hero4.png',
      quote: '"Your career is your business. It is time for you to manage it as a CEO."'
    }
  ];

  return (
    <div className="hero-slider">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        loop={true}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="slider-item">
              <img src={slide.image} alt={`Hero ${index + 1}`} className="slider-img" />
              <div className="glass slider-caption">
                <p className="slider-quote">{slide.quote}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
