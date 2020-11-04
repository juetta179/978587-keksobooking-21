'use strict';
(function () {
  const MAP_PIN_MAIN_WIDTH = 66;
  const MAP_PIN_MAIN_HEIGHT = 75;

  let mapPinMain = window.object.map.querySelector(`.map__pin--main`);
  const onMapPinMainMouseDown = function (evt) {
    if (evt.button === 0) {
      window.map.makePageEnabled();
      window.form.getAddress();
      mapPinMain.removeEventListener(`mousedown`, onMapPinMainMouseDown);
      mapPinMain.removeEventListener(`keydown`, onMapPinMainEnter);
    }
  };
  const onMapPinMainEnter = function (evt) {
    if (evt.key === `Enter`) {
      window.map.makePageEnabled();
      window.form.getAddress();
      mapPinMain.removeEventListener(`mousedown`, onMapPinMainMouseDown);
      mapPinMain.removeEventListener(`keydown`, onMapPinMainEnter);
    }
  };
  mapPinMain.addEventListener(`mousedown`, onMapPinMainMouseDown);
  mapPinMain.addEventListener(`keydown`, onMapPinMainEnter);


  const moveMapPinMain = function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      let newCoords = {
        x: mapPinMain.offsetLeft - shift.x,
        y: mapPinMain.offsetTop - shift.y
      };

      if ((newCoords.x + MAP_PIN_MAIN_WIDTH / 2) >= window.data.LOCATION_X_MIN
        && (newCoords.x + MAP_PIN_MAIN_WIDTH / 2) <= window.data.LOCATION_X_MAX
        && ((newCoords.y + MAP_PIN_MAIN_HEIGHT) >= window.data.LOCATION_Y_MIN)
        && ((newCoords.y + MAP_PIN_MAIN_HEIGHT) <= window.data.LOCATION_Y_MAX)) {
        mapPinMain.style.left = newCoords.x + `px`;
        mapPinMain.style.top = newCoords.y + `px`;

      }
      window.form.getAddress();


    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {
        const onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mapPinMain.removeEventListener(`click`, onClickPreventDefault);
        };
        mapPinMain.addEventListener(`click`, onClickPreventDefault);
      }
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };
  mapPinMain.addEventListener(`mousedown`, moveMapPinMain);

  window.pinMain = {
    mapPinMain,
    MAP_PIN_MAIN_WIDTH,
    MAP_PIN_MAIN_HEIGHT,
  };
})();
