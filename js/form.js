'use strict';

const BASE_AVA_SRC = `img/muffin-grey.svg`;

const AdConsts = {
  MIN_TITLE_LENGHT: 30,
  MAX_TITLE_LENGHT: 100,
  MIN_PRICE: {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalow: 0},
  MAX_PRICE: 1000000,
};

const RoomsToCapacityIndexesCorrelation = {
  0: {disabled: [0, 1, 3], enabled: [2]},
  1: {disabled: [0, 3], enabled: [1, 2]},
  2: {disabled: [3], enabled: [0, 1, 2]},
  3: {disabled: [0, 1, 2], enabled: [3]}
};

const form = document.querySelector(`.ad-form`);
const allFieldsets = form.querySelectorAll(`fieldset`);
const adTitle = form.querySelector(`#title`);
const adPrice = form.querySelector(`#price`);
const adType = form.querySelector(`#type`);
const adTimein = form.querySelector(`#timein`);
const adTimeout = form.querySelector(`#timeout`);
const adRoomNumber = form.querySelector(`#room_number`);
const adCapacity = form.querySelector(`#capacity`);

/**
 * Shows red border if the given input is invalid
 * @param {object.<HTML-element>} input Given input element
 */
const showInvalidBorder = (input) => {
  if (!input.validity.valid) {
    input.style.border = `2px solid #f00`;
  } else {
    input.style.border = `unset`;
  }
};

/**
 * Sets the correlation between Checkin and Checkout times
 * @param  {object.event} evt Given event
 */
const setCheckInOutTimes = (evt) => {
  if (evt.target === adTimein) {
    adTimeout.options.selectedIndex = evt.target.options.selectedIndex;
  }
  if (evt.target === adTimeout) {
    adTimein.options.selectedIndex = evt.target.options.selectedIndex;
  }
};

/**
 * Checks if the price is valid or not.
 */
const checkPriceValidity = () => {
  let invalidMessage = `Диапазон цен для выбранного типа жилья:\n
                        ${AdConsts.MIN_PRICE[adType.value]} - ${AdConsts.MAX_PRICE}`;

  if (adPrice.value < AdConsts.MIN_PRICE[adType.value]) {
    adPrice.setCustomValidity(invalidMessage);
  } else if (adPrice.value > AdConsts.MAX_PRICE) {
    adPrice.setCustomValidity(invalidMessage);
  } else {
    adPrice.setCustomValidity(``);
  }

  showInvalidBorder(adPrice);
  adPrice.reportValidity();
};

/**
 * Sets correct capacity according to RoomsToCapacityIndexesCorrelation
 */
const setCapacity = () => {
  const adRoomNumberIndex = adRoomNumber.options.selectedIndex;
  for (let index of RoomsToCapacityIndexesCorrelation[adRoomNumberIndex].disabled) {
    adCapacity.options[index].disabled = true;
  }

  for (let index of RoomsToCapacityIndexesCorrelation[adRoomNumberIndex].enabled) {
    adCapacity.options[index].disabled = false;
  }
};

/**
 * Disables all the form inputs and the form itself
 */
const disableForm = () => {
  form.reset();
  document.querySelector(`.ad-form__photo`).innerHTML = ``;
  document.querySelector(`.ad-form-header__preview img`).src = BASE_AVA_SRC;
  form.classList.add(`ad-form--disabled`);
  // for (const fieldset of allFieldsets) {
  //   fieldset.disabled = true;
  // }
  setMinMaxPrice();
};

/**
 * Enables all the form inputs and the form itself
 */
const enableForm = () => {
  form.classList.remove(`ad-form--disabled`);
  for (const fieldset of allFieldsets) {
    fieldset.disabled = false;
  }
};

/**
 * Sets min and max attributes for #price input
 */
const setMinMaxPrice = () => {
  adPrice.placeholder = AdConsts.MIN_PRICE[adType.value];
  adPrice.min = AdConsts.MIN_PRICE[adType.value];
  adPrice.max = AdConsts.MAX_PRICE;
};

/**
 * Collects form data and submit the form
 * @param  {object.event} evt Submit event
 */
const onFormSubmit = (evt) => {
  evt.preventDefault();
  window.card.removeCurrent();
  let formData = new FormData(form);
  window.backend.submitForm(formData);
};

adTitle.addEventListener(`input`, () => {
  let invalidMessage = `Заголовок объявления должен содержать от
                            ${AdConsts.MIN_TITLE_LENGHT} до ${AdConsts.MAX_TITLE_LENGHT} символов.
                            \nВы ввели ${adTitle.value.length}.`;

  if (adTitle.value.length < AdConsts.MIN_TITLE_LENGHT) {
    adTitle.setCustomValidity(invalidMessage);
  } else if (adTitle.value.length > AdConsts.MAX_TITLE_LENGHT) {
    adTitle.setCustomValidity(invalidMessage);
  } else {
    adTitle.setCustomValidity(``);
  }

  showInvalidBorder(adTitle);
  adTitle.reportValidity();
});

adPrice.addEventListener(`input`, () => {
  checkPriceValidity();
});

adTimein.addEventListener(`change`, (evt) => {
  setCheckInOutTimes(evt);
});

adTimeout.addEventListener(`change`, (evt) => {
  setCheckInOutTimes(evt);
});

adType.addEventListener(`change`, () => {
  setMinMaxPrice();
  checkPriceValidity();
});

adRoomNumber.addEventListener(`change`, () => {
  const anyEnabledIndex = 0;
  const adRoomNumberIndex = adRoomNumber.options.selectedIndex;
  adCapacity.options.selectedIndex = RoomsToCapacityIndexesCorrelation[adRoomNumberIndex].enabled[anyEnabledIndex];
  setCapacity();
});

form.addEventListener(`submit`, onFormSubmit);

setMinMaxPrice();
setCapacity();

window.form = {
  enable: enableForm,
  disable: disableForm,
  submit: onFormSubmit
};

