'use strict';
const LOCATION_X_MIN = 0;
const LOCATION_Y_MIN = 130;
const LOCATION_Y_MAX = 631;
const TITLE = `Добро пожаловать на генератор рыбных текстов!`;
const PRICE_MIN = 1000;
const PRICE_MAX = 100000;
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const ROOM_MIN = 0;
const ROOM_MAX = 100;
const GUESTS_MIN = 0;
const GUESTS_MAX = 300;
const CHECKINS = [`12:00`, `13:00`, `14:00`];
const CHECKOUTS = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const DESCRIPTION = `Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты.
   Вдали от всех живут они в буквенных домах на берегу Семантика большого языкового океана.
   Маленький ручеек Даль журчит по всей стране и обеспечивает ее всеми необходимыми правилами.
   Эта парадигматическая страна, в которой жаренные члены предложения залетают прямо в рот.`;
const PHOTO_LINKS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const PHOTOS_MAX_LENGTH = 10;
const MAP_PIN_MAIN_WIDTH = 40;
const MAP_PIN_MAIN_HEIGHT = 44;
const MAP_PIN_WIDTH = 50;
const MAP_PIN_HEIGHT = 70;
const PRICE_BUNGALOW_MIN = 0;
const PRICE_FLAT_MIN = 1000;
const PRICE_HOUSE_MIN = 5000;
const PRICE_PALACE_MIN = 10000;
const getPhotoLinks = function () {
  let listPhotos = [];
  for (let i = 0; i < getRandomInt(1, PHOTOS_MAX_LENGTH); i++) {
    listPhotos.push(PHOTO_LINKS[getRandomInt(0, PHOTO_LINKS.length)]);
  }
  return listPhotos;
};
const getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};
const getRandomIntListNoRepeat = function (min, max, length) {
  let randomList = [];
  while (randomList.length < getRandomInt(1, length)) {
    let i = getRandomInt(min, max);
    if (!randomList.includes(i)) {
      randomList.push(i);
    }
  }
  return randomList;
};
const getRandomFeatures = function () {
  const RANDOM_LIST = getRandomIntListNoRepeat(0, FEATURES.length, getRandomInt(1, FEATURES.length));
  let features = [];
  for (let i = 0; i < RANDOM_LIST.length; i++) {
    features.push(FEATURES[RANDOM_LIST[i]]);
  }
  return features;
};
let map = document.querySelector(`.map`);
const LOCATION_X_MAX = map.clientWidth;
const getRandomMapPins = function () {
  let avatar = `img/avatars/user0` + getRandomInt(1, 9) + `.png`;
  let x = getRandomInt(LOCATION_X_MIN, LOCATION_X_MAX);
  let y = getRandomInt(LOCATION_Y_MIN, LOCATION_Y_MAX);
  let title = TITLE;
  let address = x.toString() + `, ` + y.toString();
  let price = getRandomInt(PRICE_MIN, PRICE_MAX);
  let type = TYPES[getRandomInt(0, TYPES, length)];
  let rooms = getRandomInt(ROOM_MIN, ROOM_MAX);
  let guests = getRandomInt(GUESTS_MIN, GUESTS_MAX);
  let checkin = CHECKINS[getRandomInt(0, CHECKINS.length)];
  let checkout = CHECKOUTS[getRandomInt(0, CHECKOUTS.length)];
  let features = getRandomFeatures();
  let description = DESCRIPTION;
  let photos = getPhotoLinks();

  return {
    "author": {
      "avatar": avatar
    },
    "offer": {
      "title": title,
      "address": address,
      "price": price,
      "type": type,
      "rooms": rooms,
      "guests": guests,
      "checkin": checkin,
      "checkout": checkout,
      "features": features,
      "description": description,
      "photos": photos
    },
    "location": {
      "x": x,
      "y": y
    }
  };
};
const getMapPins = function () {
  let mapPins = [];
  for (let i = 0; i < getRandomInt(4, 20); i++) {
    mapPins.push(getRandomMapPins());
  }
  return mapPins;
};
const renderMapPinElement = function (mapPin) {
  const MAP_PIN_TEMPLATE = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  let mapPinElement = MAP_PIN_TEMPLATE.cloneNode(true);
  mapPinElement.style.left = (mapPin.location.x - MAP_PIN_WIDTH / 2) + `px`;
  mapPinElement.style.top = (mapPin.location.y - MAP_PIN_HEIGHT) + `px`;
  mapPinElement.querySelector(`img`).src = mapPin.author.avatar;
  mapPinElement.querySelector(`img`).alt = mapPin.title;
  return mapPinElement;
};
const createMapPinFragment = function () {
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < mapPins.length; i++) {
    fragment.appendChild(renderMapPinElement(mapPins[i]));
  }
  return fragment;
};
let mapPins = getMapPins();
let mapPinsWrapper = map.querySelector(`.map__pins`);
mapPinsWrapper.appendChild(createMapPinFragment());

