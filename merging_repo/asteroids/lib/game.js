const Asteroid = require('./asteroid.js');
const Ship = require('./ship.js');

function Game () {
  this.asteroids = [];
  this.addAsteroids();
  this.bullets = [];

  this.ship = new Ship({game: this, pos: this.randomPosition()});
  this.allObjects = this.asteroids.concat([this.ship]);
}

Game.DIM_X = 500;
Game.DIM_Y = 500;
Game.NUM_ASTEROIDS = 4;

Game.prototype.addAsteroids = function () {
  while (this.asteroids.length < Game.NUM_ASTEROIDS) {
    this.asteroids.push(
      new Asteroid(
        {game: this, pos: this.randomPosition()}
      )
    );
  }
};

// Game.prototype.allObjects = function() {
//   return this.asteroids.concat([this.ship]);
// };

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0,0,500,500);
  this.allObjects.forEach( function (a) {
    a.draw(ctx);
  });
};

Game.prototype.moveObjects = function () {
  this.allObjects.forEach( function (a) {
    a.move();
  });
};

Game.prototype.checkCollisions = function() {
  for (let i = 0; i < this.allObjects.length; i++){
    for (let j = i + 1; j < this.allObjects.length; j++){
      if (this.allObjects[i].isCollidedWith(this.allObjects[j])) {
        this.allObjects[i].collideWith(this.allObjects[j]);
      }
    }
  }
};

Game.prototype.remove = function(obj) {
  let objects = [];
  for (var i = 0; i < this.allObjects.length; i++) {
    if (this.allObjects[i].x  !== obj.x && this.allObjects[i].y !== obj.y) {
      objects.push(this.allObjects[i]);
    }
  }
  this.allObjects = objects;
};

Game.prototype.add = function(obj) {
  this.allObjects.push(obj);
};

Game.prototype.step = function() {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.wrap = function(pos) {
  const [x, y] = pos;
  return [(x + 500) % Game.DIM_X, (y + 500) % Game.DIM_Y];
};

Game.prototype.randomPosition = function () {
  let x = Math.random()*Game.DIM_X;
  let y = Math.random()*Game.DIM_Y;
  return [x, y];
};

module.exports = Game;
