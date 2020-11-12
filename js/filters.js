'use strict';

(() => {
  const ANY_STRING = `any`;
  const DEBOUNCE_INTERVAL = 500;
  const INITIAL_FILTERS_INDEX = 0;

  const Prices = {
    LOW: 9999,
    HIGH: 50001
  };

  const Features = {
    WIFI: `wifi`,
    DISHWASHER: `dishwasher`,
    PARKING: `parking`,
    WASHER: `washer`,
    ELEVATOR: `elevator`,
    CONDITIONER: `conditioner`
  };

  const filters = document.querySelector(`.map__filters`);
  const typeFilter = filters.querySelector(`#housing-type`);
  const priceFilter = filters.querySelector(`#housing-price`);
  const roomsFilter = filters.querySelector(`#housing-rooms`);
  const guestsFilter = filters.querySelector(`#housing-guests`);
  const wifiFilter = filters.querySelector(`#filter-wifi`);
  const dishwasherFilter = filters.querySelector(`#filter-dishwasher`);
  const parkingFilter = filters.querySelector(`#filter-parking`);
  const washerFilter = filters.querySelector(`#filter-washer`);
  const elevatorFilter = filters.querySelector(`#filter-elevator`);
  const conditionerFilter = filters.querySelector(`#filter-conditioner`);

  /**
   * Removes all pins and renders pins with filtered ads
   * @param {array} ads An array with ads to be rendered
   */
  const renderFilteredPins = (ads) => {
    window.card.removeCurrent();

    const allPins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    allPins.forEach((pin) => pin.remove());
    window.map.renderPins(ads);

  };

  window.lastTimeout = null;
  /**
   * Invokes if there is a change on any filter.
   */
  const onAnyFilterChange = () => {
    if (window.lastTimeout) {
      window.clearTimeout(window.lastTimeout);
    }
    window.lastTimeout = window.setTimeout(() => {
      renderFilteredPins(filterAds());
    }, DEBOUNCE_INTERVAL);
  };

  /**
   * Filters ads
   * @return {array} Array of filtered ads
   */
  const filterAds = () => {
    let ads = window.backend.ads;
    const selectedType = typeFilter.options[typeFilter.options.selectedIndex].value;
    const selectedPrice = priceFilter.options[priceFilter.options.selectedIndex].value;
    const selectedRooms = roomsFilter.options[roomsFilter.options.selectedIndex].value;
    const selectedGuests = guestsFilter.options[guestsFilter.options.selectedIndex].value;
    const isWifi = wifiFilter.checked;
    const isDishwasher = dishwasherFilter.checked;
    const isParking = parkingFilter.checked;
    const isWasher = washerFilter.checked;
    const isElevator = elevatorFilter.checked;
    const isConditioner = conditionerFilter.checked;

    if (selectedType !== ANY_STRING) {
      ads = ads.filter((ad) => {
        return ad.offer.type === selectedType;
      });
    }

    if (selectedPrice !== ANY_STRING) {
      ads = ads.filter((ad) => {
        if (selectedPrice === `low`) {
          return ad.offer.price <= Prices.LOW;
        }
        if (selectedPrice === `high`) {
          return ad.offer.price >= Prices.HIGH;
        } else {
          return (ad.offer.price > Prices.LOW && ad.offer.price < Prices.HIGH);
        }
      });
    }

    if (selectedRooms !== ANY_STRING) {
      ads = ads.filter((ad) => {
        return ad.offer.rooms === parseInt(selectedRooms, 10);
      });
    }

    if (selectedGuests !== ANY_STRING) {
      ads = ads.filter((ad) => {
        return ad.offer.guests === parseInt(selectedGuests, 10);
      });
    }

    if (isWifi === true) {
      ads = ads.filter((ad) => {
        return ad.offer.features.includes(Features.WIFI);
      });
    }

    if (isDishwasher === true) {
      ads = ads.filter((ad) => {
        return ad.offer.features.includes(Features.DISHWASHER);
      });
    }

    if (isParking === true) {
      ads = ads.filter((ad) => {
        return ad.offer.features.includes(Features.PARKING);
      });
    }

    if (isWasher === true) {
      ads = ads.filter((ad) => {
        return ad.offer.features.includes(Features.WASHER);
      });
    }

    if (isElevator === true) {
      ads = ads.filter((ad) => {
        return ad.offer.features.includes(Features.ELEVATOR);
      });
    }

    if (isConditioner === true) {
      ads = ads.filter((ad) => {
        return ad.offer.features.includes(Features.CONDITIONER);
      });
    }

    return ads.slice(null, window.ADS_COUNT);
  };


  /**
   * Resets all the filters on initial state
   */
  const resetFilters = () => {
    typeFilter.selectedIndex = INITIAL_FILTERS_INDEX;
    priceFilter.selectedIndex = INITIAL_FILTERS_INDEX;
    roomsFilter.selectedIndex = INITIAL_FILTERS_INDEX;
    guestsFilter.selectedIndex = INITIAL_FILTERS_INDEX;
    wifiFilter.checked = false;
    dishwasherFilter.checked = false;
    parkingFilter.checked = false;
    washerFilter.checked = false;
    elevatorFilter.checked = false;
    conditionerFilter.checked = false;
  };

  typeFilter.addEventListener(`change`, onAnyFilterChange);
  priceFilter.addEventListener(`change`, onAnyFilterChange);
  roomsFilter.addEventListener(`change`, onAnyFilterChange);
  guestsFilter.addEventListener(`change`, onAnyFilterChange);
  wifiFilter.addEventListener(`change`, onAnyFilterChange);
  dishwasherFilter.addEventListener(`change`, onAnyFilterChange);
  parkingFilter.addEventListener(`change`, onAnyFilterChange);
  washerFilter.addEventListener(`change`, onAnyFilterChange);
  elevatorFilter.addEventListener(`change`, onAnyFilterChange);
  conditionerFilter.addEventListener(`change`, onAnyFilterChange);

  window.filters = {
    reset: resetFilters
  };
})();
