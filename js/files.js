'use strict';

const FILE_TYPES = [`image/jpg`, `image/jpeg`, `image/png`];

const avaChooser = document.querySelector(`#avatar`);
const avaPreview = document.querySelector(`.ad-form-header__preview img`);
const imageChooser = document.querySelector(`#images`);
const imagePreviewBlock = document.querySelector(`.ad-form__photo`);

/**
 * Invokes when avatar image is loaded
 * @param  {String} result FileReader result
 */
const onAvaLoad = (result) => {
  avaPreview.src = result;
};

/**
 * Invokes when custom ad image is loaded
 * @param  {String} result FileReader result
 */
const onImageLoad = (result) => {
  let element = document.createElement(`img`);
  element.style.width = `70px`;
  element.style.height = `70px`;
  element.src = result;
  imagePreviewBlock.innerHTML = ``;
  imagePreviewBlock.append(element);
};

/**
 * Invokes when a file is choosen
 * @param  {HTML-node} chooser File input
 * @param  {Function} onLoad  Invokes when the file is loaded
 */
const onChooserChange = (chooser, onLoad) => {
  const image = chooser.files[0];
  let matches = false;
  if (image) {
    matches = FILE_TYPES.some((it) => {
      return image.type === it;
    });
  }

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      onLoad(reader.result);
    });

    reader.readAsDataURL(image);
  }
};

avaChooser.addEventListener(`change`, () => {
  onChooserChange(avaChooser, onAvaLoad);
});

imageChooser.addEventListener(`change`, () => {
  onChooserChange(imageChooser, onImageLoad);
});
