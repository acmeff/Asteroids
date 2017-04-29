Function.prototype.inherits = function (Parent) {
  function Surrogate() {}
  Surrogate.prototype = Parent.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
};

function MovingObject (name) {
  this.name = name;
}

MovingObject.prototype.move = function() {
  console.log('moving around');
};

function Ship (name) {
  MovingObject.call(this,name);
}
Ship.inherits(MovingObject);

Ship.prototype.shoot = function() {
  console.log('boom');
};

function Asteroid () {}
Asteroid.inherits(MovingObject);

Asteroid.prototype.crash = function() {
  console.log('crash');
};

const m = new MovingObject();
const ship1 = new Ship("Shippy");
console.log(ship1)
const ast = new Asteroid();
