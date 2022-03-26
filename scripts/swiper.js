import Swiper from './swiper-bundle.esm.browser.min.js';

const breakpoint = window.matchMedia( '(min-width:580px)' );
// keep track of swiper instances to destroy later
let mySwiper;
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
const breakpointChecker = function() {
   // if larger viewport and multi-row layout needed
   if ( breakpoint.matches === true ) {
      // clean up old instances and inline styles when available
      if ( mySwiper !== undefined ) {
        console.log('DESTROY');
        mySwiper.destroy( true, true );
      }
      // or/and do nothing
      return;
   // else if a small viewport and single column layout needed
   } else if ( breakpoint.matches === false ) {
      // fire small viewport version of swiper
      return enableSwiper();
      console.log('NOT DESTROY');
   }
};
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
const enableSwiper = function() {
   mySwiper = new Swiper ('.swiper-container', {
      loop: true,
      slidesPerView: 'auto',
      centeredSlides: true,
      a11y: true,
      keyboardControl: true,
      grabCursor: true,
      // pagination
      pagination: '.swiper-pagination',
      paginationClickable: true,
   });
};
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// keep an eye on viewport size changes
breakpoint.addListener(breakpointChecker);
// kickstart
breakpointChecker();