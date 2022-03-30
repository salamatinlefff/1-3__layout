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

  isEnoughHeight('About');
  isEnoughHeight('Brands');

  const minWidth1000 = window.matchMedia('(min-width: 1000px)');

  minWidth1000.addEventListener('change', () => {
    window.addEventListener('resize', () => {
      isEnoughHeight('About');
      isEnoughHeight('Brands');
    });
  });
};

toggleVisibilityButtons();
