'use strict';
(function () {
  const renderCardElement = function (card) {
    const CARD_TEMPLATE = document.querySelector(`#card`).content.querySelector(`.map__card`);
    let cardElement = CARD_TEMPLATE.cloneNode(true);
    if (card.title) {
      cardElement.querySelector(`.popup__title`).textContent = card.title;
    } else {
      cardElement.querySelector(`.popup__title`).remove();
    }
    if (card.offer.address) {
      cardElement.querySelector(`.popup__text--address`).textContent = card.offer.address;
    } else {
      cardElement.querySelector(`.popup__text--address`).remove();
    }
    if (card.offer.price) {
      cardElement.querySelector(`.popup__text--price`).textContent = card.offer.price + `₽/ночь`;
    } else {
      cardElement.querySelector(`.popup__text--price`).remove();
    }
    if (card.offer.rooms && card.offer.guests) {
      cardElement.querySelector(`.popup__text--capacity`).textContent = card.offer.rooms + `комнаты для` + card.offer.guests + `гостей`;
    } else {
      cardElement.querySelector(`.popup__text--capacity`).remove();
    }
    if (card.offer.checkin && card.offer.checkout) {
      cardElement.querySelector(`.popup__text--time`).textContent = card.offer.checkin + `, выезд до ` + card.offer.checkout;
    } else {
      cardElement.querySelector(`.popup__text--time`).remove();
    }
    let features = cardElement.querySelector(`.popup__features`);
    if (!window.util.isEmpty(card.offer.features)) {
      const FEATURE_TEMPLATE = features.querySelector(`.popup__feature`);
      FEATURE_TEMPLATE.classList.remove(`popup__feature--wifi`);
      features.querySelectorAll(`.popup__feature`).forEach((el) => el.remove());
      for (let i = 0; i < card.offer.features.length; i++) {
        let feature = FEATURE_TEMPLATE.cloneNode(true);
        feature.classList.add(`popup__feature--` + card.offer.features[i]);
        features.appendChild(feature);
      }
    } else {
      features.remove();
    }
    if (card.offer.description) {
      cardElement.querySelector(`.popup__description`).textContent = card.offer.description;
    } else {
      cardElement.querySelector(`.popup__description`).remove();
    }
    let photos = cardElement.querySelector(`.popup__photos`);
    if (!window.util.isEmpty(card.offer.photos)) {
      const photoTemplate = cardElement.querySelector(`.popup__photo`);
      photos.querySelector(`.popup__photo`).remove();
      for (let i = 0; i < card.offer.photos.length; i++) {
        let photo = photoTemplate.cloneNode(true);
        photo.src = card.offer.photos[i];
        photos.appendChild(photo);
      }
    } else {
      photos.remove();
    }
    if (card.author.avatar) {
      cardElement.querySelector(`.popup__avatar`).remove();
    } else {
      cardElement.querySelector(`.popup__avatar`).src = card.author.avatar;
    }
    return cardElement;
  };

  const openCard = function (targetPin) {
    let top = parseInt(targetPin.style.top, 10);
    let left = parseInt(targetPin.style.left, 10);
    try {
      closeCard();
    } catch (e) {
      null;
    }
    let selectMapPin = window.data.data.find(findMapPins(top, left));
    let renderCard = window.card.renderCardElement(selectMapPin);
    document.querySelector(`.map__filters-container`).before(renderCard);
    let popupClose = document.querySelector(`.popup__close`);
    popupClose.addEventListener(`click`, onCardCloseMouseDown);
    popupClose.addEventListener(`keydown`, onCardCloseEnterPress);
    document.addEventListener(`keydown`, onCardEscPress);
  };
  const findMapPins = function (top, left) {
    return function (element) {
      return element.location.x === (left + window.pin.PIN_WIDTH / 2) && element.location.y === (top + window.pin.PIN_HEIGHT);
    };
  };
  const closeCard = function () {
    document.querySelector(`.map__card.popup`).remove();
    document.removeEventListener(`keydown`, onCardEscPress);
  };
  const onCardCloseMouseDown = function () {
    closeCard();
  };
  const onCardCloseEnterPress = function (evt) {
    if (evt.key === `Enter`) {
      closeCard();
    }
  };
  const onCardEscPress = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closeCard();
    }
  };
  window.card = {
    renderCardElement,
    openCard,
    closeCard,
  };
})();
