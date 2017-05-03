'use strict';


function EventEmitter() {

  this.listeners = [];
}


EventEmitter.prototype.addListener = function (eventName, fn) {

  for (var i = 0; i < this.listeners.length; i++) {
    if (this.listeners[i][0] === eventName && this.listeners[i][1] === fn) {
      return false;
    }
  }

  this.listeners.push([eventName, fn]);
  return true;
};


EventEmitter.prototype.removeListener = function (eventName, fn) {

  for (var i = 0; i < this.listeners.length; i++) {
    if (this.listeners[i][0] === eventName && this.listeners[i][1] === fn) {
      this.listeners.splice(i, 1);
      return true;
    }
  }

  return false;
};


EventEmitter.prototype.emit = function (eventName, payload) {

  for (var i = 0; i < this.listeners.length; i++) {
    if (this.listeners[i][0] === eventName) {
      this.listeners[i][1](payload);
    }
  }
};


window.EventEmitter = EventEmitter;
