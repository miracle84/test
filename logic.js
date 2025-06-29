// Game logic separated for easier testing

function createBoard(size) {
  const board = [];
  for (let i = 0; i < size; i++) {
    board[i] = Array(size).fill('');
  }
  return board;
}

function checkWin(board, row, col, player, winLength) {
  const size = board.length;
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
  for (const [dx, dy] of dirs) {
    const total = 1 + count(dx, dy) + count(-dx, -dy);
    if (total >= winLength) return true;
  }
  return false;
}

function isBoardFull(board) {
  for (const row of board) {
    for (const cell of row) {
      if (cell === '') return false;
    }
  }
  return true;
}

function findWinningMove(board, player, winLength) {
  const size = board.length;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (board[r][c] === '') {
        board[r][c] = player;
        if (checkWin(board, r, c, player, winLength)) {
          board[r][c] = '';
          return { r, c };
        }
        board[r][c] = '';
      }
    }
  }
  return null;
}

if (typeof module !== 'undefined') {
  module.exports = { createBoard, checkWin, isBoardFull, findWinningMove };
} else {
  window.TicTacToeLogic = { createBoard, checkWin, isBoardFull, findWinningMove };
}
