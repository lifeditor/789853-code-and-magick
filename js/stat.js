'use strict';

// параметры инфо-окна и тени
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_COLOR = '#fff';
var SHADOW_OFFSET = 10;
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';

// параметры гистограммы
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var BAR_HEIGHT = 150;
var BAR_OFFSET_X = 55;

// для игрока
var PLAYER_NAME = 'Вы';
var PLAYER_BAR_COLOR = 'rgba(255, 0, 0, 1)';

var ALPHA_MIN = 0.1;
var ALPHA_MAX = 1;

// параметры текста
var TEXT_COLOR = '#000';
var FONT_SIZE = 16;
var TEXT_LINE1 = 'Ура вы победили!';
var TEXT_LINE2 = 'Список результатов:';
var fontStyle = FONT_SIZE + 'px "PT Mono"';

var barX = CLOUD_X + BAR_OFFSET_X;
var barY = CLOUD_Y + CLOUD_HEIGHT - FONT_SIZE * 2;
var barTitleY = CLOUD_Y + CLOUD_HEIGHT - FONT_SIZE;
var messageX = CLOUD_X + FONT_SIZE;
var messageY = CLOUD_Y + FONT_SIZE * 2;
var min = ALPHA_MIN * 10;
var max = ALPHA_MAX * 10;

var getMaxElement = function (times) {
  var maxElement = times[0];
  for (var i = 1; i < times.length; i++) {
    if (times[i] > maxElement) {
      maxElement = times[i];
    }
  }
  return maxElement;
};

var generateColor = function () {
  // значения альфа 0.1 .. 0.9 при ALPHA_MIN = 0.1 и ALPHA_MAX = 1
  return 'rgba(0, 0, 120, 0.' + (Math.floor(Math.random() * (max - min)) + min) + ')';
};

var fillCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var fillBar = function (ctx, name, time, x, dY) {
  ctx.fillStyle = (name === PLAYER_NAME) ? PLAYER_BAR_COLOR : generateColor();
  ctx.fillRect(x, barY, BAR_WIDTH, -dY);
  fillTitles(ctx, name, time, x, barTitleY, barY - dY - FONT_SIZE / 2);
};

var fillTitles = function (ctx, text1, text2, x, y1, y2) {
  ctx.fillStyle = TEXT_COLOR;
  ctx.fillText(text1, x, y1);
  ctx.fillText(text2, x, y2);
};

window.renderStatistics = function (ctx, names, times) {

  var maxTime = getMaxElement(times);

  ctx.font = fontStyle;

  fillCloud(ctx, CLOUD_X + SHADOW_OFFSET, CLOUD_Y + SHADOW_OFFSET, SHADOW_COLOR);
  fillCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  for (var i = 0; i < names.length; i++) {
    var dY = Math.floor(BAR_HEIGHT * times[i] / maxTime);
    fillBar(ctx, names[i], Math.floor(times[i]), barX + (BAR_WIDTH + BAR_GAP) * i, dY);
  }

  fillTitles(ctx, TEXT_LINE1, TEXT_LINE2, messageX, messageY, messageY + FONT_SIZE);
};
