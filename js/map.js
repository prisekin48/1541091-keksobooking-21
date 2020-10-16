'use strict';

(() => {
  const map = document.querySelector(`.map`);
  const mapFilters = map.querySelectorAll('.map__filter');
  const mapFilterFeatures = map.querySelector('.map__features');


  window.map = {
    map: map,
      /**
       * Removes currently opened card if Escape is pressed
       * @param  {object} evt Given event
       */
      onDocumentEscPress: (evt) => {
        if (evt.key === 'Escape') {
          window.map.removeCurrentCard();
        }
      },

    /**
     * Removes all pins except the main one;
     */
    removePins: () => {
      const pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (const pin of pins) {
        pin.remove();
      }
    },

    /**
     * Unsets active pin state
     */
    unsetActivePin: () => {
      const activePin = map.querySelector('.map__pin--active');
      if (activePin) {
        activePin.classList.remove('map__pin--active');
      }
    },

    /**
     * Sets given pin as active
     * @param  {object.HTML-node} pin Currently active pin
     */
    setActivePin: (pin) => {
      pin.classList.add('map__pin--active');
    },

    /** Adds prepared pin elements to an html fragment and render the fragment into .map__pins
     *  @param {Array.<Object>} ads - An array with ad's data
     */
    renderPins: (ads) => {
      const fragment = document.createDocumentFragment();
      const mapPins = map.querySelector(`.map__pins`);

      ads.forEach(ad => {
        const element = window.pin.createPin(ad);
        fragment.appendChild(element);
      });
      mapPins.appendChild(fragment);
    },

    /**
     * Removes currently opened card;
     */
    removeCurrentCard: () => {
      const card = map.querySelector('.map__card');
      if (card) {
        card.remove();
      }

      window.map.unsetActivePin();
      document.removeEventListener('keydown', window.map.onDocumentEscPress);
    },

    /**
     * Switches filters state according to the map mode
     * @param {boolean} flag Is-map-active flag
     */
    switchFiltersState: (flag) => {
      for (const filter of mapFilters) {
        filter.disabled = !flag;
      }
      mapFilterFeatures.disabled = !flag;
    }
  };
})();
