'use strict';

(() => {
  const mainPin = document.querySelector(`.map__pin--main`);

  let isActive = false;

  /**
   * Enables active mode
   */
  const activate = () => {
    window.main.isActive = true;
    window.map.switchState(window.main.isActive);
    window.mainPin.setAddress(window.main.isActive, mainPin.offsetLeft, mainPin.offsetTop);
    window.form.enable();
  };

  /**
   * Enables inactive mode
   */
  const deactivate = () => {
    window.main.isActive = false;
    window.map.switchState(window.main.isActive);
    window.mainPin.addMainPinListeners();
    window.mainPin.reset();
    window.form.disable();
  };

  window.main = {
    isActive: isActive,
    activate: activate,
    deactivate: deactivate
  };

  deactivate();
})();
