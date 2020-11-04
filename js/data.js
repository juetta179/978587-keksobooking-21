'use strict';
(function () {
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
   Вдали от всех живут они в буквенных домах на берегу Семантика большого языкового океана.`;
  const PHOTO_LINKS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  const PHOTOS_MAX_LENGTH = 10;
  const getPhotoLinks = function () {
    let listPhotos = [];
    for (let i = 0; i < window.util.getRandomInt(1, PHOTOS_MAX_LENGTH); i++) {
      listPhotos.push(PHOTO_LINKS[window.util.getRandomInt(0, PHOTO_LINKS.length)]);
    }
    return listPhotos;
  };

  const getRandomFeatures = function () {
    const RANDOM_LIST = window.util.getRandomIntListNoRepeat(0, FEATURES.length, window.util.getRandomInt(1, FEATURES.length));
    let features = [];
    for (let i = 0; i < RANDOM_LIST.length; i++) {
      features.push(FEATURES[RANDOM_LIST[i]]);
    }
    return features;
  };
  let map = document.querySelector(`.map`);
  const LOCATION_X_MAX = map.clientWidth;

  const getRandomMapPins = function () {
    let avatar = `img/avatars/user0` + window.util.getRandomInt(1, 9) + `.png`;
    let x = window.util.getRandomInt(LOCATION_X_MIN, LOCATION_X_MAX);
    let y = window.util.getRandomInt(LOCATION_Y_MIN, LOCATION_Y_MAX);
    let title = TITLE;
    let address = x.toString() + `, ` + y.toString();
    let price = window.util.getRandomInt(PRICE_MIN, PRICE_MAX);
    let type = TYPES[window.util.getRandomInt(0, TYPES, length)];
    let rooms = window.util.getRandomInt(ROOM_MIN, ROOM_MAX);
    let guests = window.util.getRandomInt(GUESTS_MIN, GUESTS_MAX);
    let checkin = CHECKINS[window.util.getRandomInt(0, CHECKINS.length)];
    let checkout = CHECKOUTS[window.util.getRandomInt(0, CHECKOUTS.length)];
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
  const getData = function () {
    let data = [];
    for (let i = 0; i < window.util.getRandomInt(4, 20); i++) {
      data.push(getRandomMapPins());
    }
    return data;
  };
  window.data = {
    data: getData(),
  };
})();
