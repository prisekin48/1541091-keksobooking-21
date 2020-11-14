'use strict';

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

/**
 * Set address according to the map mode
 * @param  {boolean} flag Is-map-active flag
 * @param  {[type]} x    X-coordinate
 * @param  {[type]} y    Y-coordinate
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
  mainPin.style.top = MainPinConsts.START_Y + `px`;
  setAddress(window.main.isActive, mainPin.offsetLeft, mainPin.offsetTop);
};

let currentCursorCoords = {};

/**
 * Manages `mousemove` event calculating mainPin coords
 * @param  {object.event} moveEvt Mousemove event
 */
const onMainPinMouseMove = (moveEvt) => {

  let shift = {
    x: currentCursorCoords.x - moveEvt.clientX,
    y: currentCursorCoords.y - moveEvt.clientY,
  };

  currentCursorCoords.x = moveEvt.clientX;
  currentCursorCoords.y = moveEvt.clientY;

  if (moveEvt.clientY >= WorkingArea.MIN_Y - MainPinConsts.ACTIVE_SHIFT_Y - cursorFromPinShifts.y &&
      moveEvt.clientY <= WorkingArea.MAX_Y - MainPinConsts.ACTIVE_SHIFT_Y - cursorFromPinShifts.y &&
      moveEvt.clientX >= WorkingArea.MIN_X - MainPinConsts.ACTIVE_SHIFT_X - cursorFromPinShifts.x &&
      moveEvt.clientX <= WorkingArea.MAX_X - MainPinConsts.ACTIVE_SHIFT_X - cursorFromPinShifts.x) {
    mainPin.style.top = (mainPin.offsetTop - shift.y) + `px`;
    mainPin.style.left = (mainPin.offsetLeft - shift.x) + `px`;
  }

  setAddress(window.main.isActive, mainPin.offsetLeft, mainPin.offsetTop);
};

/**
 * Removes `mousemove` and `mouseup` listeners on `mouseup` event
 */
const onMainPinMouseUp = () => {
  document.removeEventListener(`mousemove`, onMainPinMouseMove);
  document.removeEventListener(`mouseup`, onMainPinMouseUp);
};

/**
 * Initiates activate function if pressed enter on the focused main pin
 * @param  {object} evt - transfered KeyboardEvent from the listener
 */
const onMainPinPressEnter = (evt) => {
  if (evt.key === `Enter`) {
    evt.preventDefault();
    window.main.activate();
  }
};

let cursorFromPinShifts = {};

/**
 * Adds `mousemove` and `mouseup` listeners on main pin mouse down, and rewrites currentCoords
 * @param  {object} evt - transfered MouseEvent from the listener
 */
const onMainPinMouseDown = (evt) => {
  if (evt.button === 0) {

    currentCursorCoords.x = evt.clientX;
    currentCursorCoords.y = evt.clientY;

    cursorFromPinShifts.x = mainPin.offsetLeft - currentCursorCoords.x;
    cursorFromPinShifts.y = mainPin.offsetTop - currentCursorCoords.y;

    document.addEventListener(`mousemove`, onMainPinMouseMove);
    document.addEventListener(`mouseup`, onMainPinMouseUp);
  }
};

/**
 * Initiates page activation, removes main pin `keydown` and `click` listeners
 */
const onMainPinClick = () => {
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
  setAddress,
  WorkingArea,
  addMainPinListeners
};
