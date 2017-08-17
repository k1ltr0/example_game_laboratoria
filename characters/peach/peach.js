function Peach(map, x, y) {
  Hero.call(this, map, x, y);
}

Peach.prototype = Object.create(Hero.prototype);
Peach.prototype.constructor = Peach;

// image property MUST be defined in prototype
Peach.prototype.image = 'characters/peach/peach.png';
Peach.prototype.say();
