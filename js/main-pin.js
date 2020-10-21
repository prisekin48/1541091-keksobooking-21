'use strict';

(() => {
  const mainPin = document.querySelector(`.map__pin--main`);

  const MainPinConsts = {
    INACTIVE_SHIFT_X: 32,
    INACTIVE_SHIFT_Y: 32,
    ACTIVE_SHIFT_X: 32,
    ACTIVE_SHIFT_Y: 87,
    START_X: 570,
    START_Y: 375
  };

  console.log(MainPinConsts);

  let currentCoords = {
    x: MainPinConsts.START_X,
    y: MainPinConsts.START_Y
  };

  const resetMainPin = () => {
    mainPin.style.left = MainPinConsts.START_X;
    mainPin.style.top = MainPinConsts.START_Y;
  };

  /**
   * Set address according to the map mode
   */
  const setAddress = (flag, x, y) => {
    if (flag) {
      window.form.adAddress.setAttribute(`value`, `${mainPin.offsetLeft + MainPinConsts.ACTIVE_SHIFT_X}, ${mainPin.offsetTop + MainPinConsts.ACTIVE_SHIFT_Y}`);
    } else {
      window.form.adAddress.setAttribute(`value`, `${MainPinConsts.START_X}, ${MainPinConsts.START_Y}`);
    }
  };

  const setCoords = (shift, moveEvt) => {

    if (mainPin.offsetTop < window.map.pinCoordinates.MIN_Y - MainPinConsts.ACTIVE_SHIFT_Y) {
      mainPin.style.top = (window.map.pinCoordinates.MIN_Y - MainPinConsts.ACTIVE_SHIFT_Y) + `px`;
    } else if (mainPin.offsetTop > window.map.pinCoordinates.MAX_Y - MainPinConsts.ACTIVE_SHIFT_Y) {
      mainPin.style.top = (window.map.pinCoordinates.MAX_Y - MainPinConsts.ACTIVE_SHIFT_Y) + `px`;
    } else {
      mainPin.style.top = (mainPin.offsetTop - shift.y) + `px`;
    }

    if (mainPin.offsetLeft < window.map.pinCoordinates.MIN_X - MainPinConsts.ACTIVE_SHIFT_X) {
      mainPin.style.left = (window.map.pinCoordinates.MIN_X - MainPinConsts.ACTIVE_SHIFT_X) + `px`;
    } else if (mainPin.offsetLeft > window.map.pinCoordinates.MAX_X - MainPinConsts.ACTIVE_SHIFT_X) {
      mainPin.style.left = (window.map.pinCoordinates.MAX_X - MainPinConsts.ACTIVE_SHIFT_X) + `px`;
    } else {
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + `px`;
    }
    setAddress(window.main.isActive, mainPin.offsetLeft, mainPin.offsetTop);

    console.log(mainPin.offsetLeft, mainPin.offsetTop, window.main.isActive);
  };

  const onMainPinMouseMove = (moveEvt) => {
    let shift = {
      x: currentCoords.x - moveEvt.clientX,
      y: currentCoords.y - moveEvt.clientY,
    };

    currentCoords.x = moveEvt.clientX;
    currentCoords.y = moveEvt.clientY;

    setCoords(shift, moveEvt);
  };

  const onMainPinMouseUp = (upEvt) => {
    document.removeEventListener('mousemove', onMainPinMouseMove);
    document.removeEventListener('mouseup', onMainPinMouseUp);
  };

  /**
   * Initiates activate function if pressed enter on the focused main pin
   * @param  {object} evt - transfered KeyboardEvent from the listener
   */
  const onMainPinPressEnter = (evt) => {
    if (evt.key === `Enter`) {
      window.main.activate();
    }
  };

  /**
   * Initiates activate function if pressed the main mouse button on the main pin
   * @param  {object} evt - transfered MouseEvent from the listener
   */
  const onMainPinMouseDown = (evt) => {
    if (evt.button === 0) {
      currentCoords.x = evt.clientX;
      currentCoords.y = evt.clientY;
      console.log('mousedown');
      document.addEventListener(`mousemove`, onMainPinMouseMove);
      document.addEventListener(`mouseup`, onMainPinMouseUp);
      window.main.activate();
    }
  };

  /**
   * Adds mousedown (for main button) and keydown (for enter) event listeners to the main pin
   */
  const addMainPinListeners = () => {
    mainPin.addEventListener(`mousedown`, window.mainPin.onMainPinMouseDown);
    mainPin.addEventListener(`keydown`, window.mainPin.onMainPinPressEnter);
  };

  window.mainPin = {
    setAddress: setAddress,
    htmlNode: mainPin,
    consts: MainPinConsts,
    onMainPinPressEnter: onMainPinPressEnter,
    onMainPinMouseDown: onMainPinMouseDown,
    addMainPinListeners: addMainPinListeners
  };
})();
