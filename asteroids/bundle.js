/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const GameView = __webpack_require__(1);

window.GameView = GameView;

document.addEventListener("DOMContentLoaded", function(event) {
  let canvas = document.getElementById("game-canvas");
  let ctx = canvas.getContext('2d');
  const view = new GameView(ctx);
  view.start();
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(3);


function GameView(ctx) {
  this.ctx = ctx;
  this.game = new Game();
}

GameView.prototype.bindKeyHandlers = function(){
  key('space', () => this.game.ship.fireBullet());
  key('a', () => this.game.ship.power([-1,0]));
  key('d', () => this.game.ship.power([1, 0]));
  key('w', () => this.game.ship.power([0,-1]));
  key('s', () => this.game.ship.power([0, 1]));
}

GameView.prototype.start = function() {
  const game =  this.game;
  const ctx = this.ctx;
  this.bindKeyHandlers();
  setInterval(function(){
    game.draw(ctx);
    game.step();
  }, 20);
};

module.exports = GameView;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(5);
const MovingObject = __webpack_require__(4);
const Ship = __webpack_require__(6);

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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Asteroid = __webpack_require__(2);
const Ship = __webpack_require__(6);

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


/***/ }),
/* 4 */
/***/ (function(module, exports) {

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


/***/ }),
/* 5 */
/***/ (function(module, exports) {

const Util = {
  inherits (childClass, parentClass) {
    function Surrogate() {}
    Surrogate.prototype = parentClass.prototype;
    childClass.prototype = new Surrogate();
    childClass.prototype.constructor = childClass;
    },
      // Return a randomly oriented vector with the given length.
    randomVec (length) {
      const deg = 2 * Math.PI * Math.random();
      return Util.scale([Math.sin(deg), Math.cos(deg)], length);
    },
    // Scale the length of a vector by the given amount.
    scale (vec, m) {
      return [vec[0] * m, vec[1] * m];
    }
};

module.exports = Util;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(5);
const MovingObject = __webpack_require__(4);
const Bullet = __webpack_require__(7);

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
  // this.game.bullets.push(bullet);
  console.log(this.game);
  this.game.add(bullet);
  // this.game.allObjects.push(bullet);
};

Ship.prototype.power = function (impulse) {
  this.vx += impulse[0];
  this.vy += impulse[1];
};

Ship.COLOR = '#AAAA33';
Ship.RADIUS = 150;


module.exports = Ship;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(5);
const MovingObject = __webpack_require__(4);
const Asteroid = __webpack_require__(2);

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


/***/ })
/******/ ]);