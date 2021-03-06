'use strict';

const map = document.querySelector(`.map`);
const mapFilters = map.querySelectorAll(`.map__filter`);
const mapFilterFeatures = map.querySelector(`.map__features`);

/**
 * Removes all pins except the main one;
 */
const removePins = () => {
  const pins = map.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  for (const pin of pins) {
    pin.remove();
  }
};

/** Adds prepared pin elements to an html fragment and render the fragment into .map__pins
 *  @param {Array.<Object>} ads - An array with ad's data
 */
const renderPins = (ads) => {
  const fragment = document.createDocumentFragment();
  const mapPins = map.querySelector(`.map__pins`);

  ads.forEach((ad) => {
    const element = window.pin.create(ad);
    fragment.appendChild(element);
  });
  mapPins.appendChild(fragment);
  switchFiltersState(true);
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
 * Switches state of the map depending on the given flag
 * @param  {boolean} flag Is-map-active flag
 */
const switchState = (flag) => {

  if (flag) {
    map.classList.remove(`map--faded`);
    window.backend.makeRequest();
  } else {
    map.classList.add(`map--faded`);
    removePins();
    switchFiltersState(flag);
  }
};

window.map = {
  switchState,
  renderPins
};
