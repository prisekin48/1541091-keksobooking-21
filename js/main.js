'use strict';

const map = document.querySelector(`.map`);

const PinCoordinates = {
  MIN_Y: 130,
  MAX_Y: 630,
  MIN_X: 0,
  MAX_X: 1200
};

const PinShifts = {
  X: 25,
  Y: 70
};

const AdsDataConsts = {
  ADS_COUNT: 8,
  ROOMS_MIX: 1,
  ROOMS_MAX: 5,
  GUESTS_MIX: 1,
  GUESTS_MAX: 5
};

/**
 *  Returns a random number between the given min and max, both inclusive
 *  @param {int} min - minimum number
 *  @param {int} max - maximum number
 *  @return {int} returns random number between min and max
 */
const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const adData = {
  TITLES: [`Квартира`, `Дом`, `Апартаменты`, `Помещение свободного назначения`],
  PRICES_MIN: 10000,
  PRICES_MAX: 45000000,
  TYPES_DESCRIPTION: {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`
  },
  CHECKIN_CHECKOUT_TIMES: [`12:00`, `13:00`, `14:00`],
  FEATURES: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
  DESCRIPTIONS: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.`,
    `Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.`
  ],
  PHOTOS: [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
  ]
};

/**
 *  Returns an array with random quantity of items gotten from a source array
 *  @param {array} source - source array
 *  @return {array} returns new array with random quantity of items
 */
const getRandomArray = (source) => {
  const newArray = [];
  const newArrayLength = getRandomNumber(1, source.length);
  const sourceCopy = source.slice();
  for (let i = 0; i < newArrayLength; i++) {
    const takenItem = getRandomNumber(0, sourceCopy.length - 1);
    newArray.push(sourceCopy.splice(takenItem, 1)[0]);
  }

  return newArray;
};

/** Returns a random element of the given array
 *  @param {array} arr - an array with a random element of which will be returned
 *  @return {element} returns a random element of the give array
 */
const getRandomElementFromArray = (arr) => {
  return arr[getRandomNumber(0, arr.length - 1)];
};

/** Generates an array with adds descriptions from prepared object with needed data.
 *  @param {int} count - Quantity of needed objects in descriptions array
 *  @return {array.<Object>} ads - Array of objects
 */
const generateAds = (count) => {
  const ads = [];

  for (let j = 0; j < count; j++) {
    const ad = {
      author: {
        avatar: `img/avatars/user0${j + 1}.png`
      },
      offer: {
        title: getRandomElementFromArray(adData.TITLES),
        price: getRandomNumber(adData.PRICES_MIN, adData.PRICES_MAX),
        type: getRandomElementFromArray(Object.keys(adData.TYPES_DESCRIPTION)),
        rooms: getRandomNumber(AdsDataConsts.ROOMS_MIX, AdsDataConsts.ROOMS_MAX),
        guests: getRandomNumber(AdsDataConsts.GUESTS_MIX, AdsDataConsts.GUESTS_MAX),
        checkin: getRandomElementFromArray(adData.CHECKIN_CHECKOUT_TIMES),
        checkout: getRandomElementFromArray(adData.CHECKIN_CHECKOUT_TIMES),
        features: getRandomArray(adData.FEATURES),
        description: getRandomElementFromArray(adData.DESCRIPTIONS),
        photos: getRandomArray(adData.PHOTOS)
      },
      location: {
        x: getRandomNumber(PinCoordinates.MIN_X, PinCoordinates.MAX_X),
        y: getRandomNumber(PinCoordinates.MIN_Y, PinCoordinates.MAX_Y)
      }
    };
    ad.offer.address = `${ad.location.x}, ${ad.location.y}`;
    ads.push(ad);
  }

  return ads;
};

const ads = generateAds(AdsDataConsts.ADS_COUNT);


const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

/** Prepares and returns .map__pin element with mocksObject`s data
 *  @param {object} mocksObject - An object with mocks data needed for pin element filling
 *  @return {object} pin element
 */
