window.addEventListener("load", function() {
  var chessboard = document.getElementsByClassName("chessboard")[0];
  var game = new Chess.Game();
  ChessboardInteract(chessboard, game);
  var editContainer = document.getElementsByClassName("rules-edit")[0];
  var editor = new JSONEditor(editContainer, {

  });
  editor.set(game.rules);
  var btnUpdateRules = document.getElementsByClassName("btn-update-rules")[0];
  btnUpdateRules.addEventListener("click", function() {
    game.rules = editor.get();
  });
  window.addEventListener("resize", resizer);
  function resizer() {
    chessboard.style.width = ((window.innerWidth <= window.innerHeight ? window.innerWidth : window.innerHeight) - 10) + "px";
    chessboard.style.height = ((window.innerWidth <= window.innerHeight ? window.innerWidth : window.innerHeight) - 10) + "px";
  }
  resizer();
  window.addEventListener("touchend", function() {
    event.preventDefault();
  });
});
function ChessboardInteract(e, game) {
  window.addEventListener("click", function() {

  });
  var rows = e.getElementsByClassName("row");
  for (var i = 0; i < rows.length; i++) {
    rows[i].index = i;
    var fields = rows[i].getElementsByTagName("li");
    for (var a = 0; a < fields.length; a++) {
      fields[a].field = [rows[i].getAttribute("data-row"), 8 - a];
      fields[a].coords = [i, a];
      fields[a].index = a;
      multiClick(fields[a], function() {
        var piece = getPiece(this);
        var rows = e.getElementsByClassName("row");
        if (e.getElementsByClassName("active").length === 0) {
          var field = this.field;
          var attacks = game.getAttacks(field[0] + field[1]);
          var targets = game.getTargets(field[0] + field[1]);
          removeTargets();
          if (piece != false || piece === 0) {
            this.classList.add("active");
            for (var i = 0; i < targets.length; i++) {
              var target = rows[targets[i].coords[0]].getElementsByTagName("li")[targets[i].coords[1]];
              target.classList.add("target");
            }
          }
          for (var i = 0; i < attacks.length; i++) {
            var attacker = rows[attacks[i].coords[0]].getElementsByTagName("li")[attacks[i].coords[1]];
            attacker.classList.add("attacker");
          }
        }
        else {
          var activeField = e.getElementsByClassName("active")[0];
          var from = activeField.field;
          var to = this.field;
          var res = game.move({
            from: from[0] + from[1],
            to: to[0] + to[1],
            rules: true
          });
          removeActiveProps();
          if (res.success === true) {
            var startPos = [activeField.offsetLeft, activeField.offsetTop];
            var targetPos = [this.offsetLeft, this.offsetTop];
            draw();
            var figureImg = this.getElementsByTagName("img")[0];
            figureImg.style.transform = 'translate(' + (startPos[0] - targetPos[0]) + 'px, ' + (startPos[1] - targetPos[1]) + 'px)';
            setTimeout(function() {figureImg.style.removeProperty('transform');}, 0);
          }
        }
      });
    }
  }
  draw();
  function draw() {
    var svgDir = "../node_modules/chessboard-engine/default/svg";
    var paths = {
      black: {
        pawn: svgDir + "/farmer-black.svg",
        rook: svgDir + "/tower-black.svg",
        knight: svgDir + "/jumper-black.svg",
        bishop: svgDir + "/runner-black.svg",
        king: svgDir + "/king-black.svg",
        queen: svgDir + "/queen-black.svg"
      },
      white: {
        pawn: svgDir + "/farmer-white.svg",
        rook: svgDir + "/tower-white.svg",
        knight: svgDir + "/jumper-white.svg",
        bishop: svgDir + "/runner-white.svg",
        king: svgDir + "/king-white.svg",
        queen: svgDir + "/queen-white.svg"
      }
    };
    var fields = e.getElementsByTagName("li");
    for (var i = 0; i < fields.length; i++) {
      var piece = getPiece(fields[i]);
      while (fields[i].childNodes.length > 0) {
        fields[i].removeChild(fields[i].childNodes[0]);
      }
      if (typeof piece != "boolean") {
        var img = document.createElement("img");
        var pieceObj = game.pieces[piece];
        img.src = paths[pieceObj.color][pieceObj.type];
        fields[i].appendChild(img);
      }
    }
  }
  function removeActiveProps() {
    e.getElementsByClassName("active")[0].classList.remove("active");
    removeTargets();
  }
  function removeTargets() {
    var currTargets = e.getElementsByTagName("li");
    var currAttacker = e.getElementsByTagName("li");
    for (var i = 0; i < currTargets.length; i++) {
      currTargets[i].classList.remove("target");
    }
    for (var i = 0; i < currTargets.length; i++) {
      currAttacker[i].classList.remove("attacker");
    }
  }
  function getPiece(e) {
    return game.board[e.field[0]][e.coords[1]]
  }
}
function multiClick(e, callback) {
  if (window.ontouchstart === undefined) {
    e.addEventListener("click", callback);
  }
  else {
    e.addEventListener("touchend", callback);
  }
}
