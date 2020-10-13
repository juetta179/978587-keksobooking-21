'use strict';
const LOCATON_X_MIN = 0;
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
  let x = getRandomInt(LOCATON_X_MIN, LOCATION_X_MAX);
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
  mapPinElement.style.left = (mapPin.location.x + 20) + `px`;
  mapPinElement.style.top = (mapPin.location.y + 40) + `px`;
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
map.querySelector(`.map__pins`).appendChild(createMapPinFragment());
map.classList.remove(`map--faded`);

function isEmpty(obj) {
  // eslint-disable-next-line guard-for-in
  for (let key in obj) {
    // если тело цикла начнет выполняться - значит в объекте есть свойства
    return false;
  }
  return true;
}

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
document.querySelector(`.map__filters-container`).before(renderCardElement(mapPins[0]));


