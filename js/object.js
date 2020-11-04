'use strict';
(function () {

  let map = document.querySelector(`.map`);
  let mapPinsWrapper = map.querySelector(`.map__pins`);
  let adForm = document.querySelector(`.ad-form`);
  let adFormFieldsets = adForm.querySelectorAll(`fieldset`);
  let mapFilters = map.querySelectorAll(`.map__filter`);
  let mapFeatures = map.querySelector(`.map__features`);

  window.object = {
    map: map,
    mapPinsWrapper: mapPinsWrapper,
    adForm: adForm,
    adFormFieldsets: adFormFieldsets,
    mapFilters: mapFilters,
    mapFeatures: mapFeatures,

  };
})();
