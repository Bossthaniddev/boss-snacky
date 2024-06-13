import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import PromotionsMockup from '../../dataMockup/promotionsMockup.json';

function Promotions() {
  const promotionsData = PromotionsMockup.promotions;

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  };

  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  return (
    <>
      <div className="hero-slide">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          pagination={pagination}
          modules={[Autoplay, Pagination, Navigation]}
          className="topMovieSwiper"
        >
          {
            promotionsData.map((item, i) => (
              <SwiperSlide key={i}>
                {({ isActive }) => (
                  // <HeroSlideItem loading={loading} item={item} className={`${isActive ? 'active' : ''}`} />
                  <div className={`${isActive ? 'active hero min-h-96' : 'hero min-h-96'}`} style={{backgroundImage:  `url(${item.image_url})`}}></div>
                )}
              </SwiperSlide>
            ))
          }
          <div className="autoplay-progress" slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        </Swiper>
      </div>
    </>
  )
}

export default Promotions