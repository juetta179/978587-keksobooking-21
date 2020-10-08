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

