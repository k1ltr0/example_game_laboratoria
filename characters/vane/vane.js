function vaneHero(map, x, y) {
  Hero.call(this, map, x, y);
  this.name = "Vanessa";
  this.voice = "Helena";
}

vaneHero.prototype = Object.create(Hero.prototype);
vaneHero.prototype.constructor = vaneHero;

// image property MUST be defined in prototype
vaneHero.prototype.image = 'characters/vane/vane.png';
vaneHero.prototype.say();