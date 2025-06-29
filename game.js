let sizeInput = document.getElementById('size');
let winInput = document.getElementById('win-length');
let modeSelect = document.getElementById('mode');
let startBtn = document.getElementById('start');
let boardDiv = document.getElementById('board');
let statusDiv = document.getElementById('status');

let board = [];
let size = 3;
let winLength = 3;
let currentPlayer = 'X';
let mode = 'human';
let gameOver = false;

startBtn.addEventListener('click', startGame);

function startGame() {
  size = parseInt(sizeInput.value);
  winLength = parseInt(winInput.value);
  mode = modeSelect.value;
  currentPlayer = 'X';
  gameOver = false;
  board = [];
  boardDiv.style.gridTemplateColumns = `repeat(${size}, 50px)`;
  boardDiv.innerHTML = '';
  statusDiv.textContent = '';
  for (let i = 0; i < size; i++) {
    board[i] = [];
    for (let j = 0; j < size; j++) {
      board[i][j] = '';
      let cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.addEventListener('click', onCellClick);
      boardDiv.appendChild(cell);
    }
  }
  if (mode === 'cpu' && currentPlayer === 'O') {
    cpuMove();
  }
}

function onCellClick(e) {
  if (gameOver) return;
  let row = parseInt(e.target.dataset.row);
  let col = parseInt(e.target.dataset.col);
  if (board[row][col] !== '') return;
  makeMove(row, col, currentPlayer);
  if (checkWin(row, col, currentPlayer)) {
    statusDiv.textContent = `Player ${currentPlayer} wins!`;
    gameOver = true;
    return;
  }
  if (isBoardFull()) {
    statusDiv.textContent = 'Draw!';
    gameOver = true;
    return;
  }
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  if (mode === 'cpu' && currentPlayer === 'O') {
    cpuMove();
  }
}

function makeMove(row, col, player) {
  board[row][col] = player;
  const cells = boardDiv.children;
  let idx = row * size + col;
  cells[idx].textContent = player;
}

function checkWin(row, col, player) {
  function count(dx, dy) {
    let r = row + dx;
    let c = col + dy;
    let cnt = 0;
    while (r >= 0 && r < size && c >= 0 && c < size && board[r][c] === player) {
      cnt++; r += dx; c += dy;
    }
    return cnt;
  }
  const dirs = [[1,0], [0,1], [1,1], [1,-1]];
  for (let [dx,dy] of dirs) {
    let countTotal = 1 + count(dx,dy) + count(-dx,-dy);
    if (countTotal >= winLength) return true;
  }
  return false;
}

function isBoardFull() {
  for (let row of board) {
    for (let cell of row) {
      if (cell === '') return false;
    }
  }
  return true;
}

function cpuMove() {
  // simple strategy: win if possible, block if needed, else random
  let move = findWinningMove('O') || findWinningMove('X') || randomMove();
  if (move) {
    makeMove(move.r, move.c, 'O');
    if (checkWin(move.r, move.c, 'O')) {
      statusDiv.textContent = 'Computer wins!';
      gameOver = true;
      return;
    }
    if (isBoardFull()) {
      statusDiv.textContent = 'Draw!';
      gameOver = true;
      return;
    }
    currentPlayer = 'X';
  }
}

function findWinningMove(player) {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[i][j] === '') {
        board[i][j] = player;
        if (checkWin(i, j, player)) {
          board[i][j] = '';
          return { r: i, c: j };
        }
        board[i][j] = '';
      }
    }
  }
  return null;
}

function randomMove() {
  let empties = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[i][j] === '') empties.push({ r: i, c: j });
    }
  }
  if (empties.length === 0) return null;
  return empties[Math.floor(Math.random() * empties.length)];
}
