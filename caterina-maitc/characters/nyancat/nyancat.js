function Nyancat(map, x, y) {
  Hero.call(this, map, x, y);
  this.name = "tengo calor";
}

Nyancat.prototype = Object.create(Hero.prototype);
Nyancat.prototype.constructor = Nyancat;

// image property MUST be defined in prototype
Nyancat.prototype.image = 'characters/nyancat/nyancat.png';
