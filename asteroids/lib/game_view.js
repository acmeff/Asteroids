const Game = require('./game');


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
