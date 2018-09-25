'use strict';

(function () {
  var setElementRandomValue = function (element, elementInput, array, style) {
    var randomValue = window.util.getRandomElement(array);
    if (style === 'fill') {
      element.style.fill = randomValue;
    } else {
      element.style.background = randomValue;
    }
    elementInput.value = randomValue;
  };

  var setupWizardElement = window.util.setupElement.querySelector('.setup-wizard');
  var setupPlayerElement = window.util.setupElement.querySelector('.setup-player');
  var setupWizardCoatElement = setupWizardElement.querySelector('.wizard-coat');
  var inputCoatColorElement = setupPlayerElement.querySelector('input[name="coat-color"]');

  var onWizardCoatClick = function () {
    setElementRandomValue(setupWizardCoatElement, inputCoatColorElement, window.util.WIZARD_COATS, 'fill');
  };

  var setupWizardEyesElement = setupWizardElement.querySelector('.wizard-eyes');
  var inputEyesColorElement = setupPlayerElement.querySelector('input[name="eyes-color"]');

  var onWizardEyesClick = function () {
    setElementRandomValue(setupWizardEyesElement, inputEyesColorElement, window.util.WIZARD_EYES, 'fill');
  };

  var setupFireballElement = setupPlayerElement.querySelector('.setup-fireball-wrap');
  var setupFireballInputElement = setupFireballElement.querySelector('input[name="fireball-color"]');

  var onFireballClick = function () {
    setElementRandomValue(setupFireballElement, setupFireballInputElement, window.util.FIREBALL_COLORS, 'background');
  };

  setupWizardCoatElement.addEventListener('click', onWizardCoatClick);
  setupWizardEyesElement.addEventListener('click', onWizardEyesClick);
  setupFireballElement.addEventListener('click', onFireballClick);
})();
