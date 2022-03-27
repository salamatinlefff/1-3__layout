'use strict'

const isEnoughHeight = name => {
  const fullHeight = variables[`${name}Container`].scrollHeight;
  const currentHeight = parseInt(window.getComputedStyle(variables[`${name}Container`]).height);

  if (currentHeight === fullHeight) {
    hideButton(variables[`${name}Button`]);
  } else {
    showButton(variables[`${name}Button`]);
  }
}

const hideButton = button => {
  button.style.display = 'none';
}

const showButton = button => {
  button.style.display = '';
}

const toggleVisibilityButtons = () => {
  isEnoughHeight('About');
  isEnoughHeight('Brands');

window.addEventListener('resize', () => {
    isEnoughHeight('About');
    isEnoughHeight('Brands');
});
}

toggleVisibilityButtons();