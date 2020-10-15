'use strict';

(() => {
  const PinShifts = {
    X: 25,
    Y: 70
  };

  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  /** Prepares and returns .map__pin element with adData
   *  @param {object} adData - An object with the data needed for pin element filling
   *  @return {object} pin element
   */
  window.pin = {
    createPin: (adData) => {
      const pinElement = pinTemplate.cloneNode(true);
      const pinElementImage = pinElement.querySelector(`img`);
      pinElement.style.left = `${adData.location.x - PinShifts.X}px`;
      pinElement.style.top = `${adData.location.y - PinShifts.Y}px`;
      pinElementImage.src = `${adData.author.avatar}`;
      pinElementImage.alt = `${adData.offer.title}`;

      pinElement.addEventListener('keydown', (evt) => {
        onPinPressEnter(evt, adData, pinElement);
      });

      pinElement.addEventListener('click', () => {
        onPinClick(adData, pinElement);
      });

      return pinElement;
    }
  };
})();
