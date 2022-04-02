import 'swiper/css';
import 'swiper/css/pagination';
import Swiper, { Pagination } from 'swiper';
import './scss/index.scss';

Swiper.use({ Pagination });

const variables = {};

const swiper = () => {
  const breakpoint = window.matchMedia('(min-width:580px)');
  let mySwiper;

  const breakpointChecker = () => {
    if (breakpoint.matches && mySwiper) {
      return mySwiper.destroy(true, true);
    } else if (!breakpoint.matches) {
      return enableSwiper();
    }
  };

  const enableSwiper = () => {
    mySwiper = new Swiper('.swiper', {
      modules: [Pagination],
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

const burgerMenu = () => {
  const burgerButton = document.querySelector('.burger-menu');
  const overlay = document.querySelector('.overlay');
  const aside = document.querySelector('.aside');
  const asideButtonClose = aside.querySelector('.aside__button-close');

  const openMenu = () => {
    aside.classList.add('aside--active');
    overlay.classList.add('overlay--active');
  };

  const closeMenu = () => {
    aside.classList.remove('aside--active');
    overlay.classList.remove('overlay--active');
  };

  burgerButton.addEventListener('click', openMenu);
  asideButtonClose.addEventListener('click', closeMenu);

  overlay.addEventListener('click', (event) => {
    if (event.target.classList.contains('overlay')) {
      closeMenu();
    }
  });
};

('use strict');

const about = () => {
  const aboutDesc = document.querySelector('.about__desc');
  const aboutButtonShowContent = document.querySelector(
    '.about__button-show-content'
  );
  const aboutButtonShowContentImg = aboutButtonShowContent.firstElementChild;
  const aboutButtonShowContentText = aboutButtonShowContent.lastElementChild;

  variables.AboutContainer = aboutDesc;
  variables.AboutButton = aboutButtonShowContent;

  let aboutContent = toggleConditionContent();

  aboutButtonShowContent.addEventListener('click', () => {
    if (!aboutContent.activeContent) {
      aboutContent.showContent(
        aboutDesc,
        aboutButtonShowContentImg,
        aboutButtonShowContentText
      );
    } else {
      aboutContent.hideContent(
        aboutDesc,
        aboutButtonShowContentImg,
        aboutButtonShowContentText,
        { aboutContent: true }
      );
    }
  });
};

const brands = () => {
  const brandsList = document.querySelector('.brands__list');
  const brandsButtonShowContent = document.querySelector(
    '.brands__button-show-content'
  );
  const brandsButtonShowContentImg = brandsButtonShowContent.firstElementChild;
  const brandsButtonShowContentText = brandsButtonShowContent.lastElementChild;

  variables.BrandsContainer = brandsList;
  variables.BrandsButton = brandsButtonShowContent;

  const brandsContent = toggleConditionContent();

  brandsButtonShowContent.addEventListener('click', () => {
    if (!brandsContent.activeContent) {
      brandsContent.showContent(
        brandsList,
        brandsButtonShowContentImg,
        brandsButtonShowContentText
      );
    } else {
      brandsContent.hideContent(
        brandsList,
        brandsButtonShowContentImg,
        brandsButtonShowContentText,
        { brandsContent: true }
      );
    }
  });
};

const toggleConditionContent = () => ({
  activeContent: false,
  showContent(container, imgButton, textButton) {
    const fullHeight = container.scrollHeight;

    container.style.height = `${fullHeight}px`;
    imgButton.style.transform = 'scale(1, -1)';
    textButton.textContent = 'Скрыть все';

    this.activeContent = true;
  },
  hideContent(container, imgButton, textButton, option) {
    const { aboutContent, brandsContent } = option;

    if (aboutContent) {
      textButton.textContent = 'Читать далее';
    } else if (brandsContent) {
      textButton.textContent = 'Показать все';
    } else {
      textButton.textContent = 'Показать все';
    }
    container.style.height = '';
    imgButton.style.transform = '';

    this.activeContent = false;
  },
});

const toggleVisibilityButtons = () => {
  const hideButton = (button) => {
    button.style.display = 'none';
  };

  const showButton = (button) => {
    button.style.display = '';
  };

  const isEnoughHeight = (name) => {
    const fullHeight = variables[`${name}Container`].scrollHeight;
    const currentHeight = parseInt(
      window.getComputedStyle(variables[`${name}Container`]).height
    );

    if (currentHeight === fullHeight) {
      hideButton(variables[`${name}Button`]);
    } else {
      showButton(variables[`${name}Button`]);
    }
  };

  const checkWidth = () => {
    isEnoughHeight('About');
    isEnoughHeight('Brands');
  };

  checkWidth();

  const minWidth1000 = window.matchMedia('(min-width: 1000px)');

  minWidth1000.addEventListener('change', () => {
    if (minWidth1000.matches) {
      window.addEventListener('resize', checkWidth);
    } else {
      window.removeEventListener('resize', checkWidth);
    }
  });
};

const init = () => {
  swiper();
  burgerMenu();
  about();
  brands();
  toggleVisibilityButtons();
};

init();
