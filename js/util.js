'use strict';

(function () {
  window.util = {
    NUMBER_OF_WIZARDS: 4,
    WIZARD_COATS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    WIZARD_EYES: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],

    ESCAPE_KEY: 'Escape',
    ENTER_KEY: 'Enter',

    setupElement: document.querySelector('.setup'),
    setupSimilarElement: document.querySelector('.setup-similar'),

    getRandomElement: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    onErrorLoad: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };
})();
