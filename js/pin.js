'use strict';
(function () {
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
  const renderPinElement = function (dataPin) {
    const PIN_TEMPLATE = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
    let pinElement = PIN_TEMPLATE.cloneNode(true);
    pinElement.style.left = (dataPin.location.x - PIN_WIDTH / 2) + `px`;
    pinElement.style.top = (dataPin.location.y - PIN_HEIGHT) + `px`;
    pinElement.querySelector(`img`).src = dataPin.author.avatar;
    pinElement.querySelector(`img`).alt = dataPin.title;
    return pinElement;
  };
  const createPinFragment = function () {
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < window.data.data.length; i++) {
      fragment.appendChild(renderPinElement(window.data.data[i]));
    }
    return fragment;
  };
  window.object.mapPinsWrapper.appendChild(createPinFragment());
  window.pin = {
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
  };
})();
