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

  const renderPinsOnMap = function (pins) {
    try {
      window.card.closeCard();
    } catch (e) {
      null;
    }
    window.object.mapPinsWrapper.appendChild(window.pin.createPinFragment(pins));
    window.object.mapPinsWrapper.addEventListener(`click`, window.pin.onMapPinMouseDown);
    window.object.mapPinsWrapper.addEventListener(`keydown`, window.pin.onMapPinEnterPress);

  };

  const successHandler = function (uploadData) {
    window.data.data = uploadData;
    renderPinsOnMap(uploadData);
  };

  const errorHandler = function (errorMessage) {
    let node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;
    node.textContent = `Упс! Что-то пошло не так. Попробуйте перезагрузить страницу и проверьте соединение с интернетом.` + errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;
  window.load(URL, successHandler, errorHandler);


  window.map = {
    makePageDisable,
    makePageEnabled,
  };


})();
