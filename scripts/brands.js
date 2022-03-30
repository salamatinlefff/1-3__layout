const brands = () => {
  const brandsList = document.querySelector('.brands__list');
  const brandsButtonShowContent = document.querySelector('.brands__button-show-content');
  const brandsButtonShowContentImg = brandsButtonShowContent.firstElementChild;
  const brandsButtonShowContentText = brandsButtonShowContent.lastElementChild;

  variables.BrandsContainer = brandsList;
  variables.BrandsButton = brandsButtonShowContent;

  const brandsContent = toggleConditionContent();

  brandsButtonShowContent.addEventListener('click', () => {
    if (!brandsContent.activeContent) {
      brandsContent.showContent(brandsList, brandsButtonShowContentImg, brandsButtonShowContentText);
    } else {
      brandsContent.hideContent(brandsList, brandsButtonShowContentImg, brandsButtonShowContentText, { brandsContent: true });
    }
  });
};

brands();
