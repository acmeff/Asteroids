const Util = require('./util');
const MovingObject = require('./moving_object');
const Bullet = require('./bullet');

function Ship(options) {
  options.color = Ship.COLOR;
  options.radius = Ship.RADIUS;
  options.vel = [0,0];

  MovingObject.call(this, options);
}
Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function() {
  [this.x, this.y] = this.game.randomPosition();
  [this.vx, this.vy] = [0,0];
};

Ship.prototype.fireBullet = function() {
  let bullet = new Bullet({pos: [this.x, this.y], vel: [this.vx*5, this.vy*5]});
  this.game.bullets.push(bullet);
};

Ship.prototype.power = function (impulse) {
  this.vx += impulse[0];
  this.vy += impulse[1];
};

Ship.COLOR = '#AAAA33';
Ship.RADIUS = 150;


module.exports = Ship;
