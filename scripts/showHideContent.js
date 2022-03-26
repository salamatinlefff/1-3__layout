'use strict'

const showHideContent = () => {
  return {
    activeContent: false,
    showContent(container, textButton) {
      const fullHeight = container.scrollHeight;
      
      container.style.height = `${fullHeight}px`;
      textButton.textContent = 'Скрыть все';
      
      this.activeContent = true;
    },
    hideContent(container, textButton, aboutContent) {
      if(aboutContent) {
        textButton.textContent = 'Читать далее';
      } else {
        textButton.textContent = 'Показать все';
      }
      container.style.height = ``;
    
      this.activeContent = false;
    }
  }
}