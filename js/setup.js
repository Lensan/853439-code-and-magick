'use strict';

var NUMBER_OF_WIZARDS = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var ESCAPE_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var setupElement = document.querySelector('.setup');
var initialSetupCoords = {
  top: setupElement.style.top,
  left: setupElement.style.left
};

var revertPopupPosition = function () {
  setupElement.style.top = initialSetupCoords.top;
  setupElement.style.left = initialSetupCoords.left;
};

var openPopup = function () {
  setupElement.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setupElement.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function (evt) {
  if (evt.key === ESCAPE_KEY && !evt.target.classList.contains('setup-user-name')) {
    closePopup();
    revertPopupPosition();
  }
};

var setupOpenElement = document.querySelector('.setup-open');
setupOpenElement.querySelector('.setup-open-icon').tabIndex = 0;

setupOpenElement.addEventListener('click', function () {
  openPopup();
});

setupOpenElement.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

var setupCloseElement = setupElement.querySelector('.setup-close');
setupCloseElement.tabIndex = 0;

setupCloseElement.addEventListener('click', function () {
  closePopup();
  revertPopupPosition();
});

setupCloseElement.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
    revertPopupPosition();
  }
});

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var setElementRandomValue = function (element, elementInput, array, style) {
  var randomValue = getRandomElement(array);
  if (style === 'fill') {
    element.style.fill = randomValue;
  } else {
    element.style.background = randomValue;
  }
  elementInput.value = randomValue;
};

var setupWizardElement = setupElement.querySelector('.setup-wizard');
var setupPlayerElement = setupElement.querySelector('.setup-player');
var setupWizardCoatElement = setupWizardElement.querySelector('.wizard-coat');
var inputCoatColorElement = setupPlayerElement.querySelector('input[name="coat-color"]');

var onWizardCoatClick = function () {
  setElementRandomValue(setupWizardCoatElement, inputCoatColorElement, WIZARD_COATS, 'fill');
};

var setupWizardEyesElement = setupWizardElement.querySelector('.wizard-eyes');
var inputEyesColorElement = setupPlayerElement.querySelector('input[name="eyes-color"]');

var onWizardEyesClick = function () {
  setElementRandomValue(setupWizardEyesElement, inputEyesColorElement, WIZARD_EYES, 'fill');
};

var setupFireballElement = setupPlayerElement.querySelector('.setup-fireball-wrap');
var setupFireballInputElement = setupFireballElement.querySelector('input[name="fireball-color"]');

var onFireballClick = function () {
  setElementRandomValue(setupFireballElement, setupFireballInputElement, FIREBALL_COLORS, 'background');
};

setupWizardCoatElement.addEventListener('click', onWizardCoatClick);
setupWizardEyesElement.addEventListener('click', onWizardEyesClick);
setupFireballElement.addEventListener('click', onFireballClick);

var getWizards = function (amount, names, surnames, coats, eyes) {
  var wizards = [];
  for (var i = 0; i < amount; i++) {
    var wizard = {};
    wizard.name = getRandomElement(names) + ' ' + getRandomElement(surnames);
    wizard.coatColor = getRandomElement(coats);
    wizard.eyesColor = getRandomElement(eyes);
    wizards.push(wizard);
  }
  return wizards;
};

var createWizard = function (wizard, template) {
  var newWizard = template.cloneNode(true);

  newWizard.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  newWizard.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  newWizard.querySelector('.setup-similar-label').textContent = wizard.name;

  return newWizard;
};

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();
var similarWizards = getWizards(NUMBER_OF_WIZARDS, WIZARD_NAMES, WIZARD_SURNAMES, WIZARD_COATS, WIZARD_EYES);
for (var i = 0; i < similarWizards.length; i++) {
  fragment.appendChild(createWizard(similarWizards[i], similarWizardTemplate));
}

document.querySelector('.setup-similar-list').appendChild(fragment);
document.querySelector('.setup-similar').classList.remove('hidden');

// create module dialog.js
var dialogHandler = setupElement.querySelector('.upload');
dialogHandler.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };
  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };
    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };
    setupElement.style.top = (setupElement.offsetTop - shift.y) + 'px';
    setupElement.style.left = (setupElement.offsetLeft - shift.x) + 'px';
  };
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    var onClickPreventDefault = function (clickEvent) {
      clickEvent.preventDefault();
      dialogHandler.removeEventListener('click', onClickPreventDefault);
    };
    if (dragged) {
      dialogHandler.addEventListener('click', onClickPreventDefault);
    }
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
