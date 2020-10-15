'use strict';

const map = document.querySelector(`.map`);





/**
 * Removes all pins except the main one;
 */
const removePins = () => {
  const pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (const pin of pins) {
    pin.remove();
  }
};

/**
 * Unsets active pin state
 */
const unsetActivePin = () => {
  const activePin = map.querySelector('.map__pin--active');
  if (activePin) {
    activePin.classList.remove('map__pin--active');
  }
};

/**
 * Sets given pin as active
 * @param  {object.HTML-node} pin Currently active pin
 */
const setActivePin = (pin) => {
  pin.classList.add('map__pin--active');
};

/** Adds prepared pin elements to an html fragment and render the fragment into .map__pins
 *  @param {Array.<Object>} ads - An array with ad's data
 */
const renderPins = (ads) => {
  const fragment = document.createDocumentFragment();
  const mapPins = map.querySelector(`.map__pins`);

  ads.forEach(ad => {
    const element = window.pin.createPin(ad);
    fragment.appendChild(element);
  });
  mapPins.appendChild(fragment);
};

/**
 * Removes currently opened card;
 */
const removeCurrentCard = () => {
  const card = map.querySelector('.map__card');
  if (card) {
    card.remove();
  }

  unsetActivePin();
  document.removeEventListener('keydown', onDocumentEscPress);
};

/**
 * Invokes when Enter is pressed on a pin
 * @param  {object.event} evt Given event
 * @param  {object} ad  Given ad object
 * @param {object.HTML-node} pin Pressed pin
 */
const onPinPressEnter = (evt, ad, pin) => {
  if (evt.key === 'Enter') {
    removeCurrentCard();
    setActivePin(pin);
    renderCard(ad);
  }
};

/**
 * Invokes when a click was made on a pin
 * @param  {object} ad  Given ad object
 * @param {object.HTML-node} pin Clicked pin
 */
const onPinClick = (ad, pin) => {
  removeCurrentCard();
  setActivePin(pin);
  window.card.renderCard(ad);
};







/**
 * Removes currently opened card if Escape is pressed
 * @param  {object} evt Given event
 */
const onDocumentEscPress = (evt) => {
  if (evt.key === 'Escape') {
    removeCurrentCard();
  }
};



/**
 * -------------------------MODULE4-TASK1--------------------------------
 */

const form = document.querySelector('.ad-form');
const allFieldsets = form.querySelectorAll('fieldset');
const mapFilters = map.querySelectorAll('.map__filter');
const mapFilterFeatures = map.querySelector('.map__features');
const mainPin = document.querySelector('.map__pin--main');
const adAddress = form.querySelector('#address');
let isActive = false;

/**
 * Set address according to the map mode
 */
const setAddress = () => {
  if (isActive) {
    adAddress.setAttribute('value', `${parseInt(mainPin.style.left, 10) + PinShifts.X}, ${parseInt(mainPin.style.top, 10) + PinShifts.Y}`);
  } else {
    adAddress.setAttribute('value', `${parseInt(mainPin.style.left, 10)}, ${parseInt(mainPin.style.top, 10)}`);
  }
};

/**
 * Disables all the form inputs and the form itself
 */
const disableForm = () => {
  form.classList.add('ad-form--disabled');
  for (const fieldset of allFieldsets) {
    fieldset.disabled = true;
  }
};

/**
 * Enables all the form inputs and the form itself
 */
const enableForm = () => {
  form.classList.remove('ad-form--disabled');
  for (const fieldset of allFieldsets) {
    fieldset.disabled = false;
  }
};

/**
 * Switches filters state according to the map mode
 * @param {boolean} flag Is-map-active flag
 */
const switchFiltersState = (flag) => {
  for (const filter of mapFilters) {
    filter.disabled = !flag;
  }
  mapFilterFeatures.disabled = !flag;
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
    map.classList.remove(`map--faded`);
    switchFiltersState(isActive);
    enableForm();
    renderPins(window.data.ads);
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
  removePins();
  map.classList.add(`map--faded`);
  switchFiltersState(isActive);
  disableForm();
  addMainPinListeners();
  setAddress();
};

/**
 * -------------------------MODULE4-TASK1_VALIDATION--------------------------------
 */

