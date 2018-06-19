'use strict';

var WIZARD_COUNT = 4;
var TEMPLATE_ID = '#similar-wizard-template';
var CSS_HIDDEN = 'hidden';
var CSS_PREFIX = '.setup-similar';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var MIN_LENGTH_ERROR = 'Имя должно состоять минимум из 2-х символов';

var names = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var families = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var coatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var eyesColors = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var ballColors = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var wizards = [];
var setupWizard = document.querySelector('.setup');
var wizardList = setupWizard.querySelector(CSS_PREFIX + '-list');
var setupWizardOpen = document.querySelector('.setup-open');
var setupWizardClose = document.querySelector('.setup-close');
var userNameInput = setupWizard.querySelector('.setup-user-name');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var wizardFireBall = setupWizard.querySelector('.setup-fireball-wrap');
var buttonSave = setupWizard.querySelector('.setup-submit');

var generateRandom = function (range) {
  return Math.floor(Math.random() * range);
};

var renderWizard = function (wizard) {
  var wizardTemplate = document.querySelector(TEMPLATE_ID)
    .content
    .querySelector(CSS_PREFIX + '-item');
  var wizardElement = wizardTemplate.cloneNode(true);
  wizardElement.querySelector(CSS_PREFIX + '-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var fillWizardList = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < WIZARD_COUNT; i++) {
    var wizardObj = {};
    wizardObj.name = names[generateRandom(names.length)] + ' ' +
      families[generateRandom(families.length)];
    wizardObj.coatColor = coatColors[generateRandom(coatColors.length)];
    wizardObj.eyesColor = eyesColors[generateRandom(eyesColors.length)];
    wizards[i] = wizardObj;
    fragment.appendChild(renderWizard(wizards[i]));
  }
  return fragment;
};

var setupColor = function (selector, arrays) {
  var input = setupWizard.querySelector(selector);
  var color;

  do {
    color = arrays[generateRandom(arrays.length)];
  } while (input.value === color);
  input.value = color;
  return color;
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && document.activeElement !== userNameInput) {
    closePopup();
  }
};

var onPopupEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    var activeElement = document.activeElement;

    if (activeElement !== buttonSave) {
      evt.preventDefault();
      if (activeElement === setupWizardClose) {
        closePopup();
      }
    }
  }
};

var openPopup = function () {
  setupWizard.classList.remove(CSS_HIDDEN);
  document.addEventListener('keydown', onPopupEscPress);
  document.addEventListener('keydown', onPopupEnterPress);
};

var closePopup = function () {
  setupWizard.classList.add(CSS_HIDDEN);
  document.removeEventListener('keydown', onPopupEscPress);
  document.removeEventListener('keydown', onPopupEnterPress);
};

setupWizardOpen.addEventListener('click', function () {
  openPopup();
});

setupWizardOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupWizardClose.addEventListener('click', function () {
  closePopup();
});

wizardCoat.addEventListener('click', function () {
  wizardCoat.style.fill = setupColor('[name="coat-color"]', coatColors);
});

wizardEyes.addEventListener('click', function () {
  wizardEyes.style.fill = setupColor('[name="eyes-color"]', eyesColors);
});

wizardFireBall.addEventListener('click', function () {
  wizardFireBall
    .style.background = setupColor('[name="fireball-color"]', ballColors);
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity(MIN_LENGTH_ERROR);
  } else {
    target.setCustomValidity('');
  }
});

wizardList.appendChild(fillWizardList());
