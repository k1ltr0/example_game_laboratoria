'use strict';


function Camera(map, width, height) {

  this.x = 0;
  this.y = 0;
  this.width = width;
  this.height = height;
  this.maxX = map.cols * map.tsize - width;
  this.maxY = map.rows * map.tsize - height;
}


Camera.prototype.follow = function (sprite) {

  this.following = sprite;
  sprite.screenX = 0;
  sprite.screenY = 0;
};


Camera.prototype.update = function () {

  const followingX = (typeof this.following.x === 'function') ? this.following.x() : this.following.x;
  const followingY = (typeof this.following.y === 'function') ? this.following.y() : this.following.y;

  // assume followed sprite should be placed at the center of the screen
  // whenever possible
  this.following.screenX = this.width / 2;
  this.following.screenY = this.height / 2;

  // make the camera follow the sprite
  this.x = followingX - this.width / 2;
  this.y = followingY - this.height / 2;
  // clamp values
  this.x = Math.max(0, Math.min(this.x, this.maxX));
  this.y = Math.max(0, Math.min(this.y, this.maxY));

  // in map corners, the sprite cannot be placed in the center of the screen
  // and we have to change its screen coordinates

  // left and right sides
  if (followingX < this.width / 2 || followingX > this.maxX + this.width / 2) {
    this.following.screenX = followingX - this.x;
  }

  // top and bottom sides
  if (followingY < this.height / 2 || followingY > this.maxY + this.height / 2) {
    this.following.screenY = followingY - this.y;
  }
};


window.Camera = Camera;
