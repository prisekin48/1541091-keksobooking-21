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
   * Checks request status
   * @param  {object.XMLHttpRequest} xhr       Request object
   * @param  {object.function} onSuccess Invokes if the request is successful
   * @param  {object.function} onError   Invokes if the request is not successful
   * @return {[type]}           [description]
   */
  const checkRequest = (xhr, onSuccess, onError) => {
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
  };


  /**
   * Invokes if the request to the server was successful ads renders pins
   * @param  {array} response Array of ads
   */
  const onSuccessfulAdsLoading = (response) => {
    window.backend.ads = response;
    window.map.renderPins(response);
    showMessage(`Объявления загружены успешно`, false);
  };

    /**
   * Invokes if the request to the server was successful
   * @param  {string} error Error description
   */
  const onUnsuccessfulAdsLoading = (error) => {
    showMessage(`При загрузке объявлений произошла ошибка: ${error}`, true);
  };

  /**
   * Makes a request to the server to get ads
   * @param  {string} URL       Requested URL
   * @param  {object.function} onSuccess Invokes if the request is successful
   * @param  {object.function} onError   Invokes if the request gets error
   */
  const makeRequest = (onSuccess, onError) => {
    const url = `https://21.javascript.pages.academy/keksobooking/data`;
    const xhr = new XMLHttpRequest();

    xhr.responseType = `json`;

    checkRequest(xhr, onSuccess, onError);

    xhr.timeout = MAX_REQUEST_TIMEOUT;

    xhr.open(`GET`, url);
    xhr.send();
  };

  /**
   * Invokes if the form submit is successful
   * @param {&&&} response [description]
   */
  const onSuccessfulFormSubmit = (response) => {
    console.log(`OK`);
    window.form.reset();
    window.main.deactivate();
  };

  /**
   * Invokes if the form submit is not successful
   * @param {string} error Error text
   */
  const onUnsuccessfulFormSubmit = (error) => {
    showMessage(response, 0);
  };

  const submitForm = (data, onSuccess, onError) => {

    console.log(data);
    const url = `https://21.javascript.pages.academy/keksobooking`;
    const xhr = new XMLHttpRequest();

    checkRequest(xhr, onSuccess, onError);

    xhr.timeout = MAX_REQUEST_TIMEOUT;

    xhr.open(`POST`, url);
    xhr.send(data);
  };

  window.backend = {
    makeRequest: () => {
      makeRequest(onSuccessfulAdsLoading, onUnsuccessfulAdsLoading);
    },
    submitForm: (data) => {
      submitForm(data, onSuccessfulFormSubmit, onUnsuccessfulFormSubmit);
    }
  };
})();
