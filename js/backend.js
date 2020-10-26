'use strict';

(() => {
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;

  let ads = [];

  const onSuccess = (response) => {
    ads = response;
    window.map.renderPins(ads);
    console.log(ads);
  };

  const onError = (error) => {
    return alert(error);
  };

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
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
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
