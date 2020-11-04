'use strict';
(function () {
  const makePageDisable = function () {
    window.object.map.classList.add(`map--faded`);
    window.object.adForm.classList.add(`ad-form--disabled`);
    for (let i = 0; i < window.object.adFormFieldsets.length; i++) {
      let fieldset = window.object.adFormFieldsets[i];
      fieldset.setAttribute(`disabled`, `true`);
    }
    for (let i = 0; i < window.object.mapFilters.length; i++) {
      let fieldset = window.object.mapFilters[i];
      fieldset.setAttribute(`disabled`, `true`);
    }
    window.object.mapFeatures.setAttribute(`disabled`, `true`);
  };
  const makePageEnabled = function () {
    window.object.map.classList.remove(`map--faded`);
    window.object.adForm.classList.remove(`ad-form--disabled`);
    for (let i = 0; i < window.object.adFormFieldsets.length; i++) {
      let fieldset = window.object.adFormFieldsets[i];
      fieldset.removeAttribute(`disabled`);
    }
    for (let i = 0; i < window.object.mapFilters.length; i++) {
      let fieldset = window.object.mapFilters[i];
      fieldset.removeAttribute(`disabled`);
    }
    window.object.mapFeatures.removeAttribute(`disabled`);
  };
  makePageDisable();
  window.map = {
    makePageDisable: makePageDisable,
    makePageEnabled: makePageEnabled,
  };


})();
