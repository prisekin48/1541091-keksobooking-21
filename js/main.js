'use strict';

/** Returns a random number between the given min and max, both inclusive
@param {int} min - minimum number
@param {int} max - maximum number
@return {int} returns random number between min and max
*/
var getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var mocksData = {'titles': ['Квартира', 'Дом', 'Апартаменты', 'Помещение свободного назначения'],
				'prices': [10000, 20000, 30000, 100000, 450000],
				'types': ['palace', 'flat', 'house', 'bungalow'],
				'checkinTimes': ['12:00', '13:00', '14:00'],
				'checkoutTimes': ['12:00', '13:00', '14:00'],
				'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
				'descriptions': ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
								'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
								'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.'],
				'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
				'x': getRandomNumber(0, document.querySelector('.map').clientWidth),
		        'y': getRandomNumber(130, 630)
};

/** Returns an array with random quantity of items gotten from a source array
@param {array} source - source array
@return {array} returns new array with random quantity of items
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

var addsDescriptions = [];
/** Generates an array with adds descriptions from prepared object with needed data.
	@param {array} target - An array with output objects
	@param {int} quantity - Quantity of needed objects in target array 
*/
var generateAddsDescriptions = function (target = addsDescriptions, quantity = 8) {
	var avatarNumbers = []
	for (var i = 1; i <= quantity; i++) {
		avatarNumbers.push(`0${i}`)
	}

	for (var i = 0; i < quantity; i++) {
		var add = {'author': {
	        'avatar': `img/avatars/user${avatarNumbers.splice(getRandomNumber(0, avatarNumbers.length - 1), 1)[0]}.png`
		    },
		    'offer': {
		        'title': `${mocksData.titles[getRandomNumber(0, mocksData.titles.length - 1)]}`,
		        'address': `${mocksData.x}, ${mocksData.y}`,
		        'price': mocksData.prices[getRandomNumber(0, mocksData.prices.length - 1)],
		        'type': `${mocksData.types[getRandomNumber(0, mocksData.types.length - 1)]}`,
		        'rooms': getRandomNumber(1, 5),
		        'guests': getRandomNumber(1, 5),
		        'checkin': `${mocksData.checkinTimes[getRandomNumber(0, mocksData.checkinTimes.length - 1)]}`,
		        'checkout': `${mocksData.checkoutTimes[getRandomNumber(0, mocksData.checkoutTimes.length - 1)]}`,
		        'features': getRandomArray(mocksData.features),
		        'description': `${mocksData.descriptions[getRandomNumber(0, mocksData.descriptions.length - 1)]}`,
		        'photos': getRandomArray(mocksData.photos)
		    },
		    'location': {
		        'x': mocksData.x,
		        'y': mocksData.y
		    }
		};
		target.push(add);
	}
};
