'use strict';

const ANY_STRING = `any`;
const DEBOUNCE_INTERVAL = 500;
const INITIAL_FILTERS_INDEX = 0;

const Prices = {
  LOW: 9999,
  HIGH: 50001
};

const PriceSelectValues = {
  LOW: `low`,
  MID: `middle`,
  HIGH: `high`
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
const allFeatures = document.querySelectorAll(`.map__checkbox`);

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
    renderFilteredPins(collectProperAds());
  }, DEBOUNCE_INTERVAL);
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

/**
 * Checks if a given ad matches to the type filter
 * @param  {object} ad An ad to be checked
 * @return {Boolean}    Returns true if the ad matches the filter, false otherwise.
 */
const checkMatchByType = (ad) => {
  if (typeFilter.value === ANY_STRING) {
    return true;
  } else {
    return ad.offer.type === typeFilter.value;
  }
};

/**
 * Checks if a given ad matches to the price filter
 * @param  {object} ad An ad to be checked
 * @return {Boolean}    Returns true if the ad matches the filter, false otherwise.
 */
const checkMatchByPrice = (ad) => {
  switch (priceFilter.value) {
    case ANY_STRING:
      return true;
    case PriceSelectValues.LOW:
      return ad.offer.price <= Prices.LOW;
    case PriceSelectValues.HIGH:
      return ad.offer.price >= Prices.HIGH;
    case PriceSelectValues.MID:
      return (ad.offer.price > Prices.LOW && ad.offer.price < Prices.HIGH);
    default:
      return false;
  }
};

/**
 * Checks if a given ad matches to the rooms filter
 * @param  {object} ad An ad to be checked
 * @return {Boolean}    Returns true if the ad matches the filter, false otherwise.
 */
const checkMatchByRooms = (ad) => {
  if (roomsFilter.value === ANY_STRING) {
    return true;
  } else {
    return ad.offer.rooms === parseInt(roomsFilter.value, 10);
  }
};

/**
 * Checks if a given ad matches to the guests filter
 * @param  {object} ad An ad to be checked
 * @return {Boolean}    Returns true if the ad matches the filter, false otherwise.
 */
const checkMatchByGuests = (ad) => {
  if (guestsFilter.value === ANY_STRING) {
    return true;
  } else {
    return ad.offer.guests === parseInt(guestsFilter.value, 10);
  }
};

/**
 * Checks if a given ad matches to the features filter
 * @param  {object} ad An ad to be checked
 * @return {Boolean}    Returns true if the ad matches the filter, false otherwise.
 */
const checkMatchByFeatures = (ad) => {
  let selectedFeatures = [];

  allFeatures.forEach((feature) => {
    if (feature.checked) {
      selectedFeatures.push(feature.value);
    }
  });

  for (let feature of selectedFeatures) {
    if (ad.offer.features.includes(feature) === false) {
      return false;
    }
  }
  return true;
};

/**
 * Checks if a given ad matches to all the filters
 * @param  {object} ad A given ad
 * @return {Boolean}    Returns true if the ad matches all the selected filters, false otherwise.
 */
const checkAdFiltersMatching = (ad) => {
  return (checkMatchByType(ad) &&
          checkMatchByPrice(ad) &&
          checkMatchByRooms(ad) &&
          checkMatchByGuests(ad) &&
          checkMatchByFeatures(ad));
};

/**
 * Collects proper ads accordong to selected filters
 * @return {Array} Array with filtered ads (not more than window.ADS_COUNT)
 */
const collectProperAds = () => {
  const ads = window.backend.ads;

  let filteredAds = [];

  for (let i = 0; i < ads.length; i++) {
    if (checkAdFiltersMatching(ads[i])) {
      filteredAds.push(ads[i]);
      if (filteredAds.length === window.ADS_COUNT) {
        break;
      }
    }
  }

  return (filteredAds.length <= window.ADS_COUNT) ? filteredAds : filteredAds.slice(null, window.ADS_COUNT);
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

