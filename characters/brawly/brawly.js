function Brawly(map, x, y) {
  Hero.call(this, map, x, y);
  this.name = 'Brawly';
  this.voice = 'Juan';
}

Brawly.prototype = Object.create(Hero.prototype);
Brawly.prototype.constructor = Brawly;

// image property MUST be defined in prototype
Brawly.prototype.image = 'characters/brawly/brawly.png';

Brawly.prototype.say();
