function Fox(map, x, y) {
  Hero.call(this, map, x, y);
  this.name = 'Firulais';
  this.voice = 'Fiona';
}

Fox.prototype = Object.create(Hero.prototype);
Fox.prototype.constructor = Fox;

// image property MUST be defined in prototype
Fox.prototype.image = 'characters/fox/fox.png';

Fox.prototype.say();