function WarriorHero(map, x, y) {
  Hero.call(this, map, x, y);
  this.name = 'Paula';
  this.voice = 'Google español de Estados Unidos';
}

WarriorHero.prototype = Object.create(Hero.prototype);
WarriorHero.prototype.constructor = WarriorHero;

// image property MUST be defined in prototype
WarriorHero.prototype.image = 'characters/warrior/warrior.gif';
WarriorHero.prototype.say();