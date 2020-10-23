'use strict';

(() => {

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

  /**
   * Unsets active pin state
   */
  const unsetActivePin = () => {
    const activePin = map.querySelector(`.map__pin--active`);
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
   */
  const switchState = (flag) => {

    switchFiltersState(flag);

    if (flag) {
      map.classList.remove(`map--faded`);
      renderPins(window.data.ads);
    } else {
      map.classList.add(`map--faded`);
      removePins();
    }
  };

  window.map = {
    htmlNode: map,
    switchState: switchState,
    setActivePin: setActivePin,
    unsetActivePin: unsetActivePin
  };
})();
