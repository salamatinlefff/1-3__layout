import 'swiper/css';
import 'swiper/css/pagination';
import Swiper, { Pagination } from 'swiper';
import './scss/index.scss';

Swiper.use({ Pagination });

const page = () => {
  const variables = {
    swipers: [],
    swiperContainers: [
      '.brands__swiper',
      '.periphery__swiper',
      '.price__swiper',
    ],
    successSends: document.querySelectorAll('.success-send'),
    modalCallTitle: document.querySelector('.modal-call__title'),
    modalFeedbackTitle: document.querySelector('.modal-feedback__title'),
    scrollWidth: window.innerWidth - document.body.clientWidth,
  };

  const swiper = () => {
    const priceTitles = document.querySelectorAll('.service-item__title');
    const breakpoint = window.matchMedia('(min-width:576px)');
    let swiperCount = variables.swiperContainers.length;

    const breakpointChecker = () => {
      let ifHasSwipers = variables.swipers.length;

      if (breakpoint.matches) {
        togglePriceTitles(true);
      }

      if (breakpoint.matches && ifHasSwipers) {
        return destroySwiper();
      } else if (!breakpoint.matches) {
        togglePriceTitles();
        return createSwiper();
      }
    };

    function togglePriceTitles(hide) {
      if (hide) {
        priceTitles.forEach((title) => {
          title.classList.add('visually-hidden');
        });
      } else {
        priceTitles.forEach((title) => {
          title.classList.remove('visually-hidden');
        });
      }
    }

    function destroySwiper() {
      for (let i = 0; i < swiperCount; i += 1) {
        variables.swipers[i].destroy();
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

  const overlay = () => {
    const burgerButton = document.querySelector('.burger-menu');
    const overlay = document.querySelector('.overlay');
    const aside = document.querySelector('.aside');
    const asideButtonClose = aside.querySelector('.aside__button-close');
    const modalCall = document.querySelector('.page__modal-call');
    const modalCallButtonClose = modalCall.querySelector(
      '.modal-call__button-close'
    );
    const buttonCall = document.querySelectorAll('.contacts__button--call');
    const modalFeedback = document.querySelector('.page__modal-feedback');
    const modalFeedbackButtonClose = modalFeedback.querySelector(
      '.modal-feedback__button-close'
    );
    const buttonFeedback = document.querySelectorAll(
      '.contacts__button--feedback'
    );

    const pageHeight = document.documentElement.scrollHeight;

    const arrayPopupsForListener = [
      {
        button: burgerButton,
        section: aside,
        activeClass: 'aside--active',
      },
      {
        button: buttonCall,
        section: modalCall,
        activeClass: 'modal-call--active',
        needCloseMenu: true,
      },
      {
        button: buttonFeedback,
        section: modalFeedback,
        activeClass: 'modal-feedback--active',
        needCloseMenu: true,
      },
    ];

    const openPopup = (section, sectionClassActive, needCloseMenu) => {

      section.style.height = `${pageHeight}px`;
      section.classList.add(sectionClassActive);
      overlay.classList.add('overlay--active');

      if (needCloseMenu) {
        closeMenu();
        overlay.style.zIndex = 3;
      }
    };

    const closePopup = (needCloseMenu) => {
      [...document.forms].forEach((form) => {
        form.classList.remove('visually-hidden');
        form.style.opacity = 1;
      });
      variables.modalCallTitle.style.opacity = 1;
      variables.modalFeedbackTitle.style.opacity = 1;
      variables.modalCallTitle.classList.remove('visually-hidden');
      variables.modalFeedbackTitle.classList.remove('visually-hidden');
      variables.successSends.forEach((successSend) => {
        successSend.innerHTML = '';
      });

      modalFeedback.classList.remove('modal-feedback--active');
      modalCall.classList.remove('modal-call--active');
      overlay.classList.remove('overlay--active');
      overlay.style.zIndex = '';
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';

      if (needCloseMenu) closeMenu();
    };

    const closeMenu = () => {
      aside.classList.remove('aside--active');
    };

    const openButtonsListeners = (data) => {
      data.forEach((popup) => {
        if (popup.button.length) {
          return popup.button.forEach((button) => {
            button.addEventListener('click', () => {
              openPopup(popup.section, popup.activeClass, popup.needCloseMenu);
            });
          });
        }
        popup.button.addEventListener('click', () => {
          openPopup(popup.section, popup.activeClass, popup.needCloseMenu);
        });
      });
    };

    const closeButtonsListener = (...buttons) => {
      buttons.forEach((button) => {
        button.addEventListener('click', () => {
          closePopup();
          if (button === asideButtonClose) closeMenu();
        });
      });
    };

    openButtonsListeners(arrayPopupsForListener);
    closeButtonsListener(
      asideButtonClose,
      modalCallButtonClose,
      modalFeedbackButtonClose
    );

    overlay.addEventListener('click', (event) => {
      if (event.target.classList.contains('overlay'))
        closePopup('and-close-menu-please');
    });
  };

  const sendForms = () => {
    [...document.forms].forEach((form) => {
      addListeners(form);
    });

    const createMessageAfterSend = (json, err) => {
      if (err) {
        variables.successSends.forEach((successSend) => {
          successSend.innerHTML = `
            <h2 class='success-send__title'>К сожалению произошли технические шоколадки. Попробуйте позднее или свяжитесь с нами по номеру телефона 8-800-555-35-35</h2>
            `;
        });
      }

      variables.successSends.forEach((successSend) => {
        successSend.innerHTML = `
            <h2 class='success-send__title'>Заявка успешно отправлена</h2>
            <div class="success-send__wrapper">
            ${
              json.name
                ? `<p class="success-send__text">Имя:</p>
                <p class="success-send__value">${json.name}</p>`
                : ''
            }
            ${
              json.telephone
                ? `<p class="success-send__text">Телефон:</p>
                <p class="success-send__value">${json.telephone}</p>`
                : ''
            }
            ${
              json.email
                ? `<p class="success-send__text">Почта:</p>
                <p class="success-send__value">${json.email}</p>`
                : ''
            }
            ${
              json.message
                ? `<p class="success-send__text">Сообщение:</p>
                <p class="success-send__value">${json.message}</p>`
                : ''
            }
            </div>
            `;
      });
    };

    function addListeners(form) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const values = Object.fromEntries([...formData]);

        form.style.opacity = 0;
        variables.modalCallTitle.style.opacity = 0;
        variables.modalFeedbackTitle.style.opacity = 0;

        setTimeout(() => {
          form.classList.add('visually-hidden');
          variables.modalCallTitle.classList.add('visually-hidden');
          variables.modalFeedbackTitle.classList.add('visually-hidden');
          form.reset();
        }, 340);

        fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
          .then((response) => response.json())
          .then((json) => {
            createMessageAfterSend(json);
          })
          .catch((err) => {
            createMessageAfterSend(false, err);
          });
      });
    }
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
    overlay();
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
    sendForms();
  };

  init();
};

page();
