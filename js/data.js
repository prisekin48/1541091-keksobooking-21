'use strict';

const PinCoordinates = {
  MIN_Y: 130,
  MAX_Y: 630,
  MIN_X: 0,
  MAX_X: 1200
};

const adMocksData = {
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

(() => {
  window.data = {
    AdsDataConsts: {
      ADS_COUNT: 8,
      ROOMS_MIN: 1,
      ROOMS_MAX: 5,
      GUESTS_MIN: 1,
      GUESTS_MAX: 5
    },
    /** Generates an array with adds descriptions from prepared object with needed data.
     *  @param {int} count - Quantity of needed objects in descriptions array
     *  @return {array.<Object>} ads - Array of objects
     */
    generateAds: (count) => {
      const ads = [];

      for (let j = 0; j < count; j++) {
        const ad = {
          author: {
            avatar: `img/avatars/user0${j + 1}.png`
          },
          offer: {
            title: window.util.getRandomElementFromArray(adMocksData.TITLES),
            price: window.util.getRandomNumber(adMocksData.PRICES_MIN, adMocksData.PRICES_MAX),
            type: window.util.getRandomElementFromArray(Object.keys(adMocksData.TYPES_DESCRIPTION)),
            rooms: window.util.getRandomNumber(window.data.AdsDataConsts.ROOMS_MIN, window.data.AdsDataConsts.ROOMS_MAX),
            guests: window.util.getRandomNumber(window.data.AdsDataConsts.GUESTS_MIN, window.data.AdsDataConsts.GUESTS_MAX),
            checkin: window.util.getRandomElementFromArray(adMocksData.CHECKIN_CHECKOUT_TIMES),
            checkout: window.util.getRandomElementFromArray(adMocksData.CHECKIN_CHECKOUT_TIMES),
            features: window.util.getRandomArray(adMocksData.FEATURES),
            description: window.util.getRandomElementFromArray(adMocksData.DESCRIPTIONS),
            photos: window.util.getRandomArray(adMocksData.PHOTOS)
          },
          location: {
            x: window.util.getRandomNumber(PinCoordinates.MIN_X, PinCoordinates.MAX_X),
            y: window.util.getRandomNumber(PinCoordinates.MIN_Y, PinCoordinates.MAX_Y)
          }
        };
        ad.offer.address = `${ad.location.x}, ${ad.location.y}`;
        ads.push(ad);
      }

      return ads;
    }
  };

  window.data.ads = window.data.generateAds(window.data.AdsDataConsts.ADS_COUNT);


})();

