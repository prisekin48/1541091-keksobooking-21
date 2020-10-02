'use strict';

var MIN_Y_COORDINATE = 130;
var MAX_Y_COORDINATE = 630;
var SHIFT_PIN_X = -25;
var SHIFT_PIN_Y = -70;

/** Returns a random number between the given min and max, both inclusive
 *  @param {int} min - minimum number
 *  @param {int} max - maximum number
 *  @return {int} returns random number between min and max
 */
var getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var MocksData = {'TITLES': ['Квартира', 'Дом', 'Апартаменты', 'Помещение свободного назначения'],
  'PRICES_FROM_TO': [10000, 45000000],
  'TYPES': ['palace', 'flat', 'house', 'bungalow'],
  'TYPES_DESCRIPTION': {'palace': 'Дворец', 'flat': 'Квартира', 'house': 'Дом', 'bungalow': 'Бунгало'},
  'CHECKIN_CHECKOUT_TIMES': ['12:00', '13:00', '14:00'],
  'FEATURES': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  'DESCRIPTIONS': ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
    'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.'],
  'PHOTOS': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
};

/** Returns an array with random quantity of items gotten from a source array
 *  @param {array} source - source array
 *  @return {array} returns new array with random quantity of items
 */
var getRandomArray = function (source) {
  var newArray = [];
  var newArrayLength = getRandomNumber(1, source.length);
  var sourceCopy = source.slice();
  for (var i = 0; i < newArrayLength; i++) {
    var takenItem = getRandomNumber(0, sourceCopy.length - 1);
    newArray.push(sourceCopy.splice(takenItem, 1)[0]);
  }

  return newArray;
};

/** Returns a random element of the given array
 *  @param {array} arr - an array with a random element of which will be returned
 *  @return {element} returns a random element of the give array
 */
var getRandomElementFromArray = function (arr) {
  var element = arr[getRandomNumber(0, arr.length - 1)];

  return element;
};

/** Generates an array with adds descriptions from prepared object with needed data.
 *  @param {array} target - An array with output objects
 *  @param {int} quantity - Quantity of needed objects in descriptions array
 */
var generateAddsDescriptions = function (quantity = 8) {
  var descriptions = [];

  var avatarNumbers = [];
  for (var i = 1; i <= quantity; i++) {
    avatarNumbers.push(`0${i}`);
  }

  var mapWidth = document.querySelector('.map').clientWidth;

  for (var j = 0; j < quantity; j++) {
    var add = {'author': {
      'avatar': `img/avatars/user${avatarNumbers[j]}.png`
    },
    'offer': {
      'title': getRandomElementFromArray(MocksData.TITLES),
      'price': getRandomNumber(MocksData.PRICES_FROM_TO[0], MocksData.PRICES_FROM_TO[1]),
      'type': getRandomElementFromArray(MocksData.TYPES),
      'rooms': getRandomNumber(1, 5),
      'guests': getRandomNumber(1, 5),
      'checkin': getRandomElementFromArray(MocksData.CHECKIN_CHECKOUT_TIMES),
      'checkout': getRandomElementFromArray(MocksData.CHECKIN_CHECKOUT_TIMES),
      'features': getRandomArray(MocksData.FEATURES),
      'description': getRandomElementFromArray(MocksData.DESCRIPTIONS),
      'photos': getRandomArray(MocksData.PHOTOS)
    },
    'location': {
      'x': getRandomNumber(0, mapWidth),
      'y': getRandomNumber(MIN_Y_COORDINATE, MAX_Y_COORDINATE)
    }
    };
    add.offer.address = `${add.location.x}, ${add.location.y}`;
    descriptions.push(add);
  }

  return descriptions;
};

var addsDescriptions = generateAddsDescriptions(8);

document.querySelector('.map').classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
/** Prepares and returns .map__pin element with mocksObject's data
 *  @param {object} mocksObject - An object with mocks data needed for pin element filling
 *  @return {object} pin element
 */
var getPinElement = function (mocksObject) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinElementImage = pinElement.querySelector('img');
  pinElement.style.left = `${mocksObject.location.x + SHIFT_PIN_X}px`;
  pinElement.style.top = `${mocksObject.location.y + SHIFT_PIN_Y}px`;
  pinElementImage.src = `${mocksObject.author.avatar}`;
  pinElementImage.alt = `${mocksObject.offer.title}`;

  return pinElement;
};

var fragment = document.createDocumentFragment();
var mapPins = document.querySelector('.map__pins');
/** Adds prepared pin elements to an html fragment and render the fragment into .map__pins
 *  @param {Array.<Object>} adds - object with generated mocks data
 */
var renderPins = function (adds = addsDescriptions) {
  adds.forEach(function (item) {
    fragment.appendChild(getPinElement(item));
    mapPins.appendChild(fragment);
  });
};

renderPins(addsDescriptions);

/** Recursively removes elements with no textContent or empty src attribute
 *  @param {object} object
 */
var removeEmptyElements = function (object) {
  for (var item of object.children) {
    if (item.textContent === '' && !item.src) {
      item.remove();
    }
    removeEmptyElements(item);
  }
};


var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
/** Prepares and renders .map__card element with mocksObject's data
 *  @param {object} mocksObject - An object with mocks data needed for card element filling
 */
var renderCardElement = function (mocksObject) {
  var card = cardTemplate.cloneNode(true);
  card.querySelector('.popup__title').textContent = mocksObject.offer.title;
  card.querySelector('.popup__text--address').textContent = mocksObject.offer.address;
  card.querySelector('.popup__text--price').textContent = `${mocksObject.offer.price}₽/ночь`;
  card.querySelector('.popup__type').textContent = MocksData.TYPES_DESCRIPTION[mocksObject.offer.type] ;
  card.querySelector('.popup__text--capacity').textContent = `${mocksObject.offer.rooms} комнаты для ${mocksObject.offer.guests} гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${mocksObject.offer.checkin}, выезд до ${mocksObject.offer.checkout}`;

  for (var i = 0; i < mocksObject.offer.features.length; i++) {
    card.querySelector(`.popup__feature--${mocksObject.offer.features[i]}`).textContent = mocksObject.offer.features[i];
  }
  card.querySelector('.popup__description').textContent = mocksObject.offer.description;

  var photos = card.querySelector('.popup__photos');
  for (var j = 0; j < mocksObject.offer.photos.length; j++) {

    if (j === 0) {
      photos.querySelector('.popup__photo').src = mocksObject.offer.photos[j];
      continue;
    }

    var photo = photos.querySelector('.popup__photo').cloneNode(false);
    photo.src = mocksObject.offer.photos[j];
    photos.appendChild(photo);
  }

  card.querySelector('.popup__avatar').src = mocksObject.author.avatar;
  removeEmptyElements(card);
  document.querySelector('.map__filters-container').before(card);
};

renderCardElement(addsDescriptions[0]);
