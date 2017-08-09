window.addEventListener('load', function() {

    // princess
    var game = new Game([
        new ExampleMap0(),
        new ExampleMap1(),
        new ExampleMap2(),
        new ExampleMap3()
    ], [
        Arrow,
        Princess,
        KnightHero,
        Fox
    ]);


    game.appendTo(document.body);
    game.run();

});