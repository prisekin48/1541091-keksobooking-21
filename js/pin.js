'use strict';

(() => {

  const PinShifts = {
    X: 25,
    Y: 70
  };

  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  /**
   * Unsets active pin state
   */
  const unsetActivePin = () => {
    const activePin = document.querySelector(`.map__pin--active`);
    if (activePin) {
      activePin.classList.remove(`map__pin--active`);
    }
  };

  /**
   * Sets given pin as active
   * @param  {object.HTML-node} pin Currently active pin
   */
  const setActivePin = (pin) => {
    pin.classList.add(`map__pin--active`);
  };

  /**
   * Invokes when Enter is pressed on a pin
   * @param  {object.event} evt Given event
   * @param  {object} ad  Given ad object
   * @param {object.HTML-node} pin Pressed pin
   */
  const onPinPressEnter = (evt, ad, pin) => {
    if (evt.key === `Enter`) {
      window.card.removeCurrent();
      window.card.render(ad);
      setActivePin(pin);
    }
  };

  /**
   * Invokes when a click was made on a pin
   * @param  {object} ad  Given ad object
   * @param {object.HTML-node} pin Clicked pin
   */
  const onPinClick = (ad, pin) => {
    window.card.removeCurrent();
    window.card.render(ad);
    setActivePin(pin);
  };

  /** Prepares and returns .map__pin element with adData
   *  @param {object} adData - An object with the data needed for pin element filling
   *  @return {object} pin element
   */
  const createPin = (adData) => {
    const pinElement = pinTemplate.cloneNode(true);
    const pinElementImage = pinElement.querySelector(`img`);
    pinElement.style.left = `${adData.location.x - PinShifts.X}px`;
    pinElement.style.top = `${adData.location.y - PinShifts.Y}px`;
    pinElementImage.src = `${adData.author.avatar}`;
    pinElementImage.alt = `${adData.offer.title}`;

    pinElement.addEventListener(`keydown`, (evt) => {
      onPinPressEnter(evt, adData, pinElement);
    });

    pinElement.addEventListener(`click`, () => {
      onPinClick(adData, pinElement);
    });

    return pinElement;
  };

  window.pin = {
    create: createPin,
    unsetActive: unsetActivePin
  };
})();
