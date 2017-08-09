function Selector(map, x, y) {
  Hero.call(this, map, x, y);
  this.name = "Elige un personaje";
}

Selector.prototype = Object.create(Hero.prototype);
Selector.prototype.constructor = Selector;

// image property MUST be defined in prototype
Selector.prototype.image = 'characters/selector/selector.png';
Selector.prototype.say();
