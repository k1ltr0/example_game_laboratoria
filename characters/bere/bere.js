function BereHero(map, x, y) {
  Hero.call(this, map, x, y);
  this.name = 'un personaje hermoso';
  this.voice = 'Fiona';
}

BereHero.prototype = Object.create(Hero.prototype);
BereHero.prototype.constructor = BereHero;

// image property MUST be defined in prototype
BereHero.prototype.image = 'characters/bere/bere.gif';