'use strict';

(function () {
  var getWizards = function (amount, names, surnames, coats, eyes) {
    var wizards = [];
    for (var i = 0; i < amount; i++) {
      var wizard = {};
      wizard.name = window.util.getRandomElement(names) + ' ' + window.util.getRandomElement(surnames);
      wizard.coatColor = window.util.getRandomElement(coats);
      wizard.eyesColor = window.util.getRandomElement(eyes);
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
  var similarWizards = getWizards(window.util.NUMBER_OF_WIZARDS, window.util.WIZARD_NAMES, window.util.WIZARD_SURNAMES, window.util.WIZARD_COATS, window.util.WIZARD_EYES);
  for (var i = 0; i < similarWizards.length; i++) {
    fragment.appendChild(createWizard(similarWizards[i], similarWizardTemplate));
  }

  document.querySelector('.setup-similar-list').appendChild(fragment);
  document.querySelector('.setup-similar').classList.remove('hidden');
})();
