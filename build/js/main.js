'use strict';

var ESC_BUTTON = 27;

var body = document.querySelector('body');

var openModalBtn = document.querySelector('.page-header__call-order-open-btn');

var modal = document.querySelector('.call-form-modal');
var modalOverlay = document.querySelector('.page-header__overlay');
var userPhoneModal = document.querySelector('.call-form-modal__input-tel');
var userNameModal = document.querySelector('.call-form-modal__input-name');
var closeModalBtn = document.querySelector('.call-form-modal__btn-close');

var modalSubmit = document.querySelector('.call-ok-popup');
var modalSubmitIconClose = document.querySelector('.call-ok-popup__btn-close');
var modalSubmitBtnClose = document.querySelector('.call-ok-popup__popup-close');

var callForm = document.querySelector('.call-form');
var userPhoneInpit = document.querySelector('.call-form__input-tel');
var callFormBtn = document.querySelector('.call-form__btn');

var contactUsForm = document.querySelector('.contact-us__form');
var contactPhoneInput = document.querySelector('.contact-us__form-input-tel');
var contactNameInput = document.querySelector('.contact-us__form-input-name');

var maskOptions = {mask: '+{7}(000)000-00-00'};

// Свайпер Программы

var tabSwipe = document.querySelector('.slider1');

if (document.body.clientWidth <= 768) {
  var swiper = new window.Swiper(tabSwipe, {
    direction: 'horizontal',
    loop: false,
    slidesPerView: 'auto',
    spaceBetween: 0
  });
};

// Слайдер Отзывы

var reviewSlider = document.querySelector('.slider2');

var slider = new window.Swiper(reviewSlider, {
  direction: 'horizontal',
  spaceBetween: 100,
  loop: false,
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

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

  userPhoneModal.classList.remove('input-valid');
  userNameModal.classList.remove('input-valid');
  userPhoneModal.classList.remove('input-invalid');
  userNameModal.classList.remove('input-invalid');

  modal.reset();
  modalOverlay.classList.add('hidden');
  modal.classList.add('hidden');

  if (existVerticalScroll()) {
    body.classList.remove('body-lock');
    window.scrollTo(0,body.dataset.scrollY);  
  };

  document.removeEventListener('click', onModalOverlayClick);
  document.removeEventListener('keydown', onModalEscPress);
};

var onModalEscPress = function (evt) {
  if (evt.keyCode === ESC_BUTTON && existVerticalScroll()) {
    modalOverlay.classList.add('hidden');
    modal.classList.add('hidden');
    body.classList.remove('body-lock');
    window.scrollTo(0,body.dataset.scrollY);
  }
};

var onModalOverlayClick = function (evt) {
  if (evt.target == modalOverlay) {
    modalOverlay.classList.add('hidden');
    modal.classList.add('hidden');
    body.classList.remove('body-lock');
    window.scrollTo(0,body.dataset.scrollY);
  };
};

openModalBtn.addEventListener('click', openModalCallForm);
closeModalBtn.addEventListener('click', closeModalCallForm);

// Маска на телефон

userPhoneModal.addEventListener('input', function () {
  window.iMaskJS(userPhoneModal, maskOptions);
});

userPhoneInpit.addEventListener('input', function () {
  window.iMaskJS(userPhoneInpit, maskOptions);
});

contactPhoneInput.addEventListener('input', function () {
  window.iMaskJS(contactPhoneInput, maskOptions);
});

// Валидация полей имени

var userNameHandler = function (evt) {
  var target = evt.target;

  if (target.validity.tooShort) {
    if (target.classList.contains('input-valid')) {
      target.classList.remove('input-valid');
    };
    target.classList.add('input-invalid');
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (target.validity.tooLong) {
    if (target.classList.contains('input-valid')) {
      target.classList.remove('input-valid');
    };
    target.classList.add('input-invalid');
    target.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (target.validity.patternMismatch) {
    if (target.classList.contains('input-valid')) {
      target.classList.remove('input-valid');
    };
    target.classList.add('input-invalid');
    target.setCustomValidity('Имя должно состоять из букв и начинаться с заглавной буквы');
  } else if (target.validity.valid) {
    if (target.classList.contains('input-invalid')) {
      target.classList.remove('input-invalid');
    };
    target.classList.add('input-valid');
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

// Валидация полей телефона

var userPhoneHandler = function (evt) {
  var target = evt.target;
  
  if (target.validity.tooShort) {
    if (target.classList.contains('input-valid')) {
      target.classList.remove('input-valid');
    };
    target.classList.add('input-invalid');
    target.setCustomValidity('Телефон должен состоять из 11 цифр, включая 7');
  } else if (target.validity.tooLong) {
    if (target.classList.contains('input-valid')) {
      target.classList.remove('input-valid');
    };
    target.classList.add('input-invalid');
    target.setCustomValidity('Телефон должен состоять из 11 цифр, включая 7');
  } else if (target.validity.patternMismatch) {
    if (target.classList.contains('input-valid')) {
      target.classList.remove('input-valid');
    };
    target.classList.add('input-invalid');
    target.setCustomValidity('Введите телефон в формате "+7(123)4567890"');
  } else if (target.validity.valid) {
    if (target.classList.contains('input-invalid')) {
      target.classList.remove('input-invalid');
    };
    target.classList.add('input-valid');
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

// Отправка главной формы и показ попапа

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

  userPhoneModal.classList.remove('input-valid');
  userNameModal.classList.remove('input-valid');
  modal.classList.add('hidden');
  modalSubmit.classList.remove('hidden');

  modal.reset();

  document.addEventListener('click', onPopupOverlayClick);
  document.addEventListener('keydown', onPopupEscPress);
});

modalSubmitIconClose.addEventListener('click', modalSubmitClose);
modalSubmitBtnClose.addEventListener('click', modalSubmitClose);

// Отправка формы из блока "Хочу поехать"

callForm.addEventListener('submit', function (evt) {
  evt.preventDefault();

  localStorage.setItem('userPhoneInpit', userPhoneInpit.value);

  userPhoneInpit.classList.remove('input-valid');

  callForm.reset();
});

// Отправка формы из блока "Узнать подробности"

contactUsForm.addEventListener('submit', function (evt) {
  evt.preventDefault();

  localStorage.setItem('contactPhoneInput', contactPhoneInput.value);
  localStorage.setItem('contactNameInput', contactNameInput.value);

  contactPhoneInput.classList.remove('input-valid');
  contactNameInput.classList.remove('input-valid');

  contactUsForm.reset();
});

// Плавный скролл от шапки к первому блоку "О программе"

var anchor = document.querySelector('.page-header__anchor');

var scrollToBlockHandler = function (evt) {
  evt.preventDefault();
  
  var block = anchor.getAttribute('href').substr(1);
  
  document.getElementById(block).scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
};

anchor.addEventListener('click', scrollToBlockHandler);
