function Amala(map, x, y) {
	Hero.call(this, map, x, y);
	this.name = 'quien dejo la ropa en la lluvia';
	this.voice = 'AmalaKamala';
}

Amala.prototype = Object.create(Hero.prototype);
Amala.prototype.constructor = Amala;

// image property MUST be defined in prototype
Amala.prototype.image = 'characters/amala/amala.png';
Amala.prototype.say();