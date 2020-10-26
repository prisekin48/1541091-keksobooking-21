'use strict';

(() => {
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;

  let ads = [];

  /**
   * Invokes if the request to the server was successful ads renders pins
   * @param  {array} response Array of ads
   */
  const onSuccess = (response) => {
    ads = response;
    window.map.renderPins(ads);
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
        case 200:
          onSuccess(xhr.response);
          break;

        case 400:
          error = `Неверный запрос`;
          break;

        case 401:
          error = `Пользователь не авторизован`;
          break;

        case 404:
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

    xhr.timeout = 10000;

    xhr.open(`GET`, URL);
    xhr.send();
  };

  window.backend = {
    ads: ads,
    makeRequest: () => {
      makeRequest(URL, onSuccess, onError);
    }
  };
})();
