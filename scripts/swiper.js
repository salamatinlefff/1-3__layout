const swiper = () => {
  const breakpoint = window.matchMedia('(min-width:580px)');
  let mySwiper;

  const breakpointChecker = () => {
    if (breakpoint.matches === true) {
      if (mySwiper !== undefined) {
        mySwiper.destroy(true, true);
      }
    } else if (breakpoint.matches === false) {
      return enableSwiper();
    }
  };
  const enableSwiper = () => {
    mySwiper = new Swiper('.swiper', {
      loop: true,
      slidesPerView: 'auto',
      spaceBetween: 16,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper__pagination',
        type: 'bullets',
        clickable: true,
      },
    });
  };

  breakpoint.addEventListener('change', breakpointChecker);
  breakpointChecker();
};

swiper();
