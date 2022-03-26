'use strict'

const about = () => {
  const aboutDesc = document.querySelector('.about__desc');
  const aboutButtonShowContent = document.querySelector('.about__button-show-content');
  const aboutButtonShowContentText = aboutButtonShowContent.querySelector('.button-show-content__text--about');

  variables.AboutContainer = aboutDesc;
  variables.AboutButton = aboutButtonShowContent;

  let aboutContent = showHideContent();
  
    aboutButtonShowContent.addEventListener('click', () => {
      if (!aboutContent.activeContent) {
        aboutContent.showContent(aboutDesc, aboutButtonShowContentText);
      } else {
        aboutContent.hideContent(aboutDesc, aboutButtonShowContentText, true);
      }
    });
}

about();