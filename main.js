'use strict';


window.addEventListener('load', function () {

  var game = new Game([
    new ExampleMap0(),
    new ExampleMap1(),
    new ExampleMap2(),
    new ExampleMap3(),
    new ExampleMap4()
  ], [
    flechaHero,
    vaneHero,
    WarriorHero,
    KnightHero

    //Hero
  ]);

  game.appendTo(document.body);
  game.run();

});
