'use strict';

// Валидация формы звонка

var IMask = require("imask");

var callFormModal = document.querySelector('.call-form-modal');
var userPhone = callFormModal.querySelector('.call-form-modal__input-tel');

var inputUserTel = function () {
  var mask = IMask(userPhone, maskOptions);
  var maskOptions = {
    mask: '+{7}(000)000-00-00'
  };
  
};

userPhone.addEventListener('change', inputUserTel);
