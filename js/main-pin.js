'use strict';

(() => {
  const mainPin = document.querySelector(`.map__pin--main`);
  const adAddress = document.querySelector(`#address`);

  const WorkingArea = {
    MIN_Y: 130,
    MAX_Y: 630,
    MIN_X: 0,
    MAX_X: 1200
  };

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
   * Set address according to the map mode
   */
  const setAddress = (flag, x, y) => {
    if (flag) {
      adAddress.setAttribute(`value`, `${x + MainPinConsts.ACTIVE_SHIFT_X}, ${y + MainPinConsts.ACTIVE_SHIFT_Y}`);
    } else {
      adAddress.setAttribute(`value`, `${x + MainPinConsts.INACTIVE_SHIFT_X}, ${y + MainPinConsts.INACTIVE_SHIFT_Y}`);
    }
  };

  /**
   * Resets the main pin to its initial position
   */
  const resetMainPin = () => {
    mainPin.style.left = MainPinConsts.START_X + `px`;
    mainPin.style.top = MainPinConsts.START_Y + `px`
    setAddress(window.main.isActive, mainPin.offsetLeft, mainPin.offsetTop);
  };

  /**
   * Sets mainPin coordinates if it's been moving into certain area
   * @param  {object} shift   Given object with shifts
   * @param  {[type]} moveEvt `mousemove` event
   */
  const setCoords = (shift, moveEvt) => {

    if (mainPin.offsetTop < WorkingArea.MIN_Y - MainPinConsts.ACTIVE_SHIFT_Y) {
      mainPin.style.top = (WorkingArea.MIN_Y - MainPinConsts.ACTIVE_SHIFT_Y) + `px`;
    } else if (mainPin.offsetTop > WorkingArea.MAX_Y - MainPinConsts.ACTIVE_SHIFT_Y) {
      mainPin.style.top = (WorkingArea.MAX_Y - MainPinConsts.ACTIVE_SHIFT_Y) + `px`;
    } else {
      mainPin.style.top = (mainPin.offsetTop - shift.y) + `px`;
    }

    if (mainPin.offsetLeft < WorkingArea.MIN_X - MainPinConsts.ACTIVE_SHIFT_X) {
      mainPin.style.left = (WorkingArea.MIN_X - MainPinConsts.ACTIVE_SHIFT_X) + `px`;
    } else if (mainPin.offsetLeft > WorkingArea.MAX_X - MainPinConsts.ACTIVE_SHIFT_X) {
      mainPin.style.left = (WorkingArea.MAX_X - MainPinConsts.ACTIVE_SHIFT_X) + `px`;
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
    mainPin.removeEventListener(`keydown`, onMainPinPressEnter);
    mainPin.removeEventListener(`click`, onMainPinClick);
  };

  /**
   * Adds mousedown (for main button) and keydown (for enter) event listeners to the main pin
   */
  const addMainPinListeners = () => {
    mainPin.addEventListener(`click`, onMainPinClick);
    mainPin.addEventListener(`mousedown`, onMainPinMouseDown);
    mainPin.addEventListener(`keydown`, onMainPinPressEnter);
  };

  window.mainPin = {
    reset: resetMainPin,
    setAddress: setAddress,
    WorkingArea: WorkingArea,
    addMainPinListeners: addMainPinListeners
  };
})();
