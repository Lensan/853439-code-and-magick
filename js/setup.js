'use strict';

var NUMBER_OF_WIZARDS = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];


document.querySelector('.setup').classList.remove('hidden');

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getWizards = function (names, surnames, coats, eyes) {
  var wizards = [];
  for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
    var wizard = {};
    wizard.name = getRandomElement(names) + ' ' + getRandomElement(surnames);
    wizard.coatColor = getRandomElement(coats);
    wizard.eyesColor = getRandomElement(eyes);
    wizards.push(wizard);
  }
  return wizards;
};

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarListElement = document.querySelector('.setup-similar-list');
var fragment = document.createDocumentFragment();

var cloneWizard = function (wizard) {
  var wizardClone = similarWizardTemplate.cloneNode(true);

  wizardClone.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardClone.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  wizardClone.querySelector('.setup-similar-label').textContent = wizard.name;

  return wizardClone;
};

var similarWizards = getWizards(WIZARD_NAMES, WIZARD_SURNAMES, WIZARD_COATS, WIZARD_EYES);
for (var i = 0; i < similarWizards.length; i++) {
  fragment.appendChild(cloneWizard(similarWizards[i]));
}

similarListElement.appendChild(fragment);
document.querySelector('.setup-similar').classList.remove('hidden');
