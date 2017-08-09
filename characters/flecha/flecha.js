function FlechaHero(map, x, y) {
  Hero.call(this, map, x, y);
}

FlechaHero.prototype = Object.create(Hero.prototype);
FlechaHero.prototype.constructor = FlechaHero;

// image property MUST be defined in prototype
FlechaHero.prototype.image = 'characters/flecha/flecha.png';