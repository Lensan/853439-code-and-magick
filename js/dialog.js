'use strict';

(function () {
  var initialSetupCoords = {
    top: window.util.setupElement.style.top,
    left: window.util.setupElement.style.left
  };

  var revertPopupPosition = function () {
    window.util.setupElement.style.top = initialSetupCoords.top;
    window.util.setupElement.style.left = initialSetupCoords.left;
  };

  var openPopup = function () {
    window.util.setupElement.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    window.util.setupElement.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    if (evt.key === window.util.ESCAPE_KEY && !evt.target.classList.contains('setup-user-name')) {
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
    if (evt.key === window.util.ENTER_KEY) {
      openPopup();
    }
  });

  var setupCloseElement = window.util.setupElement.querySelector('.setup-close');
  setupCloseElement.tabIndex = 0;

  setupCloseElement.addEventListener('click', function () {
    closePopup();
    revertPopupPosition();
  });

  setupCloseElement.addEventListener('keydown', function (evt) {
    if (evt.key === window.util.ENTER_KEY) {
      closePopup();
      revertPopupPosition();
    }
  });

  var dialogHandler = window.util.setupElement.querySelector('.upload');
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
      window.util.setupElement.style.top = (window.util.setupElement.offsetTop - shift.y) + 'px';
      window.util.setupElement.style.left = (window.util.setupElement.offsetLeft - shift.x) + 'px';
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

  var onSuccessLoad = function () {
    window.util.setupElement.classList.add('hidden');
  };

  var setupWizardFormElement = window.util.setupElement.querySelector('.setup-wizard-form');
  setupWizardFormElement.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(setupWizardFormElement), onSuccessLoad, window.util.onErrorLoad);
    evt.preventDefault();
  });
})();
