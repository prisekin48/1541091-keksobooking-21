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

  let currentCoords = {
    x: MainPinConsts.START_X,
    y: MainPinConsts.START_Y
  };

  /**
   * Resets the main pin to its initial position
   */
  const resetMainPin = () => {
    mainPin.style.left = MainPinConsts.START_X;
    mainPin.style.top = MainPinConsts.START_Y;
  };

  /**
   * Set address according to the map mode
   */
  const setAddress = (flag, x, y) => {
    if (flag) {
      window.form.adAddress.setAttribute(`value`, `${x + MainPinConsts.ACTIVE_SHIFT_X}, ${y + MainPinConsts.ACTIVE_SHIFT_Y}`);
    } else {
      window.form.adAddress.setAttribute(`value`, `${x + MainPinConsts.INACTIVE_SHIFT_X}, ${y + MainPinConsts.INACTIVE_SHIFT_Y}`);
    }
  };

  /**
   * Sets mainPin coordinates if it's been moving into certain area
   * @param  {object} shift   Given object with shifts
   * @param  {[type]} moveEvt `mousemove` event
   */
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

  /**
   * Manages `mousemove` event calculating mainPin coords
   * @param  {object.event} moveEvt Mousemove event
   */
  const onMainPinMouseMove = (moveEvt) => {
    let shift = {
      x: currentCoords.x - moveEvt.clientX,
      y: currentCoords.y - moveEvt.clientY,
    };

    currentCoords.x = moveEvt.clientX;
    currentCoords.y = moveEvt.clientY;

    setCoords(shift, moveEvt);
  };

  /**
   * Removes `mousemove` and `mouseup` listeners on `mouseup` event
   * @return {object.event} upEvt Up event
   */
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
   * Adds `mousemove` and `mouseup` listeners on main pin mouse down, and rewrites currentCoords
   * @param  {object} evt - transfered MouseEvent from the listener
   */
  const onMainPinMouseDown = (evt) => {
    if (evt.button === 0) {
      currentCoords.x = evt.clientX;
      currentCoords.y = evt.clientY;
      document.addEventListener(`mousemove`, onMainPinMouseMove);
      document.addEventListener(`mouseup`, onMainPinMouseUp);
    }
  };

  /**
   * Initiates page activation, removes main pin `keydown` and `click` listeners
   * @param  {object} evt - transfered event object from the listener
   */
  const onMainPinClick = (evt) => {
    window.main.activate();
    window.mainPin.setAddress(window.main.isActive, mainPin.offsetLeft, mainPin.offsetTop);
    window.mainPin.htmlNode.removeEventListener(`keydown`, onMainPinPressEnter);
    window.mainPin.htmlNode.removeEventListener(`click`, onMainPinClick);
  };

  /**
   * Adds mousedown (for main button) and keydown (for enter) event listeners to the main pin
   */
  const addMainPinListeners = () => {
    mainPin.addEventListener(`click`, window.mainPin.onMainPinClick);
    mainPin.addEventListener(`mousedown`, window.mainPin.onMainPinMouseDown);
    mainPin.addEventListener(`keydown`, window.mainPin.onMainPinPressEnter);
  };

  window.mainPin = {
    setAddress: setAddress,
    htmlNode: mainPin,
    consts: MainPinConsts,
    onMainPinPressEnter: onMainPinPressEnter,
    onMainPinMouseDown: onMainPinMouseDown,
    onMainPinClick: onMainPinClick,
    addMainPinListeners: addMainPinListeners
  };
})();
