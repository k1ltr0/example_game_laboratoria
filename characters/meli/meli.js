function MeliHero(map, x, y) {
  Hero.call(this, map, x, y);
  this.name = "Melissa"
  this.voice = "Fiona"
}

MeliHero.prototype = Object.create(Hero.prototype);
MeliHero.prototype.constructor = MeliHero;

// image property MUST be defined in prototype
MeliHero.prototype.image = 'characters/meli/meli.png';
