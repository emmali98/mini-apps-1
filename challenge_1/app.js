// Model
var board = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

var turn = {
  true: '|X|',
  false: '|O|',
  whose: true
};

// Controllers
var makeMove = function(e) {
  console.log(e.target.id);
}

// Views
var toggleSpace = function(e) {
  e.target.innerHTML = turn[turn.whose];
  turn.whose = !turn.whose;
}


// Structuring
var spaces = document.getElementsByClassName('space');
var rows = document.getElementsByClassName('row');

for (var i = 0; i < spaces.length; i++) {
  spaces[i].style.display = "inline-block";
}
for (var i = 0; i < rows.length; i++) {
  rows[i].style.display = "block";
  rows[i].onclick = function(e) {
    makeMove(e);
    toggleSpace(e);
  }
}
