'use strict';

(() => {
  const filters = document.querySelector(`.map__filters`);
  const typeFilter = filters.querySelector(`#housing-type`);

  /**
   * Filters pins depending on selected accomodation type
   */
  const onTypeFilterChange = () => {
    const allPins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    const selectedType = typeFilter.options[typeFilter.options.selectedIndex].value;

    if (selectedType !== `any`) {
      const filterdByType = window.backend.ads.filter(ad => {
        return ad.offer.type === selectedType;
      });

      allPins.forEach(pin => pin.remove());
      window.map.renderPins(filterdByType);
    } else {
      window.map.renderPins(window.backend.ads);
    }

    window.card.removeCurrent();
  }

  typeFilter.addEventListener(`change`, onTypeFilterChange);
})();
