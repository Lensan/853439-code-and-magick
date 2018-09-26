'use strict';

(function () {
  var URL_SAVE = 'https://js.dump.academy/code-and-magick';
  var URL_LOAD = URL_SAVE + '/data';
  var CONNECTION_ERROR = 'Произошла ошибка соединения';

  var Code = {
    SUCCESS: 200,
    ERROR_BAD_REQUEST: 400,
    ERROR_NOT_AUTHORIZED: 401,
    ERROR_NOT_FOUND: 404
  };

  var setTimeoutError = function (timeout) {
    return 'Запрос не успел выполниться за ' + timeout + 'мс';
  };

  var setErrorMessage = function (errorStatus, errorStatusText) {
    var errorMessage;
    switch (errorStatus) {
      case Code.ERROR_BAD_REQUEST:
        errorMessage = 'Неверный запрос';
        break;
      case Code.ERROR_NOT_AUTHORIZED:
        errorMessage = 'Пользователь не авторизован';
        break;
      case Code.ERROR_NOT_FOUND:
        errorMessage = 'Ничего не найдено';
        break;
      default:
        errorMessage = 'Произошла ошибка: ' + errorStatus + ' ' + errorStatusText;
        break;
    }
    return errorMessage;
  };

  window.backend = {
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === Code.SUCCESS) {
          onLoad(xhr.response);
        } else {
          onError(setErrorMessage(xhr.status, xhr.statusText));
        }
      });

      xhr.addEventListener('error', function () {
        onError(CONNECTION_ERROR);
      });

      xhr.addEventListener('timeout', function () {
        onError(setTimeoutError(xhr.timeout));
      });

      xhr.open('POST', URL_SAVE);
      xhr.send(data);
    },

    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open('GET', URL_LOAD);

      xhr.addEventListener('load', function () {
        if (xhr.status === Code.SUCCESS) {
          onLoad(xhr.response);
        } else {
          onError(setErrorMessage(xhr.status, xhr.statusText));
        }
      });

      xhr.addEventListener('error', function () {
        onError(CONNECTION_ERROR);
      });

      xhr.addEventListener('timeout', function () {
        onError(setTimeoutError(xhr.timeout));
      });

      xhr.send();
    }
  };
})();
