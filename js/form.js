'use strict';
(function () {
  const PRICE_BUNGALOW_MIN = 0;
  const PRICE_FLAT_MIN = 1000;
  const PRICE_HOUSE_MIN = 5000;
  const PRICE_PALACE_MIN = 10000;


  let price = window.object.adForm.querySelector(`#price`);
  let type = window.object.adForm.querySelector(`#type`);
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
  let timeIn = window.object.adForm.querySelector(`#timein`);
  let timeOut = window.object.adForm.querySelector(`#timeout`);
  const timeInChange = function () {
    timeOut.value = timeIn.value;
  };
  timeIn.addEventListener(`change`, timeInChange);
  const timeOutChange = function () {
    timeIn.value = timeOut.value;
  };
  timeIn.addEventListener(`change`, timeOutChange);
  let roomNumber = window.object.adForm.querySelector(`#room_number`);
  let capacity = window.object.adForm.querySelector(`#capacity`);
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

  let address = window.object.adForm.querySelector(`#address`);
  address.readOnly = true;
  const getAddress = function () {
    let x = parseInt(window.pinMain.mapPinMain.style.left, 10) + window.pinMain.MAP_PIN_MAIN_WIDTH / 2;
    let y = parseInt(window.pinMain.mapPinMain.style.top, 10) + window.pinMain.MAP_PIN_MAIN_HEIGHT;
    address.value = `${x.toString()}, ${y.toString()}`;
  };
  getAddress();

  const submitHandler = function (evt) {
    evt.preventDefault();

    window.upload(new FormData(window.object.adForm), function () {
      resetAdForm();
      window.map.makePageDisable();
      window.pinMain.mapPinMain.addEventListener(`mousedown`, window.pinMain.onMapPinMainMouseDown);
      window.pinMain.mapPinMain.addEventListener(`keydown`, window.pinMain.onMapPinMainEnter);
      showSuccessMassage();
    }, showErrorMassage);
  };
  window.object.adForm.addEventListener(`submit`, submitHandler);
  let adFormReset = window.object.adForm.querySelector(`.ad-form__reset`);
  const resetAdForm = function () {
    window.object.adForm.reset();
    getAddress();
  };
  const adFormResetReset = function (evt) {
    evt.preventDefault();
    resetAdForm();
  };
  const adFormResetEnterPress = function (evt) {
    if (evt.key === `Enter`) {
      resetAdForm();
    }
  };

  adFormReset.addEventListener(`click`, adFormResetReset);
  adFormReset.addEventListener(`keydonw`, adFormResetEnterPress);


  const showSuccessMassage = function () {
    const SUCCESS_TEMPLATE = document.querySelector(`#success`).content.querySelector(`.success`);
    let success = SUCCESS_TEMPLATE.cloneNode(true);
    window.object.adForm.before(success);
    window.addEventListener(`click`, onSuccessMassageClick);
    window.addEventListener(`keydown`, onSuccessMassageEcsPress);
  };
  const onSuccessMassageClick = function () {
    closeSuccessMassage();
  };
  const onSuccessMassageEcsPress = function (evt) {
    if (evt.key === `Escape`) {
      closeSuccessMassage();
    }
  };
  const closeSuccessMassage = function () {
    let success = document.querySelector(`.notice`).querySelector(`.success`);
    success.remove();
    window.removeEventListener(`click`, onSuccessMassageClick);
    window.removeEventListener(`keydown`, onSuccessMassageEcsPress);
  };

  const showErrorMassage = function () {
    const ERROR_TEMPLATE = document.querySelector(`#error`).content.querySelector(`.error`);
    let error = ERROR_TEMPLATE.cloneNode(true);
    window.object.adForm.before(error);
    window.addEventListener(`click`, onErrorMassageClick);
    window.addEventListener(`keydown`, onErrorMassageEcsPress);
    window.form.buttonErrorClose = document.querySelector(`.notice`).querySelector(`.error__button`);
    window.form.buttonErrorClose.focus();
    window.form.buttonErrorClose.addEventListener(`click`, buttonErrorCloseClick);
  };
  const closeErrorMassage = function () {
    let error = document.querySelector(`.notice`).querySelector(`.error`);
    error.remove();
    window.removeEventListener(`click`, onErrorMassageClick);
    window.removeEventListener(`keydown`, onErrorMassageEcsPress);
  };
  const onErrorMassageClick = function () {
    closeErrorMassage();
  };
  const onErrorMassageEcsPress = function (evt) {
    if (evt.key === `Escape`) {
      closeErrorMassage();
    }
  };
  const buttonErrorCloseClick = function () {
    closeErrorMassage();
  };

  window.form = {
    getAddress,
  };
})();
