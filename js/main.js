'use strict';

(() => {
  let isActive = false;

  /**
   * Enables active mode
   */
  const activate = () => {
    window.main.isActive = true;
    window.map.switchState(window.main.isActive);
    window.form.enable();

  };

  /**
   * Enables inactive mode
   */
  const deactivate = () => {
    isActive = false;
    window.map.switchState(isActive);
    window.form.disable();
    window.mainPin.addMainPinListeners();
    window.mainPin.setAddress(window.main.isActive, window.mainPin.htmlNode.offsetLeft, window.mainPin.htmlNode.offsetTop);
  };


  window.main = {
    isActive: isActive,
    activate: activate,
    deactivate: deactivate
  };

  deactivate();
})();
