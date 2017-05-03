'use strict';


function Map(opts) {

  EventEmitter.call(this);

  this.cols = opts.cols;
  this.rows = opts.rows;
  this.tsize = opts.tsize;
  this.layers = opts.layers;

  this.tileDefinitions = [
    {
      name: 'grass',
    },
    {
      name: 'dirt',
    },
    {
      name: 'tree',
      solid: true
    },
    {
      name: 'treetop',
    },
    {
      name: 'bush',
      solid: true
    },
    {
      name: 'prize',
      collectable: true,
      action: function (map) {

        map.emit('complete');
      }
    }
  ];
}


Map.prototype = Object.create(EventEmitter.prototype);
Map.prototype.constructor = Map;


Map.prototype.getTile = function (layer, col, row) {

  return this.layers[layer][row * this.cols + col];
};


Map.prototype.collide = function (x, y) {

  var col = Math.floor(x / this.tsize);
  var row = Math.floor(y / this.tsize);

  // tiles 3 and 5 are solid -- the rest are walkable
  // loop through all layers and return TRUE if any tile is solid
  return this.layers.reduce(function (res, layer, index) {

    var tile = this.getTile(index, col, row);
    var tileDefinition = this.tileDefinitions[tile - 1];

    if (tileDefinition && (tileDefinition.solid || tileDefinition.action)) {
      return tileDefinition;
    }

    return res;
  }.bind(this), null);
};


Map.prototype.isSolidTileAtXY = function (x, y) {

  var col = Math.floor(x / this.tsize);
  var row = Math.floor(y / this.tsize);

  // tiles 3 and 5 are solid -- the rest are walkable
  // loop through all layers and return TRUE if any tile is solid
  return this.layers.reduce(function (res, layer, index) {

    var tile = this.getTile(index, col, row);
    var isSolid = tile === 3 || tile === 5 || tile === 6;
    return res || isSolid;
  }.bind(this), false);
};


Map.prototype.getCol = function (x) {

  return Math.floor(x / this.tsize);
};


Map.prototype.getRow = function (y) {

  return Math.floor(y / this.tsize);
};


Map.prototype.getX = function (col) {

  return col * this.tsize;
};


Map.prototype.getY = function (row) {

  return row * this.tsize;
};
