'use strict';

(() => {
  const mainPin = document.querySelector(`.map__pin--main`);
  const mainPinWidth = 62;

  const mainPinShifts = {
    x: 31,
    y: 84
  };

  let startCoords = {};

  const calcCoords = (shift, moveEvt) => {

    if (mainPin.offsetTop < window.data.PinCoordinates.MIN_Y - mainPinShifts.y) {
      mainPin.style.top = (window.data.PinCoordinates.MIN_Y - mainPinShifts.y) + `px`;
    } else if (mainPin.offsetTop > window.data.PinCoordinates.MAX_Y - mainPinShifts.y) {
      mainPin.style.top = (window.data.PinCoordinates.MAX_Y - mainPinShifts.y) + `px`;
    } else {
      mainPin.style.top = (mainPin.offsetTop - shift.y) + `px`;
    }

    if (mainPin.offsetLeft < window.data.PinCoordinates.MIN_X - mainPinShifts.x) {
      mainPin.style.left = (window.data.PinCoordinates.MIN_X - mainPinShifts.x) + `px`;
    } else if (mainPin.offsetLeft > window.data.PinCoordinates.MAX_X - mainPinShifts.x) {
      mainPin.style.left = (window.data.PinCoordinates.MAX_X - mainPinShifts.x) + `px`;
    } else {
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + `px`;
    }
  };

  const onMainPinMouseMove = (moveEvt) => {
    if (moveEvt.clientX > 5) {

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords.x = moveEvt.clientX;
      startCoords.y = moveEvt.clientY;

      calcCoords(shift, moveEvt);
    }
  };

  const onMainPinMouseUp = (upEvt) => {
    console.log('mouseup');
    window.main.setAddress();
    document.removeEventListener('mousemove', onMainPinMouseMove);
    document.removeEventListener('mouseup', onMainPinMouseUp);
  };


  window.mainPin = {
    mainPin: mainPin,
    mainPinShifts: mainPinShifts,
    /**
     * Initiates activate function if pressed enter on the focused main pin
     * @param  {object} evt - transfered KeyboardEvent from the listener
     */
    onMainPinPressEnter: (evt) => {
      if (evt.key === `Enter`) {
        window.main.activate();
      }
    },

    /**
     * Initiates activate function if pressed the main mouse button on the main pin
     * @param  {object} evt - transfered MouseEvent from the listener
     */
    onMainPinMouseDown: (evt) => {
      if (evt.button === 0) {
        startCoords.x = evt.clientX;
        startCoords.y = evt.clientY;
        console.log('mousedown');
        document.addEventListener(`mousemove`, onMainPinMouseMove);
        document.addEventListener(`mouseup`, onMainPinMouseUp);
        window.main.activate();
      }
    },

    /**
     * Adds mousedown (for main button) and keydown (for enter) event listeners to the main pin
     */
    addMainPinListeners: () => {
      mainPin.addEventListener(`mousedown`, window.mainPin.onMainPinMouseDown);
      mainPin.addEventListener(`keydown`, window.mainPin.onMainPinPressEnter);
    }
  };
})();
