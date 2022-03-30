const toggleVisibilityButtons = () => {
  const hideButton = (button) => {
    button.style.display = 'none';
  };

  const showButton = (button) => {
    button.style.display = '';
  };

  const isEnoughHeight = (name) => {
    const fullHeight = variables[`${name}Container`].scrollHeight;
    const currentHeight = parseInt(
      window.getComputedStyle(variables[`${name}Container`]).height
    );

    if (currentHeight === fullHeight) {
      hideButton(variables[`${name}Button`]);
    } else {
      showButton(variables[`${name}Button`]);
    }
  };

  const checkWidth = () => {
    isEnoughHeight('About');
    isEnoughHeight('Brands');
  };

  checkWidth()

  const minWidth1000 = window.matchMedia('(min-width: 1000px)');

  minWidth1000.addEventListener('change', () => {
    if (minWidth1000.matches) {
      window.addEventListener('resize', checkWidth);
    } else {
      window.removeEventListener('resize', checkWidth);
    }
  });
};

toggleVisibilityButtons();
