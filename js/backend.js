'use strict';

(() => {
  const REQUEST_STATUSES = {
    ok: 200,
    badRequest: 400,
    userNotAuthorized: 401,
    notFound: 404
  };

  const MAX_REQUEST_TIMEOUT = 10000;

  const MESSAGE_TIME = 5000;

  const URL = `https://21.javascript.pages.academy/keksobooking/data`;

  const map = document.querySelector(`.map`);

  /**
   * Shows message on the screen
   * @param  {string}  text    Text of the message
   * @param  {Boolean} isError If the message is about an error
   *
   */
  const showMessage = (text, isError) => {
    const message = document.createElement(`div`);
    message.style.position = `absolute`;
    message.style.maxWidth = `20%`;
    message.style.top = `20px`;
    message.style.left = `20px`;
    message.style.padding = `10px`;

    if (isError) {
      message.style.backgroundColor = 'crimson';
    } else {
      message.style.backgroundColor = 'lightgreen';
      }
    message.textContent = text;

    message.addEventListener(`click`, () => {
      message.remove();
    });

    map.appendChild(message);

    setTimeout(() => {
      if (message) {
        message.remove();
      }
    }, MESSAGE_TIME);
  };

  /**
   * Invokes if the request to the server was successful ads renders pins
   * @param  {array} response Array of ads
   */
  const onSuccess = (response) => {
    window.backend.ads = response;
    window.map.renderPins(response);
    showMessage(`Объявления загружены успешно`, false);
  };

    /**
   * Invokes if the request to the server was successful
   * @param  {string} error Error description
   */
  const onError = (error) => {
    showMessage(`При загрузке объявлений произошла ошибка: ${error}`, true);
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
