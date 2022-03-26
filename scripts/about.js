'use strict'

const aboutButtonContinue = document.querySelector('.about__button-continue');
const aboutDesc = document.querySelector('.about__desc');

const showAboutInfo = () => {
  aboutDesc.classList.remove('about--shadow');
  aboutDesc.classList.remove('about--hide-text');
};

const hideButtonReadMore = () => {
  aboutButtonContinue.remove();
};

aboutButtonContinue.addEventListener('click', () => {
  showAboutInfo();
  hideButtonReadMore();
});