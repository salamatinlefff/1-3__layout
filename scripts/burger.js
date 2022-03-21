

function burgerMenu() {
  const burgerButton = document.querySelector('.burger-menu');
  const nav = document.querySelector('.nav');
  const navWrapper = document.querySelector('.nav__wrapper');
  const closeButton = document.querySelector('.nav__button-close');

  const openMenu = () => {
    nav.classList.add('nav--active');
    navWrapper.classList.add('nav__wrapper--active');
  }

  const closeMenu = () => {
    nav.classList.remove('nav--active');
    navWrapper.classList.remove('nav__wrapper--active');
  }

  burgerButton.addEventListener("click", openMenu);
  closeButton.addEventListener('click', closeMenu);

  nav.addEventListener('click', event => {
    if(event.target.classList.contains('nav')) {
      closeMenu();
    }
  })
}

burgerMenu();