const getPinElement = (mocksObject) => {
  const pinElement = pinTemplate.cloneNode(true);
  const pinElementImage = pinElement.querySelector(`img`);
  pinElement.style.left = `${mocksObject.location.x - PinShifts.X}px`;
  pinElement.style.top = `${mocksObject.location.y - PinShifts.Y}px`;
  pinElementImage.src = `${mocksObject.author.avatar}`;
  pinElementImage.alt = `${mocksObject.offer.title}`;

  return pinElement;
};

/**
 * Removes all pins except the main one;
 */
const removePins = () => {
  const pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (const pin of pins) {
    pin.remove();
  };
};

/**
 * Unsets active pin state
 */
const unSetActivePin = () => {
  const activePin = map.querySelector('.map__pin--active');
  if (activePin) {
    activePin.classList.remove('map__pin--active');
  };
};

/**
 * Sets given pin as active
 * @param  {object.HTML-node} pin Currently active pin
 */
const setActivePin = (pin) => {
  pin.classList.add('map__pin--active');
};

/** Adds prepared pin elements to an html fragment and render the fragment into .map__pins
 *  @param {Array.<Object>} ads - object with generated mocks data
 */
const renderPins = (ads) => {
  const fragment = document.createDocumentFragment();
  const mapPins = map.querySelector(`.map__pins`);

  for (let i = 0; i < ads.length; i++) {
    const element = getPinElement(ads[i]);

    element.addEventListener('keydown', (evt) => {
      onPinPressEnter(evt, ads[i], element);
    });

    element.addEventListener('click', () => {
      onPinClickHandler(ads[i], element);
    });

    fragment.appendChild(element);
  }
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

  unSetActivePin();
  document.removeEventListener('keydown', onDocumentEscPressHandler);
};

/**
 * Handles Enter press on a pin
 * @param  {object.event} evt Given event
 * @param  {object} ad  Given ad object
 */
const onPinPressEnter = (evt, ad, pin) => {
  if (evt.key === 'Enter') {
    removeCurrentCard();
    setActivePin(pin);
    renderCard(ad);
  }
};

/**
 * Handles a click on a pin
 * @param  {object} ad  Given ad object
 */
const onPinClickHandler = (ad, pin) => {
  removeCurrentCard();
  setActivePin(pin);
  renderCard(ad);
};

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

/**
 * Removes currently opened card if Escape is pressed
 * @param  {object} evt Given event
 */
const onDocumentEscPressHandler = (evt) => {
  if (evt.key === 'Escape') {
    removeCurrentCard();
  };
};

/** Prepares and renders .map__card element with ad`s data
 *  @param {object} ad - An object with mocks data needed for cardElement filling
 */
const renderCard = (ad) => {
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const cardElement = cardTemplate.cloneNode(true);
  const closeButton = cardElement.querySelector('.popup__close');

  insertAndCheckTextData(ad.offer.title, cardElement.querySelector(`.popup__title`));
  insertAndCheckTextData(ad.offer.address, cardElement.querySelector(`.popup__text--address`));
  insertAndCheckTextData(`${ad.offer.price}₽/ночь`, cardElement.querySelector(`.popup__text--price`));
  insertAndCheckTextData(adData.TYPES_DESCRIPTION[ad.offer.type], cardElement.querySelector(`.popup__type`));
  insertAndCheckTextData(`${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`, cardElement.querySelector(`.popup__text--capacity`));
  insertAndCheckTextData(`Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`, cardElement.querySelector(`.popup__text--time`));
  renderFeatures(cardElement.querySelector(`.popup__features`), ad.offer.features);
  insertAndCheckTextData(ad.offer.description, cardElement.querySelector(`.popup__description`));
  renderPhotos(cardElement.querySelector(`.popup__photos`), ad.offer.photos);
  cardElement.querySelector(`.popup__avatar`).src = ad.author.avatar;

  closeButton.addEventListener('click', removeCurrentCard);
  closeButton.addEventListener('keydown', (evt) => {
    if (evt.key === 'Enter') {
      removeCurrentCard();
    };
  });

  document.addEventListener('keydown', onDocumentEscPressHandler);

  document.querySelector(`.map__filters-container`).before(cardElement);
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
    renderPins(ads);
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
