function Rita(map, x, y) {
  Hero.call(this, map, x, y);
  this.name = 'Rita';
  this.voice = 'Monica';
}


Rita.prototype = Object.create(Hero.prototype);
Rita.prototype.constructor = Rita;

// image property MUST be defined in prototype
Rita.prototype.image = 'characters/rita/rita.png';

Rita.prototype.say();
