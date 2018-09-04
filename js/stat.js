'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;

var GAP = 10;
var MIN_GAP = 5;
var TEXT_HEIGHT = 16;
var MAX_BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  var cloudMarginX = 90;
  var cloudMarginY = 10;
  ctx.beginPath();
  ctx.moveTo(x + cloudMarginX, y + cloudMarginY);
  ctx.bezierCurveTo(x + cloudMarginX, y + cloudMarginY, x + CLOUD_WIDTH / 2, 0, x + CLOUD_WIDTH - cloudMarginX, y + cloudMarginY);
  ctx.bezierCurveTo(x + CLOUD_WIDTH - cloudMarginX, y + cloudMarginY, x + CLOUD_WIDTH + 80, y - cloudMarginY, x + CLOUD_WIDTH, y + CLOUD_HEIGHT / 3);
  ctx.bezierCurveTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT / 3, x + CLOUD_WIDTH + 40, y + CLOUD_HEIGHT / 2, x + CLOUD_WIDTH, y + CLOUD_HEIGHT / 3 * 2);
  ctx.bezierCurveTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT / 3 * 2, x + CLOUD_WIDTH + 80, y + CLOUD_HEIGHT + cloudMarginY, x + CLOUD_WIDTH - cloudMarginX, y + CLOUD_HEIGHT - cloudMarginY);
  ctx.bezierCurveTo(x + CLOUD_WIDTH - cloudMarginX, y + CLOUD_HEIGHT - cloudMarginY, x + CLOUD_WIDTH / 2, y + CLOUD_HEIGHT, x + cloudMarginX, y + CLOUD_HEIGHT - cloudMarginY);
  ctx.bezierCurveTo(x + cloudMarginX, y + CLOUD_HEIGHT - cloudMarginY, x - 80, y + CLOUD_HEIGHT + cloudMarginY, x, y + CLOUD_HEIGHT / 3 * 2);
  ctx.bezierCurveTo(x, y + CLOUD_HEIGHT / 3 * 2, x - 40, y + CLOUD_HEIGHT / 2, x, y + CLOUD_HEIGHT / 3);
  ctx.bezierCurveTo(x, y + CLOUD_HEIGHT / 3, x - 80, y - cloudMarginY, x + cloudMarginX, y + cloudMarginY);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
};

var renderText = function (ctx, text, x, y) {
  ctx.font = 'PT Mono ' + TEXT_HEIGHT + 'px';
  ctx.fillStyle = '#000000';
  ctx.fillText(text, x, y);
};

var getBarColor = function (name) {
  var color;
  if (name === 'Вы') {
    color = 'rgba(255, 0, 0, 1)';
  } else {
    var saturation = Math.floor(Math.random() * 100);
    color = 'hsl(240, ' + saturation + '%, 25%)';
  }
  return color;
};

var getMaxElement = function (array) {
  var max = 0;
  if (array.length) {
    max = array[0];
  }
  for (var i = 1; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
    }
  }
  return max;
};

var renderGameResults = function (ctx, x, y, name, time, maxTime) {
  ctx.fillStyle = getBarColor(name);
  var barHeight = time * MAX_BAR_HEIGHT / maxTime;
  ctx.fillRect(x, y - barHeight, BAR_WIDTH, barHeight);
  renderText(ctx, Math.floor(time), x, y - barHeight - MIN_GAP);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  var results = ['Ура вы победили!', 'Список результатов:'];
  for (i = 0; i < results.length; i++) {
    renderText(ctx, results[i], CLOUD_WIDTH / 2 + CLOUD_X - Math.round((ctx.measureText(results[i])).width / 2), CLOUD_Y + (TEXT_HEIGHT + GAP) * (i + 1));
  }

  if (names.length !== times.length) {
    var minLength = Math.min(names.length, times.length);
    if (names.length > minLength) {
      names.length = minLength;
    } else {
      times.length = minLength;
    }
  }

  if (names.length === 0) {
    return 'No statistics available';
  }

  var maxTime = getMaxElement(times);
  for (var i = 0; i < names.length; i++) {
    var margin = (CLOUD_WIDTH - BAR_WIDTH * names.length - BAR_GAP * (names.length - 1)) / 2;
    var barX = CLOUD_X + margin + (BAR_WIDTH + BAR_GAP) * i;
    var textY = CLOUD_Y + CLOUD_HEIGHT - GAP - MIN_GAP;
    renderText(ctx, names[i], barX, textY);
    renderGameResults(ctx, barX, textY - TEXT_HEIGHT, names[i], times[i], maxTime);
  }

  return 0;
};
