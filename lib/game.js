'use strict';


//
// Game constructor
//
function Game(maps, characters) {

  this.maps = maps;
  this.currentMapIdx = 0;

  this.characters = characters;
  this.currentCharacterIdx = 0;

  this.canvas = document.createElement('canvas');
  this.canvas.width = 512;
  this.canvas.height = 512;

  this.ctx = this.canvas.getContext('2d');

  this._previousElapsed = 0;
}


//
// Append game canvas to given element.
//
Game.prototype.appendTo = function (el) {

  el.appendChild(this.canvas);
};


//
// Run the Game
//
// This will `load` the necessary assets, and when ready it will invoke `init`
// and register the `tick` handler to run before the next repaint.
//
Game.prototype.run = function () {

  var p = this.load();

  Promise.all(p).then(function (loaded) {

    this.init();
    window.requestAnimationFrame(this.tick.bind(this));
  }.bind(this));
};


//
// Assets loader
//
Game.prototype.load = function () {

  let images = [];

  for (let i = 0; i < this.characters.length; i++) {
    images.push(
      Loader.loadImage(this.characters[i].name, this.characters[i].prototype.image)
    );
  }

  images = images.concat([Loader.loadImage('tiles', 'assets/tiles.png')]);

  return images;
};


//
// Initialise Game
//
// This will happen "after" all assets have been loaded. This function is
// invoked from within the `run()` method.
//
Game.prototype.init = function () {

  Keyboard.listenForEvents([
    Keyboard.LEFT,
    Keyboard.RIGHT,
    Keyboard.UP,
    Keyboard.DOWN
  ]);

  this.initMap();
};


Game.prototype.initMap = function () {

  Keyboard.clear();

  this.completed = false;

  var map = this.maps[this.currentMapIdx];

  map.addListener('complete', function () {

    alert('Level completed!');
    this.completed = true;
  }.bind(this));

  this.tileAtlas = Loader.getImage('tiles');

  const HeroConstructor = this.characters[this.currentCharacterIdx];
  this.hero = new HeroConstructor(map, 160, 160);
  this.camera = new Camera(map, 512, 512);
  this.camera.follow(this.hero);
};


//
// The `tick()` method will be called for every animation frame. It is first
// invoked via `window.requestAnimationFrame()` from the `run` method, end then
// it will again use `window.requestAnimationFrame()` to make sure it is invoked
// again in the next frame.
//
// Arguments:
//
// * `elapsed` (_DOMHighResTimeStamp_): indicates the current time (the time
//   returned from performance.now() ) for when requestAnimationFrame starts to
//   fire callbacks.
//
Game.prototype.tick = function (elapsed) {

  if (this.completed) {
    if (++this.currentMapIdx === this.maps.length) {
      return alert('Well done! All levels completed!');
    }
    this.initMap();
  }

  window.requestAnimationFrame(this.tick.bind(this));

  // clear previous frame
  this.ctx.clearRect(0, 0, 512, 512);

  // compute delta time in seconds -- also cap it
  var delta = (elapsed - this._previousElapsed) / 1000.0;
  delta = Math.min(delta, 0.25); // maximum delta of 250 ms
  this._previousElapsed = elapsed;

  this.update(delta);
  this.render();
};


//
// Update game!
//
// This method is invoked by `tick()`, so it will run for every frame. This
// method is responsible for "moving" the "hero" based on keyboard input and
// "updating" the camera viewpoint to follow the "hero".
//
// Arguments:
//
// * `delta` (_Number_): time in seconds since last frame.
//
Game.prototype.update = function (delta) {

  // handle hero movement with arrow keys
  var dirx = 0;
  var diry = 0;

  if (Keyboard.isDown(Keyboard.LEFT)) {
    dirx = -1;
  }
  else if (Keyboard.isDown(Keyboard.RIGHT)) {
    dirx = 1;
  }
  else if (Keyboard.isDown(Keyboard.UP)) {
    diry = -1;
  }
  else if (Keyboard.isDown(Keyboard.DOWN)) {
    diry = 1;
  }

  this.hero.move(delta, dirx, diry);
  this.camera.update();
};


//
// Render game into the canvas.
//
Game.prototype.render = function () {

  // draw map background layer
  this._drawLayer(0);

  // draw main character
  this.ctx.drawImage(
    this.hero.image,
    this.hero.screenX - this.hero.width / 2,
    this.hero.screenY - this.hero.height / 2
  );

  // draw map top layer
  this._drawLayer(1);
};


//
// Draw a given layer into the canvas.
//
// Arguments:
//
// * `layer` (_Number_): The layer index.
//
Game.prototype._drawLayer = function (layer) {

  var map = this.maps[this.currentMapIdx];
  var startCol = Math.floor(this.camera.x / map.tsize);
  var endCol = startCol + (this.camera.width / map.tsize);
  var startRow = Math.floor(this.camera.y / map.tsize);
  var endRow = startRow + (this.camera.height / map.tsize);
  var offsetX = -this.camera.x + startCol * map.tsize;
  var offsetY = -this.camera.y + startRow * map.tsize;

  for (var c = startCol; c <= endCol; c++) {
    for (var r = startRow; r <= endRow; r++) {
      var tile = map.getTile(layer, c, r);
      var x = (c - startCol) * map.tsize + offsetX;
      var y = (r - startRow) * map.tsize + offsetY;
      if (tile !== 0) { // 0 => empty tile
        this.ctx.drawImage(
          this.tileAtlas, // image
          (tile - 1) * map.tsize, // source x
          0, // source y
          map.tsize, // source width
          map.tsize, // source height
          Math.round(x),  // target x
          Math.round(y), // target y
          map.tsize, // target width
          map.tsize // target height
        );
      }
    }
  }
};


window.Game = Game;
