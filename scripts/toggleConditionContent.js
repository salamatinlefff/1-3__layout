'use strict'

const toggleConditionContent = () => {
  return {
    activeContent: false,
    showContent(container, imgButton, textButton) {
      const fullHeight = container.scrollHeight;
      
      container.style.height = `${fullHeight}px`;
      imgButton.style.transform = `scale(1, -1)`;
      textButton.textContent = 'Скрыть все';
      
      this.activeContent = true;
    },
    hideContent(container, imgButton, textButton, option) {
      const { aboutContent, brandsContent } = option;

      if(aboutContent) {
        textButton.textContent = 'Читать далее';
      } else {
        textButton.textContent = 'Показать все';
      }
      container.style.height = ``;
      imgButton.style.transform = ``;
    
      this.activeContent = false;
    }
  }
}