//
// Keyboard handler
//

var Keyboard = {};


Keyboard.LEFT = 37;
Keyboard.RIGHT = 39;
Keyboard.UP = 38;
Keyboard.DOWN = 40;

Keyboard._keys = {};


Keyboard.listenForEvents = function (keys) {

  window.addEventListener('keydown', this._onKeyDown.bind(this));
  window.addEventListener('keyup', this._onKeyUp.bind(this));

  keys.forEach(function (key) {

    this._keys[key] = false;
  }.bind(this));
};


Keyboard._onKeyDown = function (event) {

  var keyCode = event.keyCode;
  if (keyCode in this._keys) {
    event.preventDefault();
    this._keys[keyCode] = true;
  }
};


Keyboard._onKeyUp = function (event) {

  var keyCode = event.keyCode;
  if (keyCode in this._keys) {
    event.preventDefault();
    this._keys[keyCode] = false;
  }
};


Keyboard.isDown = function (keyCode) {

  if (!keyCode in this._keys) {
    throw new Error('Keycode ' + keyCode + ' is not being listened to');
  }

  return this._keys[keyCode];
};


Keyboard.clear = function () {

  var keys = Object.keys(Keyboard._keys);

  for (var i = 0; i < keys.length; i++) {
    Keyboard._keys[keys[i]] = false;
  }
};
