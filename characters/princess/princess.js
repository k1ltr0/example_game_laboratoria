function Princess(map, x, y) {
    Hero.call(this, map, x, y);
    this.name = 'la princesa';
    this.voice = 'Fiona';

}

Princess.prototype = Object.create(Hero.prototype);
Princess.prototype.constructor = Princess;




// image property MUST be defined in prototype
Princess.prototype.image = 'characters/princess/princess.png';
// Llama a la funcion say que viene de Hero
Princess.prototype.say();