'use strict';

(() => {
  /**
   * Inserts text data into an element if the data exists
   * @param {string} text - taken string
   * @param {object} target - link to the DOM-node
   */
  const insertAndCheckTextData = (text, target) => {
    if (text) {
      target.textContent = text;
    } else {
      target.remove();
    }
  };

  /**
   * Renders .popup__features according to the given features from array
   * @param {HTML-Node} template - Html-template for features
   * @param {array} features - Array of features
   *
   */
  const renderFeatures = (template, features) => {
    if (features.length > 0) {
      let fragment = document.createDocumentFragment();

      for (let feature of features) {
        let element = template.querySelector(`.popup__feature`).cloneNode();
        element.classList.value = `popup__feature popup__feature--${feature}`;
        element.textContent = feature;
        fragment.appendChild(element);
      }
      template.innerHTML = ``;
      template.appendChild(fragment);
    } else {
      template.innerHTML = ``;
    }
  };

  /**
   * Renders photos according the given array of photos` links
   * @param {HTML-Node} template - Html-template for photos
   * @param {array} photos - Array of links
   */
  const renderPhotos = (template, photos) => {
    if (photos.length > 0) {
      let fragment = document.createDocumentFragment();

      for (let photo of photos) {
        let element = template.querySelector(`.popup__photo`).cloneNode();
        element.src = photo;
        fragment.appendChild(element);
      }
      template.innerHTML = ``;
      template.appendChild(fragment);
    } else {
      template.innerHTML = ``;
    }
  };

  /** Prepares and renders .map__card element with ad`s data
   *  @param {object} ad - An object with mocks data needed for cardElement filling
   */
  window.card = {
    renderCard: (ad) => {
      const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
      const cardElement = cardTemplate.cloneNode(true);
      const closeButton = cardElement.querySelector(`.popup__close`);

      insertAndCheckTextData(ad.offer.title, cardElement.querySelector(`.popup__title`));
      insertAndCheckTextData(ad.offer.address, cardElement.querySelector(`.popup__text--address`));
      insertAndCheckTextData(`${ad.offer.price}₽/ночь`, cardElement.querySelector(`.popup__text--price`));
      insertAndCheckTextData(window.data.adMocksData.TYPES_DESCRIPTION[ad.offer.type], cardElement.querySelector(`.popup__type`));
      insertAndCheckTextData(`${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`, cardElement.querySelector(`.popup__text--capacity`));
      insertAndCheckTextData(`Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`, cardElement.querySelector(`.popup__text--time`));
      renderFeatures(cardElement.querySelector(`.popup__features`), ad.offer.features);
      insertAndCheckTextData(ad.offer.description, cardElement.querySelector(`.popup__description`));
      renderPhotos(cardElement.querySelector(`.popup__photos`), ad.offer.photos);
      cardElement.querySelector(`.popup__avatar`).src = ad.author.avatar;

      closeButton.addEventListener(`click`, () => {
        window.map.removeCurrentCard();
      });

      closeButton.addEventListener(`keydown`, (evt) => {
        if (evt.key === `Enter`) {
          window.map.removeCurrentCard();
        }
      });

      document.addEventListener(`keydown`, window.map.onDocumentEscPress);

      document.querySelector(`.map__filters-container`).before(cardElement);
    }
  };
})();