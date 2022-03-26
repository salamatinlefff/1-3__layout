'use strict'

const about = () => {
  const aboutDesc = document.querySelector('.about__desc');
  const aboutButtonShowContent = document.querySelector('.about__button-show-content');
  const aboutButtonShowContentText = aboutButtonShowContent.querySelector('.button-show-content__text--about');

  let aboutContent = showHideContent();
  
    aboutButtonShowContent.addEventListener('click', () => {
      if (!aboutContent.activeContent) {
        aboutContent.showContent(aboutDesc, aboutButtonShowContentText);
      } else {
        aboutContent.hideContent(aboutDesc, aboutButtonShowContentText);
      }
    });
}

about();