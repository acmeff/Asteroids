const GameView = require('./lib/game_view.js');

window.GameView = GameView;

document.addEventListener("DOMContentLoaded", function(event) {
  let canvas = document.getElementById("game-canvas");
  let ctx = canvas.getContext('2d');
  const view = new GameView(ctx);
  view.start();
});
