function Pusheen(map, x, y) {
  Hero.call(this, map, x, y);
  this.name ="miau";
}

Pusheen.prototype = Object.create(Hero.prototype);
Pusheen.prototype.constructor = Pusheen;

// image property MUST be defined in prototype
Pusheen.prototype.image = 'characters/pusheen/pusheen.png';