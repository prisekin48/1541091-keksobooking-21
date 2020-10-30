'use strict';

(() => {
  const GET_URL = `https://21.javascript.pages.academy/keksobooking/data`;

  const SUBMIT_URL = `https://21.javascript.pages.academy/keksobooking`;

  const MAX_REQUEST_TIMEOUT = 10000;

  const MESSAGE_TIME = 5000;

  const RequestStatuses = {
    OK: 200,
    BAD_REQUEST: 400,
    USER_NOT_AUTHORIZED: 401,
    NOT_FOUND: 404
  };

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
      message.style.backgroundColor = `crimson`;
    } else {
      message.style.backgroundColor = `lightgreen`;
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
   */
  const checkRequest = (xhr, onSuccess, onError) => {
    xhr.timeout = MAX_REQUEST_TIMEOUT;

    xhr.addEventListener(`load`, () => {
      let error;
      switch (xhr.status) {
        case RequestStatuses.OK:
          onSuccess(xhr.response);
          break;

        case RequestStatuses.BAD_REQUEST:
          error = `Неверный запрос`;
          break;

        case RequestStatuses.USER_NOT_AUTHORIZED:
          error = `Пользователь не авторизован`;
          break;

        case RequestStatuses.NOT_FOUND:
          error = `Ничего не найдено`;
          break;

        default:
          error = `Статус ответа: ${xhr.status} ${xhr.statusText}`;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
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
   * @param  {object.function} onSuccess Invokes if the request is successful
   * @param  {object.function} onError   Invokes if the request gets error
   */
  const makeRequest = (onSuccess, onError) => {
    const xhr = new XMLHttpRequest();

    xhr.responseType = `json`;

    checkRequest(xhr, onSuccess, onError);

    xhr.open(`GET`, GET_URL);
    xhr.send();
  };

  /**
   * Removes opened afterSubmitMessage if Escape is pressed
   * @param  {object} evt Given event
   */
  const onDocumentEscPress = (evt) => {
    evt.preventDefault();
    if (evt.key === `Escape`) {
      submitMessage.remove();
      document.removeEventListener(`keydown`, onDocumentEscPress);
      document.removeEventListener(`click`, onDocumentClick);
    }
  };

  /**
   * Removes opened afterSubmitMessage if click on document
   * @param  {object} evt Given event
   */
  const onDocumentClick = (evt) => {
    evt.preventDefault();
    submitMessage.remove();
    document.removeEventListener(`keydown`, onDocumentEscPress);
    document.removeEventListener(`click`, onDocumentClick);
  };

  let submitMessage = document.createDocumentFragment();
  /**
   * Shows a message after form submit
   * @param  {Boolean} isSubmitOk If submit is ok flag
   */
  const afterSubmitMessage = (isSubmitOk) => {
    if (isSubmitOk) {
      submitMessage = document.querySelector(`#success`).content.querySelector(`.success`).cloneNode(true);
    } else {
      submitMessage = document.querySelector(`#error`).content.querySelector(`.error`).cloneNode(true);
      const button = submitMessage.querySelector(`.error__button`);
      button.addEventListener(`click`, (evt) => {
        submitMessage.remove();
        window.form.submit(evt);
      });
    }

    document.addEventListener(`keydown`, onDocumentEscPress);
    document.addEventListener(`click`, onDocumentClick);

    document.querySelector(`main`).appendChild(submitMessage);
  };

  /**
   * Invokes if the form submit is successful
   */
  const onSuccessfulFormSubmit = () => {
    window.form.reset();
    window.main.deactivate();
    afterSubmitMessage(true);
  };

  /**
   * Invokes if the form submit is not successful
   */
  const onUnsuccessfulFormSubmit = () => {
    afterSubmitMessage(false);
  };

  /**
   * Submits form
   * @param  {object} data      Form data collected from the form
   * @param  {object.function} onSuccess Invokes on successful form submit
   * @param  {[type]} onError   Invokes on unsuccessful form submit
   */
  const submitForm = (data, onSuccess, onError) => {
    const xhr = new XMLHttpRequest();

    checkRequest(xhr, onSuccess, onError);

    xhr.open(`POST`, SUBMIT_URL);
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
