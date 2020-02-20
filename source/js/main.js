'use strict';

var ESC_BUTTON = 27;

// Валидация формы звонка

var userPhoneModal = document.querySelector('.call-form-modal__input-tel');
var userNameModal = document.querySelector('.call-form-modal__input-name');
var userPhoneInpit = document.querySelector('.call-form__input');
var contactUs = document.querySelector('.contact-us__form-input-tel');
var maskOptions = {mask: '+{7}(000)000-00-00'};

userPhoneModal.addEventListener('input', function () {
  window.iMaskJS(userPhoneModal, maskOptions);
});

userPhoneInpit.addEventListener('input', function () {
  window.iMaskJS(userPhoneInpit, maskOptions);
});

contactUs.addEventListener('input', function () {
  window.iMaskJS(contactUs, maskOptions);
});

// Открытие и закрытие модального окна, запрет скролла 

var body = document.querySelector('body');
var modal = document.querySelector('.call-form-modal');
var modalOverlay = document.querySelector('.call-form-modal__overlay');
var openModalBtn = document.querySelector('.page-header__call-order-open-btn');
var closeModalBtn = document.querySelector('.call-form-modal__btn-close');
var modalSubmit = document.querySelector('.call-ok-popup');


function existVerticalScroll() {
  return document.body.offsetHeight > window.innerHeight
};

function getBodyScrollTop() {
  return self.pageYOffset || (document.documentElement && document.documentElement.ScrollTop) || (document.body && document.body.scrollTop);
};

var openModalCallForm = function () {
  event.preventDefault();
  body.dataset.scrollY = getBodyScrollTop(); // сохраним значение скролла

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

var onInputEscPress = function (evt) {
  if (evt.keyCode === ESC_BUTTON) {
    evt.stopPropagation();
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
userPhoneModal.addEventListener('keydown', onInputEscPress);
userNameModal.addEventListener('keydown', onInputEscPress);

// Отправка формы и показ попапа

var modalSubmit = document.querySelector('.call-ok-popup');
var modalSubmitIconClose = document.querySelector('.call-ok-popup__btn-close');
var modalSubmitBtnClose = document.querySelector('.call-ok-popup__popup-close');

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
  modal.classList.add('hidden');
  modalSubmit.classList.remove('hidden');
  modal.reset();

  document.addEventListener('click', onPopupOverlayClick);
  document.addEventListener('keydown', onPopupEscPress);
});

modalSubmitIconClose.addEventListener('click', modalSubmitClose);
modalSubmitBtnClose.addEventListener('click', modalSubmitClose);  
