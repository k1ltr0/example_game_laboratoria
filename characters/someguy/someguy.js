function SomeGuy(map, x, y) {
  Hero.call(this, map, x, y);
}

SomeGuy.prototype = Object.create(Hero.prototype);
SomeGuy.prototype.constructor = SomeGuy;
SomeGuy.prototype.say();

// image property MUST be defined in prototype
SomeGuy.prototype.image = 'characters/someguy/someguy.gif';
