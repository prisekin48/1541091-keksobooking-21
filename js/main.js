'use strict';

(() => {
  let isActive = false;

  /**
   * Enables active mode
   */
  const activate = () => {
    if (!isActive) {
      window.main.isActive = true;
      window.map.htmlNode.classList.remove(`map--faded`);
      window.map.switchFiltersState(isActive);
      window.form.enable();
      window.map.renderPins(window.data.ads);
      window.mainPin.setAddress(window.main.isActive, window.mainPin.htmlNode.offsetLeft + window.mainPin.consts.ACTIVE_SHIFT_X, window.mainPin.htmlNode.offsetTop + window.mainPin.consts.ACTIVE_SHIFT_Y);
      window.mainPin.htmlNode.removeEventListener(`keydown`, window.mainPin.onMainPinPressEnter);
    }
  };

  /**
   * Enables inactive mode
   */
  const deactivate = () => {
    isActive = false;
    window.map.removePins();
    window.map.htmlNode.classList.add(`map--faded`);
    window.map.switchFiltersState(isActive);
    window.form.disable();
    window.mainPin.addMainPinListeners();
    window.mainPin.setAddress(isActive, window.mainPin.htmlNode.offsetLeft + window.mainPin.consts.INACTIVE_SHIFT_X, window.mainPin.htmlNode.offsetTop + window.mainPin.consts.INACTIVE_SHIFT_Y);
    window.form.setCapacity();
  };

  deactivate();

  window.main = {
    isActive: isActive,
    activate: activate,
    deactivate: deactivate
  };

})();
