'use strict';
(() => {
  const mainPin = document.querySelector('.map__pin--main');

  window.mainPin = {
    mainPin: mainPin,
    /**
     * Initiates activate function if pressed enter on the focused main pin
     * @param  {object} evt - transfered KeyboardEvent from the listener
     */
    onMainPinPressEnter: (evt) => {
      if (evt.key === 'Enter') {
        window.main.activate();
      }
    },

    /**
     * Initiates activate function if pressed the main mouse button on the main pin
     * @param  {object} evt - transfered MouseEvent from the listener
     */
    onMainPinMouseDown: (evt) => {
      if (evt.button === 0) {
        window.main.activate();
      }
    },

    /**
     * Adds mousedown (for main button) and keydown (for enter) event listeners to the main pin
     */
    addMainPinListeners: () => {
      mainPin.addEventListener('mousedown', window.mainPin.onMainPinMouseDown);
      mainPin.addEventListener('keydown', window.mainPin.onMainPinPressEnter);
    }
  };
})();
