function Arrow(map, x, y) {
  Hero.call(this, map, x, y);
}

Arrow.prototype = Object.create(Hero.prototype);
Arrow.prototype.constructor = Arrow;
console.log();
// image property MUST be defined in prototype
Arrow.prototype.image = 'characters/arrow/arrow.png';
