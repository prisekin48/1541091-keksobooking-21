`use strict`;

(() => {
  var FILE_TYPES = [`image/gif`, `image/jpg`, `image/jpeg`, `image/png`];

  var avaChooser = document.querySelector(`#avatar`);
  var avaPreview = document.querySelector(`.ad-form-header__preview img`);
  var imageChooser = document.querySelector(`#images`);
  var imagePreviewBlock = document.querySelector(`.ad-form__photo`);

  avaChooser.addEventListener('change', () => {
    var ava = avaChooser.files[0];
    var matches = FILE_TYPES.some((it) => {
     return ava.type === it;
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', () => {
        avaPreview.src = reader.result;
      });

      reader.readAsDataURL(ava);
    }
  });

})();
