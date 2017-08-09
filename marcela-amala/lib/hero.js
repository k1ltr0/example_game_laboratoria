'use strict';


function Hero(map, x, y) {

  this.map = map;
  this.x = x;
  this.y = y;
  this.width = map.tsize;
  this.height = map.tsize;

  this.image = Loader.getImage(this.constructor.name);
  this.name = 'un personaje';
  this.voice = 'Diego';

  document.addEventListener('keydown', function (e) {
    if (e.keyCode === 32) {
      this.say();
    }
  }.bind(this));
}


Hero.SPEED = 256; // pixels per second

Hero.prototype.image = 'assets/bot.png';

Hero.prototype.getVoices = function (cb) {
  let voices = window.speechSynthesis.getVoices();
  if (!voices || !voices.length) {
    return setTimeout(this.getVoices.bind(this, cb));
  }
  cb(voices);
};

Hero.prototype.say = function () {

  const name = this.name || this.constructor.name;
  const voice = this.voice;
  const msg = new SpeechSynthesisUtterance();

  this.getVoices(function (voices) {
    msg.text = 'Hola! Soy ' + name;
    msg.voice = voices.find(function (item) {
      return item.name === voice;
    });
    speechSynthesis.speak(msg);
  });
};


Hero.prototype.move = function (delta, dirx, diry) {

  // move hero
  this.x += dirx * Hero.SPEED * delta;
  this.y += diry * Hero.SPEED * delta;

  // check if we walked into a non-walkable tile
  this._collide(dirx, diry);

  // clamp values
  var maxX = this.map.cols * this.map.tsize;
  var maxY = this.map.rows * this.map.tsize;
  this.x = Math.max(0, Math.min(this.x, maxX));
  this.y = Math.max(0, Math.min(this.y, maxY));
};


Hero.prototype._collide = function (dirx, diry) {

  var row, col;
  // -1 in right and bottom is because image ranges from 0..63
  // and not up to 64
  var left = this.x - this.width / 2;
  var right = this.x + this.width / 2 - 1;
  var top = this.y - this.height / 2;
  var bottom = this.y + this.height / 2 - 1;

  // check for collisions on sprite sides
  var tileDefinition = this.map.collide(left, top) ||
    this.map.collide(right, top) ||
    this.map.collide(right, bottom) ||
    this.map.collide(left, bottom);

  if (!tileDefinition) {
    return;
  }

  if (typeof tileDefinition.action === 'function') {
    tileDefinition.action(this.map);
  }

  if (!tileDefinition.solid) {
    return;
  }

  if (diry > 0) {
    row = this.map.getRow(bottom);
    this.y = -this.height / 2 + this.map.getY(row);
  }
  else if (diry < 0) {
    row = this.map.getRow(top);
    this.y = this.height / 2 + this.map.getY(row + 1);
  }
  else if (dirx > 0) {
    col = this.map.getCol(right);
    this.x = -this.width / 2 + this.map.getX(col);
  }
  else if (dirx < 0) {
    col = this.map.getCol(left);
    this.x = this.width / 2 + this.map.getX(col + 1);
  }
};


window.Hero = Hero;
