/* eslint-disable */

function handleAccessibilityFocus() {
  const elementsWithA11yFocus = [...document.querySelectorAll('[data-a11y]')];

  document.addEventListener('keyup', event => {
    elementsWithA11yFocus.forEach(element => {
      if (element === event.target || element.contains(event.target)) {
        element.setAttribute('data-a11y', 'true');
      } else {
        element.setAttribute('data-a11y', 'false');
      }
    });
  });

  // On mouse click change data-a11y attribute false
  document.addEventListener('mousedown', event => {
    elementsWithA11yFocus.forEach(element => {
      if (element === event.target || element.contains(event.target)) {
        element.setAttribute('data-a11y', 'false');
      }
    });
  });
}

module.exports = () => {
  setTimeout(() => {
    handleAccessibilityFocus();
  }, 1000);

  // ensure that the scrollRestoration is set to manual
  // this stops the browser from 'jumping' the scroll position
  if ('scrollRestoration' in history && history.scrollRestoration != 'manual') {
    history.scrollRestoration = 'manual';
  }

  document.getElementById('___gatsby').style.display = 'block';
  setTimeout(function () {
    document.getElementById('___loader').style.display = 'none';
  }, 0);
};
