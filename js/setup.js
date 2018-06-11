'use strict';

var WIZARD_COUNT = 4;
var TEMPLATE_ID = '#similar-wizard-template';
var CSS_HIDDEN = 'hidden';
var CSS_PREFIX = '.setup-similar';

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

var wizards = [];
var setupWizard = document.querySelector('.setup');
var wizardList = setupWizard.querySelector(CSS_PREFIX + '-list');

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

wizardList.appendChild(fillWizardList());
setupWizard.classList.remove(CSS_HIDDEN);
setupWizard.querySelector(CSS_PREFIX).classList.remove(CSS_HIDDEN);
