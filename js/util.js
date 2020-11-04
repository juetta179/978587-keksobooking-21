'use strict';
(function () {
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
  const isEmpty = function (obj) {
    // eslint-disable-next-line guard-for-in
    for (let key in obj) {
      // если тело цикла начнет выполняться - значит в объекте есть свойства
      return false;
    }
    return true;
  };
  window.util = {
    getRandomInt: getRandomInt,
    getRandomIntListNoRepeat: getRandomIntListNoRepeat,
    isEmpty: isEmpty,
  };
})();
