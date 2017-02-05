"use strict";

var chess = require("chess");

var game = new chess.Game();

var res = game.move({
  from: "d2",
  to: "c7",
  rules: false
});

console.log(game.print());
console.log(res);

//console.log(game.exportSVG());
