'use strict';

(() => {
  let isActive = false;



  window.main = {
    /**
     * Set address according to the map mode
     */
    setAddress: () => {
      if (isActive) {
        window.form.adAddress.setAttribute(`value`, `${window.mainPin.mainPin.offsetLeft + window.mainPin.mainPinShifts.x}, ${window.mainPin.mainPin.offsetTop + window.mainPin.mainPinShifts.y}`);
      } else {
        window.form.adAddress.setAttribute(`value`, `${parseInt(window.mainPin.mainPin.style.left, 10)}, ${parseInt(window.mainPin.mainPin.style.top, 10)}`);
      }
    },

    /**
     * Enables active mode
     */
    activate: () => {
      if (!isActive) {
        isActive = true;
        window.map.map.classList.remove(`map--faded`);
        window.map.switchFiltersState(isActive);
        window.form.enableForm();
        window.map.renderPins(window.data.ads);
        window.main.setAddress();
        window.mainPin.mainPin.removeEventListener(`keydown`, window.mainPin.onMainPinPressEnter);
      }
    },

    /**
     * Enables inactive mode
     */
    deactivate: () => {
      isActive = false;
      window.map.removePins();
      window.map.map.classList.add(`map--faded`);
      window.map.switchFiltersState(isActive);
      window.form.disableForm();
      window.mainPin.addMainPinListeners();
      window.main.setAddress();
    }
  };

  window.main.setAddress();
  window.map.switchFiltersState(isActive);
  window.form.disableForm();
  window.mainPin.addMainPinListeners();
  window.form.setCapacity();
})();
