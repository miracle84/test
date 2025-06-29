const { createBoard, checkWin, isBoardFull, findWinningMove } = require('./logic');

describe('TicTacToe logic', () => {
  test('checkWin detects horizontal wins', () => {
    const board = createBoard(3);
    board[0][0] = 'X';
    board[0][1] = 'X';
    board[0][2] = 'X';
    expect(checkWin(board, 0, 1, 'X', 3)).toBe(true);
  });

  test('checkWin detects diagonal wins', () => {
    const board = createBoard(4);
    board[0][0] = 'O';
    board[1][1] = 'O';
    board[2][2] = 'O';
    board[3][3] = 'O';
    expect(checkWin(board, 3, 3, 'O', 4)).toBe(true);
  });

  test('isBoardFull returns true when no empty cells', () => {
    const board = createBoard(2);
    board[0][0] = 'X';
    board[0][1] = 'O';
    board[1][0] = 'X';
    board[1][1] = 'O';
    expect(isBoardFull(board)).toBe(true);
  });

  test('findWinningMove finds winning move', () => {
    const board = createBoard(3);
    board[0][0] = 'X';
    board[0][1] = 'X';
    const move = findWinningMove(board, 'X', 3);
    expect(move).toEqual({ r: 0, c: 2 });
  });
});
