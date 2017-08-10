function Arrow(map, x, y) {
  Hero.call(this, map, x, y);
}

Arrow.prototype = Object.create(Hero.prototype);
Arrow.prototype.constructor = Arrow;
console.log();
// image property MUST be defined in prototype
Arrow.prototype.image = 'characters/arrow/arrow.png';
Arrow.SPEED = 500;
Hero.prototype.say = function () {

  const name = this.name || this.constructor.name;
  const voice = this.voice;
  const msg = new SpeechSynthesisUtterance();

  this.getVoices(function (voices) {
    msg.text = 'HI! Choose your hero ';
    msg.voice = voices.find(function (item) {
      return item.name === voice;
    });
    speechSynthesis.speak(msg);
    console.log(voices)
  });
};