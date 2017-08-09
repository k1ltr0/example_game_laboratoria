'use strict';


window.addEventListener('load', function () {

  var game = new Game([
    new ExampleMap0(),
    new ExampleMap1(),
    new ExampleMap2()
  ], [
    Selector,
    KnightHero,
    Brawly,
    Rita
    //Hero
  ]);

  game.appendTo(document.body);
  game.run();

});
