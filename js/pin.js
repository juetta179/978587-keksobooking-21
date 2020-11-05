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
  const createPinFragment = function (data) {
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < data.length; i++) {
      fragment.appendChild(renderPinElement(data[i]));
    }
    return fragment;
  };
  const onMapPinEnterPress = function (evt) {
    if (evt.key === `Enter`) {
      let targetPin = evt.target;
      if (evt.target.matches(`.map__pin`) && !evt.target.matches(`.map__pin--main`)) {
        targetPin = evt.target;
      } else if (evt.target.parentNode.matches(`.map__pin`) && !evt.target.parentNode.matches(`.map__pin--main`)) {
        targetPin = evt.target.parentNode;
      } else {
        return;
      }
      window.card.openCard(targetPin);
    }
  };
  const onMapPinMouseDown = function (evt) {
    let targetPin = evt.target;
    if (evt.target.matches(`.map__pin`) && !evt.target.matches(`.map__pin--main`)) {
      targetPin = evt.target;
    } else if (evt.target.parentNode.matches(`.map__pin`) && !evt.target.parentNode.matches(`.map__pin--main`)) {
      targetPin = evt.target.parentNode;
    } else {
      return;
    }
    window.card.openCard(targetPin);
  };

  window.pin = {
    PIN_WIDTH,
    PIN_HEIGHT,
    createPinFragment,
    onMapPinEnterPress,
    onMapPinMouseDown
  };
})();
