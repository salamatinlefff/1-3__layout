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
    hideContent(container, textButton) {
      container.style.height = ``;
      textButton.textContent = 'Показать все';
    
      this.activeContent = false;
    }
  }
}