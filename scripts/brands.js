'use strict'

const brands = () => {
  const brandsList = document.querySelector('.brands__list');
  const brandsButtonShowContent = document.querySelector('.brands__button-show-content');
  const brandsButtonShowContentText = brandsButtonShowContent.querySelector('.button-show-content__text--brands');
  
  variables.BrandsContainer = brandsList;
  variables.BrandsButton = brandsButtonShowContent;

  let brandsContent = showHideContent();

  brandsButtonShowContent.addEventListener('click', () => {
    if (!brandsContent.activeContent) {
      brandsContent.showContent(brandsList, brandsButtonShowContentText);
    } else {
      brandsContent.hideContent(brandsList, brandsButtonShowContentText);
    }
  });
}

brands();