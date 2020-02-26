'use strict';

var ESC_BUTTON = 27;
var userPhoneModal = document.querySelector('.call-form-modal__input-tel');
var userNameModal = document.querySelector('.call-form-modal__input-name');
var userPhoneInpit = document.querySelector('.call-form__input-tel');
var contactPhoneInput = document.querySelector('.contact-us__form-input-tel');
var contactNameInput = document.querySelector('.contact-us__form-input-name');
var body = document.querySelector('body');
var modal = document.querySelector('.call-form-modal');
var modalOverlay = document.querySelector('.call-form-modal__overlay');
var openModalBtn = document.querySelector('.page-header__call-order-open-btn');
var closeModalBtn = document.querySelector('.call-form-modal__btn-close');
var modalSubmit = document.querySelector('.call-ok-popup');
var maskOptions = {mask: '+{7}(000)000-00-00'};
var modalSubmit = document.querySelector('.call-ok-popup');
var modalSubmitIconClose = document.querySelector('.call-ok-popup__btn-close');
var modalSubmitBtnClose = document.querySelector('.call-ok-popup__popup-close');

// Открытие и закрытие модального окна, запрет скролла 

function existVerticalScroll() {
  return document.body.offsetHeight > window.innerHeight
};

function getBodyScrollTop() {
  return self.pageYOffset || (document.documentElement && document.documentElement.ScrollTop) || (document.body && document.body.scrollTop);
};

var openModalCallForm = function () {
  event.preventDefault();
  body.dataset.scrollY = getBodyScrollTop();

  modalOverlay.classList.remove('hidden');
  modal.classList.remove('hidden');
  userNameModal.focus();

  if (existVerticalScroll()) {
    body.classList.add('body-lock');
    body.style.top = `-${body.dataset.scrollY}px`
  };

  document.addEventListener('click', onModalOverlayClick);
  document.addEventListener('keydown', onModalEscPress);
};

var closeModalCallForm = function (evt) {
  evt.preventDefault();
  modal.reset();
  modalOverlay.classList.add('hidden');
  modal.classList.add('hidden');

  if (existVerticalScroll()) {
    body.classList.remove('body-lock')
    window.scrollTo(0,body.dataset.scrollY)    
  };

  document.removeEventListener('click', onModalOverlayClick);
  document.removeEventListener('keydown', onModalEscPress);
};

var onModalEscPress = function (evt) {
  if (evt.keyCode === ESC_BUTTON && existVerticalScroll()) {
    modalOverlay.classList.add('hidden');
    modal.classList.add('hidden');
    body.classList.remove('body-lock')
    window.scrollTo(0,body.dataset.scrollY)
  }
};

var onModalOverlayClick = function (evt) {
  if (evt.target == modalOverlay) {
    modalOverlay.classList.add('hidden');
    modal.classList.add('hidden');
    body.classList.remove('body-lock');
    window.scrollTo(0,body.dataset.scrollY)
  };
};

openModalBtn.addEventListener('click', openModalCallForm);
closeModalBtn.addEventListener('click', closeModalCallForm);

// Маска на телефон и валидация

userPhoneModal.addEventListener('input', function () {
  window.iMaskJS(userPhoneModal, maskOptions);
});

userPhoneInpit.addEventListener('input', function () {
  window.iMaskJS(userPhoneInpit, maskOptions);
});

contactPhoneInput.addEventListener('input', function () {
  window.iMaskJS(contactPhoneInput, maskOptions);
});

var userNameHandler = function (evt) {
  var target = evt.target;

  if (target.validity.tooShort) {
    target.style = "border-color: rgba(255,0,0,0.5)";
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (target.validity.tooLong) {
    target.style = "border-color: rgba(255,0,0,0.5)";
    target.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (target.validity.patternMismatch) {
    target.style = "border-color: rgba(255,0,0,0.5)";
    target.setCustomValidity('Имя должно состоять из букв и начинаться с заглавной буквы');
  } else if (target.validity.valid) {
    target.style = "border-color: #484848";
  }
};

userNameModal.addEventListener('change', userNameHandler);
contactNameInput.addEventListener('change', userNameHandler);

userNameModal.addEventListener('input', function () {
  userNameModal.setCustomValidity('');
});

contactNameInput.addEventListener('input', function () {
  contactNameInput.setCustomValidity('');
});

var userPhoneHandler = function (evt) {
  var target = evt.target;

  if (target.validity.tooShort) {
    target.style = "border-color: rgba(255,0,0,0.5)";
    target.setCustomValidity('Телефон должен состоять из 11 цифр, включая 7');
  } else if (target.validity.tooLong) {
    target.style = "border-color: rgba(255,0,0,0.5)";
    target.setCustomValidity('Телефон должен состоять из 11 цифр, включая 7');
  } else if (target.validity.valid) {
    target.style = "border-color: #484848";
  }
};

userPhoneModal.addEventListener('change', userPhoneHandler);
userPhoneInpit.addEventListener('change', userPhoneHandler);
contactPhoneInput.addEventListener('change', userPhoneHandler);

userPhoneModal.addEventListener('input', function () {
  userPhoneModal.setCustomValidity('');
});

userPhoneInpit.addEventListener('input', function () {
  userPhoneInpit.setCustomValidity('');
});

contactPhoneInput.addEventListener('input', function () {
  contactPhoneInput.setCustomValidity('');
});

// Отправка формы и показ попапа

var onPopupOverlayClick = function (evt) {
  if (evt.target == modalOverlay) {
    modalOverlay.classList.add('hidden');
    modalSubmit.classList.add('hidden');
    body.classList.remove('body-lock');
    window.scrollTo(0,body.dataset.scrollY)
  };
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_BUTTON && existVerticalScroll()) {
    modalOverlay.classList.add('hidden');
    modalSubmit.classList.add('hidden');
    body.classList.remove('body-lock')
    window.scrollTo(0,body.dataset.scrollY)
  }
};

var modalSubmitClose = function (evt) {
  modal.reset();
  evt.preventDefault();
  modalOverlay.classList.add('hidden');
  modalSubmit.classList.add('hidden');

  if (existVerticalScroll()) {
    body.classList.remove('body-lock')
    window.scrollTo(0,body.dataset.scrollY)    
  };

  document.removeEventListener('click', onModalOverlayClick);
  document.removeEventListener('keydown', onPopupEscPress);
}

modal.addEventListener('submit', function (evt) {
  evt.preventDefault();
  
  localStorage.setItem('userPhoneModal', userPhoneModal.value);
  localStorage.setItem('userNameModal', userNameModal.value);

  modal.classList.add('hidden');
  modalSubmit.classList.remove('hidden');
  modal.reset();
  
  userNameModal.style = ("border-color: #FFC341");
  contactNameInput.style = ("border-color: #FFC341");

  userPhoneModal.style = ("border-color: #FFC341");
  userPhoneInpit.style = ("border-color: #FFC341");
  contactPhoneInput.style = ("border-color: #FFC341");

  

  document.addEventListener('click', onPopupOverlayClick);
  document.addEventListener('keydown', onPopupEscPress);
});

modalSubmitIconClose.addEventListener('click', modalSubmitClose);
modalSubmitBtnClose.addEventListener('click', modalSubmitClose);
