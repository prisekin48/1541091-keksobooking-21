'use strict';

/**
 * Invokes when Enter is pressed on a pin
 * @param  {object.event} evt Given event
 * @param  {object} ad  Given ad object
 * @param {object.HTML-node} pin Pressed pin
 */
const onPinPressEnter = (evt, ad, pin) => {
  if (evt.key === 'Enter') {
    window.map.removeCurrentCard();
    window.map.setActivePin(pin);
    renderCard(ad);
  }
};

/**
 * Invokes when a click was made on a pin
 * @param  {object} ad  Given ad object
 * @param {object.HTML-node} pin Clicked pin
 */
const onPinClick = (ad, pin) => {
  window.map.removeCurrentCard();
  window.map.setActivePin(pin);
  window.card.renderCard(ad);
};







/**
 * Removes currently opened card if Escape is pressed
 * @param  {object} evt Given event
 */
const onDocumentEscPress = (evt) => {
  if (evt.key === 'Escape') {
    window.map.removeCurrentCard();
  }
};



/**
 * -------------------------MODULE4-TASK1--------------------------------
 */

const mainPin = document.querySelector('.map__pin--main');

let isActive = false;

/**
 * Set address according to the map mode
 */
const setAddress = () => {
  if (isActive) {
    window.form.adAddress.setAttribute('value', `${parseInt(mainPin.style.left, 10) + window.pin.PinShifts.X}, ${parseInt(mainPin.style.top, 10) + window.pin.PinShifts.Y}`);
  } else {
    window.form.adAddress.setAttribute('value', `${parseInt(mainPin.style.left, 10)}, ${parseInt(mainPin.style.top, 10)}`);
  }
};




/**
 * Initiates activate function if pressed enter on the focused main pin
 * @param  {object} evt - transfered KeyboardEvent from the listener
 */
const onMainPinPressEnter = (evt) => {
  if (evt.key === 'Enter') {
    activate();
  }
};

/**
 * Initiates activate function if pressed the main mouse button on the main pin
 * @param  {object} evt - transfered MouseEvent from the listener
 */
const onMainPinMouseDown = (evt) => {
  if (evt.button === 0) {
    activate();
  }
};

/**
 * Adds mousedown (for main button) and keydown (for enter) event listeners to the main pin
 */
const addMainPinListeners = () => {
  mainPin.addEventListener('mousedown', onMainPinMouseDown);
  mainPin.addEventListener('keydown', onMainPinPressEnter);
};

/**
 * Enables active mode
 */
const activate = () => {
  if (!isActive) {
    isActive = true;
    window.map.map.classList.remove(`map--faded`);
    window.map.switchFiltersState(isActive);
    window.form.enableForm();
    window.map.renderPins(window.data.ads);
    setAddress();
    mainPin.removeEventListener('mousedown', onMainPinMouseDown);
    mainPin.removeEventListener('keydown', onMainPinPressEnter);
  }
};

/**
 * Enables inactive mode
 */
const deactivate = () => {
  isActive = false;
  window.map.removePins();
  window.map.map.classList.add(`map--faded`);
  window.map.switchFiltersState(isActive);
  window.form.disableForm();
  addMainPinListeners();
  setAddress();
};

/**
 * -------------------------MODULE4-TASK1_VALIDATION--------------------------------
 */






setAddress();
window.map.switchFiltersState(isActive);
window.form.disableForm();
addMainPinListeners();
window.form.setCapacity();
