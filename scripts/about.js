'use strict'

const about = () => {
  const aboutDesc = document.querySelector('.about__desc');
  const aboutButtonShowContent = document.querySelector('.about__button-show-content');
  const aboutButtonShowContentImg = aboutButtonShowContent.firstElementChild
  const aboutButtonShowContentText = aboutButtonShowContent.lastElementChild

  variables.AboutContainer = aboutDesc;
  variables.AboutButton = aboutButtonShowContent;

  let aboutContent = toggleConditionContent();
  
    aboutButtonShowContent.addEventListener('click', () => {
      if (!aboutContent.activeContent) {
        aboutContent.showContent(aboutDesc, aboutButtonShowContentImg, aboutButtonShowContentText);
      } else {
        aboutContent.hideContent(aboutDesc, aboutButtonShowContentImg, aboutButtonShowContentText, { aboutContent: true });
      }
  });
};

about();
