function burgerMenu(option) {

  const {
    selectorButton = '.burger-menu',
    activeBurger = 'is-active',
    selectorMenu,
    openMenuSelector
  } = option

  const burgerButton = document.querySelector(selectorButton);

  burgerButton.addEventListener("click", event => {
    event.preventDefault();
    burgerButton.classList.toggle(activeBurger)
  });
}

burgerMenu({
  selectorMenu: '.navigation__list',
  openMenuSelector: 'navigation__list_active',
})