function Marcela(map, x, y) {
  Hero.call(this, map, x, y);
  this.voice = 'Diego';
  this.name = 'Está lloviendo';
  console.log();
}

Marcela.prototype = Object.create(Hero.prototype);
Marcela.prototype.constructor = Marcela;

// image property MUST be defined in prototype
Marcela.prototype.image = 'characters/marcela/marcela.png';
Marcela.prototype.say();
