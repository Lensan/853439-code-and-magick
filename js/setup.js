'use strict';

(function () {
  var createWizard = function (wizard, template) {
    var newWizard = template.cloneNode(true);

    newWizard.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    newWizard.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    newWizard.querySelector('.setup-similar-label').textContent = wizard.name;

    return newWizard;
  };

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var onSuccessLoad = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.util.NUMBER_OF_WIZARDS; i++) {
      var similarWizard = window.util.getRandomElement(wizards);
      fragment.appendChild(createWizard(similarWizard, similarWizardTemplate));
    }
    document.querySelector('.setup-similar-list').appendChild(fragment);
    window.util.setupSimilarElement.classList.remove('hidden');
  };

  window.backend.load(onSuccessLoad, window.util.onErrorLoad);
})();
