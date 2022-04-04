import 'swiper/css';
import 'swiper/css/pagination';
import Swiper, { Pagination } from 'swiper';
import './scss/index.scss';

Swiper.use({ Pagination });

const variables = {
  swipers: [],
  swiperContainers: ['.brands__swiper ', '.periphery__swiper'],
};

const swiper = () => {
  const breakpoint = window.matchMedia('(min-width:580px)');
  let swiperCount = variables.swiperContainers.length;

  const breakpointChecker = () => {
    let ifHasSwipers = variables.swipers.length;

    if (breakpoint.matches && ifHasSwipers) {
      return destroySwiper();
    } else if (!breakpoint.matches) {
      return createSwiper();
    }
  };

  function destroySwiper() {
    for (let i = 0; i < swiperCount; i += 1) {
      console.log('variables.swipers[i] destroy :', variables.swipers[i]);
      variables.swipers[i].destroy();
      console.log('variables.swipers[i] :', variables.swipers[i]);
    }
  }

  function createSwiper() {
    const newSwiper = (container) => {
      const newSwiper = new Swiper(container, {
        modules: [Pagination],
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 16,
        pagination: {
          el: '.swiper__pagination',
          type: 'bullets',
          clickable: true,
        },
      });

      return newSwiper;
    };

    for (let i = 0; i < swiperCount; i += 1) {
      variables.swipers[i] = newSwiper(variables.swiperContainers[i]);
    }
  }

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

const addSectionListeners = (
  sectionName,
  sectionContainer,
  sectionButton,
  about = false
) => {
  const sectnContainer = document.querySelector(sectionContainer);
  const sectnButton = document.querySelector(sectionButton);
  const sectnButtonShowContentImg = sectnButton.firstElementChild;
  const sectnButtonShowContentText = sectnButton.lastElementChild;

  variables[`${sectionName}Container`] = sectnContainer;
  variables[`${sectionName}Button`] = sectnButton;

  const sectnContent = toggleConditionContent();

  sectnButton.addEventListener('click', () => {
    if (!sectnContent.activeContent) {
      sectnContent.showContent(
        sectnContainer,
        sectnButtonShowContentImg,
        sectnButtonShowContentText
      );
    } else {
      if (about) {
        sectnContent.hideContent(
          sectnContainer,
          sectnButtonShowContentImg,
          sectnButtonShowContentText,
          true
        );
      } else {
        sectnContent.hideContent(
          sectnContainer,
          sectnButtonShowContentImg,
          sectnButtonShowContentText
        );
      }
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
  hideContent(container, imgButton, textButton, about) {
    if (about) {
      textButton.textContent = 'Читать далее';
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
    isEnoughHeight('about');
    isEnoughHeight('brands');
    isEnoughHeight('periphery');
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
  burgerMenu();
  swiper();
  addSectionListeners(
    'about',
    '.about__desc',
    '.about__button-show-content',
    true
  );
  addSectionListeners(
    'brands',
    '.brands__list',
    '.brands__button-show-content'
  );
  addSectionListeners(
    'periphery',
    '.periphery__list',
    '.periphery__button-show-content'
  );
  toggleVisibilityButtons();
};

init();
