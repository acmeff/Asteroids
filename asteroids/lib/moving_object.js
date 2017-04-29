function MovingObject(options) {
  this.x = options.pos[0];
  this.y = options.pos[1];
  this.vx = options.vel[0];
  this.vy = options.vel[1];
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
}

MovingObject.prototype.draw = function (ctx) {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
  ctx.strokeStyle = this.color;
  ctx.stroke();
  ctx.fillStyle = this.color;
  ctx.fill();
};

MovingObject.prototype.move = function() {
  this.x += this.vx;
  this.y += this.vy;

  [this.x, this.y] = this.game.wrap([this.x, this.y]);
}

MovingObject.prototype.isCollidedWith = function(otherObject) {
  const dist = ((this.x - otherObject.x)**2 + (this.y - otherObject.y) **2)**(0.5);
  return (dist < (this.radius + otherObject.radius))
}

MovingObject.prototype.collideWith = function(otherObject) {
  // this.game.remove(this);
  // this.game.remove(otherObject);
}


module.exports = MovingObject;
