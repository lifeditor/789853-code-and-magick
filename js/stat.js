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

// параметры текста
var TEXT_COLOR = '#000';
var FONT_SIZE = 16;
var TEXT_LINE1 = 'Ура вы победили!';
var TEXT_LINE2 = 'Список результатов:';
var fontStyle = FONT_SIZE + 'px "PT Mono"';

var alphaValues = ['0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1'];
var barY = CLOUD_Y + CLOUD_HEIGHT - FONT_SIZE * 2;
var messageX = CLOUD_X + FONT_SIZE;
var messageY = CLOUD_Y + FONT_SIZE * 2;

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
  return 'rgba(0, 0, 120, ' + alphaValues[Math.floor(Math.random() * alphaValues.length)] + ')';
};

var fillCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

window.renderStatistics = function (ctx, names, times) {

  var maxTime = getMaxElement(times);

  ctx.font = fontStyle;

  fillCloud(ctx, CLOUD_X + SHADOW_OFFSET, CLOUD_Y + SHADOW_OFFSET, SHADOW_COLOR);
  fillCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  for (var i = 0; i < names.length; i++) {
    var barX = CLOUD_X + BAR_OFFSET_X + (BAR_WIDTH + BAR_GAP) * i;
    var barDeltaY = Math.floor(BAR_HEIGHT * times[i] / maxTime);
    ctx.fillStyle = (names[i] === PLAYER_NAME) ? PLAYER_BAR_COLOR : generateColor();
    ctx.fillRect(barX, barY, BAR_WIDTH, -barDeltaY);
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(names[i], barX, barY + FONT_SIZE);
    ctx.fillText(Math.floor(times[i]), barX, barY - barDeltaY - FONT_SIZE / 2);
  }

  ctx.fillText(TEXT_LINE1, messageX, messageY);
  ctx.fillText(TEXT_LINE2, messageX, messageY + FONT_SIZE);

};
