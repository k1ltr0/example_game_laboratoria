'use strict';


window.addEventListener('load', function() {

    // princess
    var game = new Game([
        new ExampleMap1(),
        new ExampleMap2(),
        new ExampleMap3()
    ], [
        //Princess
        //Hero
        Fox
    ]);


    game.appendTo(document.body);
    game.run();

});