const isEmpty = function (obj) {
  // eslint-disable-next-line guard-for-in
  for (let key in obj) {
    // если тело цикла начнет выполняться - значит в объекте есть свойства
    return false;
  }
  return true;
};
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
  if (!isEmpty(card.offer.features)) {
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
  if (!isEmpty(card.offer.photos)) {
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
// document.querySelector(`.map__filters-container`).before(renderCardElement(mapPins[0]));
let adForm = document.querySelector(`.ad-form`);
let adFormFieldsets = adForm.querySelectorAll(`fieldset`);
let mapFilters = map.querySelectorAll(`.map__filter`);
let mapFeatures = map.querySelector(`.map__features`);
const makePageDisable = function () {
  map.classList.add(`map--faded`);
  adForm.classList.add(`ad-form--disabled`);
  for (let i = 0; i < adFormFieldsets.length; i++) {
    let fieldset = adFormFieldsets[i];
    fieldset.setAttribute(`disabled`, `true`);
  }
  for (let i = 0; i < mapFilters.length; i++) {
    let fieldset = mapFilters[i];
    fieldset.setAttribute(`disabled`, `true`);
  }
  mapFeatures.setAttribute(`disabled`, `true`);
};
const makePageEnabled = function () {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  for (let i = 0; i < adFormFieldsets.length; i++) {
    let fieldset = adFormFieldsets[i];
    fieldset.removeAttribute(`disabled`);
  }
  for (let i = 0; i < mapFilters.length; i++) {
    let fieldset = mapFilters[i];
    fieldset.removeAttribute(`disabled`);
  }
  mapFeatures.removeAttribute(`disabled`);
};
makePageDisable();
let mapPinMain = map.querySelector(`.map__pin--main`);
const onMapPinMainMouseDown = function (evt) {
  if (evt.button === 0) {
    makePageEnabled();
    getAddress();
    mapPinMain.removeEventListener(`mousedown`, onMapPinMainMouseDown);
    mapPinMain.removeEventListener(`keydown`, onMapPinMainEnter);
  }
};
const onMapPinMainEnter = function (evt) {
  if (evt.key === `Enter`) {
    makePageEnabled();
    getAddress();
    mapPinMain.removeEventListener(`mousedown`, onMapPinMainMouseDown);
    mapPinMain.removeEventListener(`keydown`, onMapPinMainEnter);
  }
};
let address = adForm.querySelector(`#address`);
address.readOnly = true;
const getAddress = function () {
  let x = parseInt(mapPinMain.style.left, 10) + MAP_PIN_MAIN_WIDTH / 2;
  let y = parseInt(mapPinMain.style.top, 10) + MAP_PIN_MAIN_HEIGHT;
  address.value = `${x.toString()}, ${y.toString()}`;
};
getAddress();
mapPinMain.addEventListener(`mousedown`, onMapPinMainMouseDown);
mapPinMain.addEventListener(`keydown`, onMapPinMainEnter);
let price = adForm.querySelector(`#price`);
let type = adForm.querySelector(`#type`);
const typeChange = function () {
  switch (type.value) {
    case `bungalow`:
      price.min = PRICE_BUNGALOW_MIN;
      price.placeholder = PRICE_BUNGALOW_MIN;
      break;
    case `flat`:
      price.min = PRICE_FLAT_MIN;
      price.placeholder = PRICE_FLAT_MIN;
      break;
    case `house`:
      price.min = PRICE_HOUSE_MIN;
      price.placeholder = PRICE_HOUSE_MIN;
      break;
    case `palace`:
      price.min = PRICE_PALACE_MIN;
      price.placeholder = PRICE_PALACE_MIN;
      break;
  }
};
type.addEventListener(`change`, typeChange);
const testPriceValue = function () {
  let value = parseInt(price.value, 10);
  let max = parseInt(price.max, 10);
  let min = parseInt(price.min, 10);
  if (value < min) {
    price.setCustomValidity(`Цена должна быть больше ` + price.min + `рублей.`);
  } else if (value > max) {
    price.setCustomValidity(`Цена должна быть меньше ` + price.max + `рублей.`);
  } else {
    price.setCustomValidity(``);
  }
  price.reportValidity();
};
price.addEventListener(`input`, testPriceValue);
let timeIn = adForm.querySelector(`#timein`);
let timeOut = adForm.querySelector(`#timeout`);
const timeInChange = function () {
  timeOut.value = timeIn.value;
};
timeIn.addEventListener(`change`, timeInChange);
const timeOutChange = function () {
  timeIn.value = timeOut.value;
};
timeIn.addEventListener(`change`, timeOutChange);
let roomNumber = adForm.querySelector(`#room_number`);
let capacity = adForm.querySelector(`#capacity`);
const roomNumberChange = function () {
  switch (roomNumber.value) {
    case `1`:
      capacity.querySelector(`option[value = "3"`).disabled = true;
      capacity.querySelector(`option[value = "2"`).disabled = true;
      capacity.querySelector(`option[value = "1"`).disabled = false;
      capacity.querySelector(`option[value = "0"`).disabled = true;
      capacity.querySelector(`option[value = "1"`).selected = true;
      break;
    case `2` :
      capacity.querySelector(`option[value = "3"`).disabled = true;
      capacity.querySelector(`option[value = "2"`).disabled = false;
      capacity.querySelector(`option[value = "1"`).disabled = false;
      capacity.querySelector(`option[value = "0"`).disabled = true;
      if (capacity.value === `0` || capacity.value === `3`) {
        capacity.querySelector(`option[value = "1"`).selected = true;
      }
      break;
    case `3`:
      capacity.querySelector(`option[value = "3"`).disabled = false;
      capacity.querySelector(`option[value = "2"`).disabled = false;
      capacity.querySelector(`option[value = "1"`).disabled = false;
      capacity.querySelector(`option[value = "0"`).disabled = true;
      if (capacity.value === `0`) {
        capacity.querySelector(`option[value = "1"`).selected = true;
      }
      break;
    case `100`:
      capacity.querySelector(`option[value = "3"`).disabled = true;
      capacity.querySelector(`option[value = "2"`).disabled = true;
      capacity.querySelector(`option[value = "1"`).disabled = true;
      capacity.querySelector(`option[value = "0"`).disabled = false;
      capacity.querySelector(`option[value = "0"`).selected = true;
      break;
  }
};
roomNumber.addEventListener(`change`, roomNumberChange);
const onMapPinMouseDown = function (evt) {
  let targetPin = evt.target;
  if (evt.target.matches(`.map__pin`) && !evt.target.matches(`.map__pin--main`)) {
    targetPin = evt.target;
  } else if (evt.target.parentNode.matches(`.map__pin`) && !evt.target.parentNode.matches(`.map__pin--main`)) {
    targetPin = evt.target.parentNode;
  } else {
    return;
  }
  openPopup(targetPin);
};
const openPopup = function (targetPin) {
  let top = parseInt(targetPin.style.top, 10);
  let left = parseInt(targetPin.style.left, 10);
  try {
    closePopup();
  } catch (e) {
    null;
  }
  let selectMapPin = mapPins.find(findMapPins(top, left));
  let renderCard = renderCardElement(selectMapPin);
  document.querySelector(`.map__filters-container`).before(renderCard);
  let popupClose = document.querySelector(`.popup__close`);
  popupClose.addEventListener(`click`, onPopupCloseMouseDown);
  popupClose.addEventListener(`keydown`, onPopupCloseEnterPress);
  document.addEventListener(`keydown`, onPopupEscPress);
};
const findMapPins = function (top, left) {
  return function (element) {
    return element.location.x === (left + MAP_PIN_WIDTH / 2) && element.location.y === (top + MAP_PIN_HEIGHT);
  };
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
    openPopup(targetPin);
  }
};
const closePopup = function () {
  document.querySelector(`.map__card.popup`).remove();
  document.removeEventListener(`keydown`, onPopupEscPress);
};
const onPopupCloseMouseDown = function () {
  closePopup();
};
const onPopupCloseEnterPress = function (evt) {
  if (evt.key === `Enter`) {
    closePopup();
  }
};
const onPopupEscPress = function (evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closePopup();
  }
};
mapPinsWrapper.addEventListener(`click`, onMapPinMouseDown);
mapPinsWrapper.addEventListener(`keydown`, onMapPinEnterPress);
