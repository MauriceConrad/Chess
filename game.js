"use strict";
var fs = require("fs");
var chess = require("chessboard-engine");

var game = new chess.Game();

var res = game.move({
  from: "a2",
  to: "a4",
  rules: true,
  test: false
});

console.log(res);

console.log(game.print());

console.log("attacks for A6", game.getAttacks("a6"));
console.log("targets for C4", game.getTargets("b1"));

fs.writeFile(__dirname + "/game.svg", game.exportSVG())
