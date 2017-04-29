const Util = require('./util');
const MovingObject = require('./moving_object');
const Asteroid = require('./asteroid');

function Bullet(options) {
  options.color = Bullet.COLOR;
  options.radius = Bullet.RADIUS;


  MovingObject.call(this, options);
}

Bullet.COLOR = '#FF00FF';
Bullet.RADIUS = 3;

Util.inherits(Bullet, MovingObject);

Bullet.prototype.collideWith = function(otherObject){
  if (otherObject instanceof Asteroid) {
    this.game.remove(otherObject);
  }
};


module.exports = Bullet;
