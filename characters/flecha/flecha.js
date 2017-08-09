function flechaHero(map, x, y) {
  Hero.call(this, map, x, y);
  this.name = "Elige un personaje";
  this.voice = "Helena";
}

flechaHero.prototype = Object.create(Hero.prototype);
flechaHero.prototype.constructor = flechaHero;

// image property MUST be defined in prototype
flechaHero.prototype.image = 'characters/flecha/flecha.png';
flechaHero.prototype.say();