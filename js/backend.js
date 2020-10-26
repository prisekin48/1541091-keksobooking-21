'use strict';

(() => {
  const REQUEST_STATUSES = {
    ok: 200,
    badRequest: 400,
    userNotAuthorized: 401,
    notFound: 404
  };

  const MAX_REQUEST_TIMEOUT = 10000;

  const URL = `https://21.javascript.pages.academy/keksobooking/data`;

  /**
   * Invokes if the request to the server was successful ads renders pins
   * @param  {array} response Array of ads
   */
  const onSuccess = (response) => {
    window.backend.ads = response;
    window.map.renderPins(response);
  };

  /**
   * Invokes if the request to the server was successful
   * @param  {string} error Error description
   */
  const onError = (error) => {
    const map = document.querySelector(`.map`);
    const errElement = document.querySelector(`#error`).content.querySelector(`.error`).cloneNode(true);
    const errButton = errElement.querySelector(`.error__button`);

    errElement.querySelector(`.error__message`).textContent = error;

    errButton.addEventListener(`click`, (evt) => {
      evt.preventDefault;
      errElement.remove();
      window.backend.makeRequest();
    });

    map.appendChild(errElement);
  };

  /**
   * Makes a request to the server to get ads
   * @param  {string} URL       Requested URL
   * @param  {object.function} onSuccess Invokes if the request is successful
   * @param  {object.function} onError   Invokes if the request gets error
   */
  const makeRequest = (URL, onSuccess, onError) => {
    const xhr = new XMLHttpRequest();

    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      let error;
      switch (xhr.status) {
        case REQUEST_STATUSES.ok:
          onSuccess(xhr.response);
          break;

        case REQUEST_STATUSES.badRequest:
          error = `Неверный запрос`;
          break;

        case REQUEST_STATUSES.userNotAuthorized:
          error = `Пользователь не авторизован`;
          break;

        case REQUEST_STATUSES.notFound:
          error = `Ничего не найдено`;
          break;

        default:
          error = `Статус ответа: ` + xhr.status + ` ` + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', () => {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', () => {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    xhr.timeout = MAX_REQUEST_TIMEOUT;

    xhr.open(`GET`, URL);
    xhr.send();
  };

  // makeRequest(URL, onSuccess, onError);

  window.backend = {
    makeRequest: () => {
      makeRequest(URL, onSuccess, onError);
    }
  };
})();
