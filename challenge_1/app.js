// Model

var spaces = document.getElementsByClassName('space');
var rows = document.getElementsByClassName('row');

var board = [];
var turn = {};


// Controllers

var makeMove = function(e) {
  var coords = [Number(e.target.id[0]), Number(e.target.id[1])];
  var move = turn.whose ? 1 : -1;
  board[coords[0]][coords[1]] = move;
}

var _statusCheck = function() {
  for (var i = 0; i < 3; i++) {
    var rowSum = board[i][0] + board[i][1] + board[i][2];
    var colSum = board[0][i] + board[1][i] + board[2][i];
    var diagSum = board[0][i] + board[1][1] + board[2][2 - i];

    if (rowSum === 3 || colSum === 3 || diagSum === 3) {
      return 'X wins';
    } else if (rowSum === -3 || colSum === -3 || diagSum === -3) {
      return 'O wins';
    }
  }

  if (!board.flat().includes(null)) {
    return 'It\'s a tie';
  }

  return null;
}

var checkForEnd = function(e) {
  var status = _statusCheck();
  if (status) {
    document.getElementById('winner').innerHTML = status;
  }
}

var resetBoard = function() {
  board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
}

var resetTurn = function() {
  turn = {
    true: '|X|',
    false: '|O|',
    whose: true
  };
}

// Views

var toggleSpace = function(e) {
  e.target.innerHTML = turn[turn.whose];
  turn.whose = !turn.whose;
}

var resetView = function() {
  for (var i = 0; i < spaces.length; i++) {
    spaces[i].style.display = "inline-block";
    spaces[i].innerHTML = '|_|';
  }
  document.getElementById('winner').innerHTML = '';
}


// Initialize

var reset = function() {
  resetBoard();
  resetView();
  resetTurn();
}

for (var i = 0; i < rows.length; i++) {
  rows[i].style.display = "block";

  rows[i].onclick = function(e) {
    if (e.target.innerHTML === '|_|') {
      makeMove(e);
      toggleSpace(e);
    }
  }
}

document.onclick = checkForEnd;
document.getElementById('reset').onclick = reset;
reset();
