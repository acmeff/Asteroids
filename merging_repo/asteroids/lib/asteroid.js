const Util = require('./util');
const MovingObject = require('./moving_object');
const Ship = require('./ship');

function Asteroid(options) {
  options.color = Asteroid.COLOR;
  options.radius = Asteroid.RADIUS;
  options.vel = Util.randomVec(1);

  MovingObject.call(this, options);
}

Asteroid.COLOR = '#0000FF';
Asteroid.RADIUS = 20;

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.collideWith = function(otherObject){
  if (otherObject instanceof Ship) {
    otherObject.relocate();
  }
};


module.exports = Asteroid;