const adTitle = form.querySelector('#title');
const adPrice = form.querySelector('#price');
const adType = form.querySelector('#type');
const adTimein = form.querySelector('#timein');
const adTimeout = form.querySelector('#timeout');
const adRoomNumber = form.querySelector('#room_number');
const adCapacity = form.querySelector('#capacity');

const AdConsts = {
  MIN_TITLE_LENGHT: 30,
  MAX_TITLE_LENGHT: 100,
  MIN_PRICE: {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalow: 0},
  MAX_PRICE: 1000000,
};

const RoomsToCapacityIndexesCorrelation = {
  0: {disabled: [0, 1, 3], enabled: [2]},
  1: {disabled: [0, 3], enabled: [1, 2]},
  2: {disabled: [3], enabled: [0, 1, 2]},
  3: {disabled: [0, 1, 2], enabled: [3]}
};

/**
 * Shows red border if the given input is invalid
 * @param {object.<HTML-element>} input Given input element
 */
const showInvalidBorder = (input) => {
  if (!input.validity.valid) {
    input.style.border = '2px solid #f00';
  } else {
    input.style.border = 'unset';
  }
};

/**
 * Checks if the price is valid or not.
 */
const checkPriceValidity = () => {
  let invalidMessage = `Диапазон цен для выбранного типа жилья:\n
                        ${AdConsts.MIN_PRICE[adType.value]} - ${AdConsts.MAX_PRICE}`;

  if (adPrice.value < AdConsts.MIN_PRICE[adType.value]) {
    adPrice.setCustomValidity(invalidMessage);
  } else if (adPrice.value > AdConsts.MAX_PRICE) {
    adPrice.setCustomValidity(invalidMessage);
  } else {
    adPrice.setCustomValidity('');
  }

  showInvalidBorder(adPrice);
  adPrice.reportValidity();
};

/**
 * Sets the correlation between Checkin and Checkout times
 * @param  {object.event} evt Given event
 */
const setCheckInOutTimes = (evt) => {
  if (evt.target === adTimein) {
    adTimeout.options.selectedIndex = evt.target.options.selectedIndex;
  }
  if (evt.target === adTimeout) {
    adTimein.options.selectedIndex = evt.target.options.selectedIndex;
  }
};

/**
 * Sets correct capacity according to RoomsToCapacityIndexesCorrelation
 */
const setCapacity = () => {
  const adRoomNumberIndex = adRoomNumber.options.selectedIndex;

  for (const index of RoomsToCapacityIndexesCorrelation[adRoomNumberIndex].disabled) {
    adCapacity.options[index].disabled = true;
  }

  for (const index of RoomsToCapacityIndexesCorrelation[adRoomNumberIndex].enabled) {
    adCapacity.options[index].disabled = false;
  }
};

adTitle.addEventListener('input', function () {
  let invalidMessage = `Заголовок объявления должен содержать от
                            ${AdConsts.MIN_TITLE_LENGHT} до ${AdConsts.MAX_TITLE_LENGHT} символов.
                            \nВы ввели ${adTitle.value.length}.`;

  if (adTitle.value.length < AdConsts.MIN_TITLE_LENGHT) {
    adTitle.setCustomValidity(invalidMessage);
  } else if (adTitle.value.length > AdConsts.MAX_TITLE_LENGHT) {
    adTitle.setCustomValidity(invalidMessage);
  } else {
    adTitle.setCustomValidity('');
  }

  showInvalidBorder(adTitle);
  adTitle.reportValidity();
});

adPrice.addEventListener('input', checkPriceValidity);

adTimein.addEventListener('change', function (evt) {
  setCheckInOutTimes(evt);
});

adTimeout.addEventListener('change', function (evt) {
  setCheckInOutTimes(evt);
});

adType.addEventListener('change', function () {
  adPrice.placeholder = AdConsts.MIN_PRICE[adType.value];
  checkPriceValidity();
});

adRoomNumber.addEventListener('change', function () {
  const anyEnabledIndex = 0;
  const adRoomNumberIndex = adRoomNumber.options.selectedIndex;
  adCapacity.options.selectedIndex = RoomsToCapacityIndexesCorrelation[adRoomNumberIndex].enabled[anyEnabledIndex];

  setCapacity();
});

setAddress();
switchFiltersState(isActive);
disableForm();
addMainPinListeners();
setCapacity();
