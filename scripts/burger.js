'use strict'

const burgerMenu = () => {
  const burgerButton = document.querySelector('.burger-menu');
  const overlay = document.querySelector('.overlay');
  const aside = document.querySelector('.aside');
  const asideButtonClose = aside.querySelector('.aside__button-close');

  const openMenu = () => {
    aside.classList.add('aside--active');
    overlay.classList.add('overlay--active');
  }

  const closeMenu = () => {
    aside.classList.remove('aside--active');
    overlay.classList.remove('overlay--active');
  }

  burgerButton.addEventListener('click', openMenu);
  asideButtonClose.addEventListener('click', closeMenu);

  overlay.addEventListener('click', event => {
    if(event.target.classList.contains('overlay')) {
      closeMenu();
    }
  })
};

burgerMenu();