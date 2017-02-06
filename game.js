"use strict";

var chess = require("chessboard");

var game = new chess.Game();

var res = game.move({
  from: "a2",
  to: "a7",
  rules: true,
  test: false
});

console.log(game.print());
console.log(res);

console.log(game.getAttacks("a7"));
