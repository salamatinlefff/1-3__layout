const buttonReadMore = document.querySelector('.about__button-continue');
const aboutDesc = document.querySelector('.about__desc');

const showAboutInfo = () => {
  aboutDesc.classList.toggle('about__desc--shadow');
  aboutDesc.classList.toggle('about__desc--hide-text');
}

const hideButtonReadMore = () => {
  buttonReadMore.remove()
}

buttonReadMore.addEventListener('click', () => {
  showAboutInfo()
  hideButtonReadMore()
})