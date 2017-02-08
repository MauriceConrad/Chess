"use strict";

var chess = require("chessboard-engine");

var game = new chess.Game();

var res = game.move({
  from: "a2",
  to: "a6",
  rules: false,
  test: false
});

console.log(game.print());

console.log("attacks", game.getAttacks("f6"));
console.log("targets", game.getTargets("a6"));
