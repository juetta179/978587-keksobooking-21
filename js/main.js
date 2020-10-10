'use strict';
const getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};
let map = document.querySelector(`.map`);
const getRandomMapPins = function () {
  let avatar = `img/avatars/user0` + getRandomInt(1, 9) + `.png`;
  let x = getRandomInt(0, map.clientWidth);
  let y = getRandomInt(130, 631);
  let title = `Добро пожаловать на генератор рыбных текстов!`;
  let address = x.toString() + `, ` + y.toString();
  let price = getRandomInt(1, 100000);
  let type = [`palace`, `flat`, `house`, `bungalow`][getRandomInt(0, 4)];
  let rooms = getRandomInt(1, 200);
  let guests = getRandomInt(1, 1000);
  let checkin = [`12:00`, `13:00`, `14:00`][getRandomInt(0, 3)];
  let checkout = [`12:00`, `13:00`, `14:00`][getRandomInt(0, 3)];
  let features = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`].slice(getRandomInt(0, 6));
  let description = `Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты.
   Вдали от всех живут они в буквенных домах на берегу Семантика большого языкового океана.
   Маленький ручеек Даль журчит по всей стране и обеспечивает ее всеми необходимыми правилами.
   Эта парадигматическая страна, в которой жаренные члены предложения залетают прямо в рот.`;
  let photos = (() => {
    const listLinks = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
      `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
      `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
    let listPhotos = [];
    for (let i = 0; i < getRandomInt(1, 30); i++) {
      listPhotos.push(listLinks[getRandomInt(0, 3)]);
    }
    return listPhotos;
  })();

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
  let MapPins = [];
  for (let i = 0; i < getRandomInt(4, 20); i++) {
    MapPins.push(getRandomMapPins());
  }
  return MapPins;
};
const renderMapPinElement = function (MapPin) {
  let mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  let MapPinElement = mapPinTemplate.cloneNode(true);
  MapPinElement.style.left = (MapPin.location.x + 20) + `px`;
  MapPinElement.style.top = (MapPin.location.y + 40) + `px`;
  MapPinElement.querySelector(`img`).src = MapPin.author.avatar;
  MapPinElement.querySelector(`img`).alt = MapPin.title;
  return MapPinElement;
};
const createMapPinFragment = function () {
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < MapPins.length; i++) {
    fragment.appendChild(renderMapPinElement(MapPins[i]));
  }
  return fragment;
};

let MapPins = getMapPins();
map.querySelector(`.map__pins`).appendChild(createMapPinFragment());
map.classList.remove(`map--faded`);


function isEmpty(obj) {
  for (let key in obj) {
    // если тело цикла начнет выполняться - значит в объекте есть свойства
    return false;
  }
  return true;
}

const renderCardElement = function (card) {
  let cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  let cardElement = cardTemplate.cloneNode(true);
  card.title ? cardElement.querySelector(`.popup__title`).textContent = card.title : cardElement.querySelector(`.popup__title`).remove();
  card.offer.address ? cardElement.querySelector(`.popup__text--address`).textContent = card.offer.address : cardElement.querySelector(`.popup__text--address`).remove();
  card.offer.price ? cardElement.querySelector(`.popup__text--price`).textContent = card.offer.price + `₽/ночь` : cardElement.querySelector(`.popup__text--price`).remove();
  (card.offer.rooms && card.offer.guests) ? cardElement.querySelector(`.popup__text--capacity`).textContent = card.offer.rooms + `комнаты для` + card.offer.guests + `гостей` : cardElement.querySelector(`.popup__text--capacity`).remove();
  (card.offer.checkin && card.offer.checkout) ? cardElement.querySelector(`.popup__text--time`).textContent = card.offer.checkin + `, выезд до` + card.offer.checkout : cardElement.querySelector(`.popup__text--time`).remove();

  let features = cardElement.querySelector(`.popup__features`);
  let featureTemplate = features.querySelector(`.popup__feature`);
  featureTemplate.classList.remove(`popup__feature--wifi`);
  features.querySelectorAll(`.popup__feature`).forEach((el) => el.remove());
  for (let i = 0; i < card.offer.features.length; i++) {
    let feature = featureTemplate.cloneNode(true);
    feature.classList.add(`popup__feature--` + card.offer.features[i]);
    features.appendChild(feature);
  }
  card.offer.description ? cardElement.querySelector(`.popup__description`).textContent = card.offer.description : cardElement.querySelector(`.popup__description`).remove();
  let photos = cardElement.querySelector(`.popup__photos`);
  if (!isEmpty(card.offer.photos)) {
    let photoTemplate = cardElement.querySelector(`.popup__photo`);
    photos.querySelector(`.popup__photo`).remove();
    for (let i = 0; i < card.offer.photos.length; i++) {
      let photo = photoTemplate.cloneNode(true);
      photo.src = card.offer.photos[i];
      photos.appendChild(photo);
    }
  } else {
    photos.remove();
  }

  card.author.avatar ? cardElement.querySelector(`.popup__avatar`).src = card.author.avatar: cardElement.querySelector(`.popup__avatar`).remove() ;

  return cardElement;
};
console.log(MapPins[0]);
console.log(MapPins[0].offer.features.length);
document.querySelector(`.map__filters-container`).before(renderCardElement(MapPins[0]));


