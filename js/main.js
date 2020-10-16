'use strict';

(() => {
  let isActive = false;

  /**
   * Set address according to the map mode
   */
  const setAddress = () => {
    if (isActive) {
      window.form.adAddress.setAttribute('value', `${parseInt(window.mainPin.mainPin.style.left, 10) + window.pin.PinShifts.X}, ${parseInt(window.mainPin.mainPin.style.top, 10) + window.pin.PinShifts.Y}`);
    } else {
      window.form.adAddress.setAttribute('value', `${parseInt(window.mainPin.mainPin.style.left, 10)}, ${parseInt(window.mainPin.mainPin.style.top, 10)}`);
    }
  };

  window.main = {
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
        setAddress();
        window.mainPin.mainPin.removeEventListener('mousedown', window.mainPin.onMainPinMouseDown);
        window.mainPin.mainPin.removeEventListener('keydown', window.mainPin.onMainPinPressEnter);
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
      setAddress();
    }
  };

  setAddress();
  window.map.switchFiltersState(isActive);
  window.form.disableForm();
  window.mainPin.addMainPinListeners();
  window.form.setCapacity();
})();
