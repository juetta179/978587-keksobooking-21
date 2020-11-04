'use strict';
(function () {
  const MAP_PIN_MAIN_WIDTH = 40;
  const MAP_PIN_MAIN_HEIGHT = 44;
  let mapPinMain = window.object.map.querySelector(`.map__pin--main`);
  const onMapPinMainMouseDown = function (evt) {
    if (evt.button === 0) {
      window.map.makePageEnabled();
      window.form.getAddress();
      window.object.mapPinMain.removeEventListener(`mousedown`, onMapPinMainMouseDown);
      window.object.mapPinMain.removeEventListener(`keydown`, onMapPinMainEnter);
    }
  };
  const onMapPinMainEnter = function (evt) {
    if (evt.key === `Enter`) {
      window.map.makePageEnabled();
      window.form.getAddress();
      window.object.mapPinMain.removeEventListener(`mousedown`, onMapPinMainMouseDown);
      window.object.mapPinMain.removeEventListener(`keydown`, onMapPinMainEnter);
    }
  };
  mapPinMain.addEventListener(`mousedown`, onMapPinMainMouseDown);
  mapPinMain.addEventListener(`keydown`, onMapPinMainEnter);
  window.pinMain = {
    mapPinMain: mapPinMain,
    MAP_PIN_MAIN_WIDTH: MAP_PIN_MAIN_WIDTH,
    MAP_PIN_MAIN_HEIGHT: MAP_PIN_MAIN_HEIGHT,
  };
})();
