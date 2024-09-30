/**
 * Initialize the board with the starting pieces
 * @returns {Array<Array<number>>} The initialized board state
 */
export const initializeBoard = () => {
    const newBoardState = Array(8).fill().map(() => Array(8).fill(0));
    newBoardState[3][3] = 2;
    newBoardState[3][4] = 1;
    newBoardState[4][3] = 1;
    newBoardState[4][4] = 2;
  
    return newBoardState;
  };
  

/**
 *  Check if the board is full
 * @param {Array<Array<number>>} boardState The current state of the board
 * @returns {boolean} True if the board is full, false otherwise
 */
const isBoardFull = (boardState) => {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (boardState[row][col] === 0) {
        return false;
      }
    }
  }
  return true;
};

/**
 * Check if a player has any valid moves available
 * @param {number} player The player to check
 * @param {Array<Array<number>>} boardState The current state of the board
 * @returns {boolean} True if the player has at least one valid move, false otherwise
 */
export const canPlayerMakeMove = (player, boardState) => {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const { validMove } = validMoves(row, col, player, boardState);
      if (validMove) {
        return true;
      }
    }
  }
  return false;
};

/**
 * Check who is the winner of the game
 * @param {Array<Array<number>>} boardState The current state of the board
 * @returns {Array} An array containing the winner and the number of black and white pieces
 */
export const checkWinner = (boardState) => {
  let blackPieces = 0;
  let whitePieces = 0;

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (boardState[row][col] === 1) {
        blackPieces++;
      } else if (boardState[row][col] === 2) {
        whitePieces++;
      }
    }
  }

  if (blackPieces > whitePieces) {
    return ['black', blackPieces, whitePieces];
  } else if (whitePieces > blackPieces) {
    return ['white', blackPieces, whitePieces];
  } else {
    return ['draw', blackPieces, whitePieces];
  }
};

/**
 * Check if the game is over (i.e., the board is full or if both players can't make a move)
 * @param {Array<Array<number>>} boardState The current state of the board
 * @returns {boolean} True if the game is over, false otherwise
 * */
export const checkGameOver = (boardState) => {
  if (isBoardFull(boardState)) {
    return true;
  } else if (
    !canPlayerMakeMove(1, boardState) &&
    !canPlayerMakeMove(2, boardState)
  ) {
    return true;
  }
  return false; // La partie continue
};

/**
 * Check if the cell is out of bounds
 * @param {number} row The row index of the cell
 * @param {number} col The column index of the cell
 * @returns {boolean} True if the cell is out of bounds, false otherwise
 */
const isOutOfBounds = (row, col) => {
  return row < 0 || row > 7 || col < 0 || col > 7;
};

/**
 * Find valid directions for a given cell
 * @param {number} row The row index of the cell
 * @param {number} col The column index of the cell
 * @param {number} player The player making the move
 * @param {Array<Array<number>>} boardState The current state of the board
 * @returns {Array} An array of valid directions
 */
const findValidDirections = (row, col, player, boardState) => {
  let validDirections = [];

  // Create array of directions to check for valid moves
  const directions = [
    { row: -1, col: -1 }, // top left
    { row: -1, col: 0 }, // top
    { row: -1, col: 1 }, // top right
    { row: 0, col: -1 }, // left
    { row: 0, col: 1 }, // right
    { row: 1, col: -1 }, // bottom left
    { row: 1, col: 0 }, // bottom
    { row: 1, col: 1 }, // bottom right
  ];

  directions.forEach(({ row: directionRow, col: directionCol }) => {
    let checkRow = row + directionRow;
    let checkCol = col + directionCol;

    if (
      !isOutOfBounds(checkRow, checkCol) &&
      boardState[checkRow][checkCol] === 3 - player
    ) {
      validDirections.push([directionRow, directionCol]);
    }
  });
  return validDirections;
};

/**
 * Find flippable pieces for a given direction
 * @param {number} row The row index of the cell
 * @param {number} col The column index of the cell
 * @param {Array} direction The direction to check
 * @param {number} player The player making the move
 * @param {Array<Array<number>>} boardState The current state of the board
 * @returns {Array} An array of flippable pieces
 */
const findFlippablePiecesForOneDirection = (
  row,
  col,
  direction,
  player,
  boardState
) => {
  const [directionRow, directionCol] = direction;
  let currentRow = row + directionRow;
  let currentCol = col + directionCol;
  let piecesToFlip = [];

  while (
    !isOutOfBounds(currentRow, currentCol) &&
    boardState[currentRow][currentCol] === 3 - player
  ) {
    // Add the adverse piece to the list of pieces to flip
    piecesToFlip.push([currentRow, currentCol]);
    // Move to the next cell in the direction
    currentRow += directionRow;
    currentCol += directionCol;
  }

  // If we find a piece of the player at the end of the direction, return flippable pieces
  if (
    !isOutOfBounds(currentRow, currentCol) &&
    boardState[currentRow][currentCol] === player
  ) {
    return piecesToFlip;
  }

  // Otherwise, return an empty array
  return [];
};

/**
 * Flip the pieces in the given directions
 * @param {Array<Array<number>>} newBoardState The new state of the board
 * @param {Array} adversePiecesToFlip The pieces to flip
 * @param {number} player The player making the move
 */
export const flipPieces = (newBoardState, adversePiecesToFlip, player) => {
  adversePiecesToFlip.forEach(([row, col]) => {
    newBoardState[row][col] = player;
  });
};

/**
 * Check if a move is valid
 *
 * @param {number} row - The row index of the cell being evaluated for a move.
 * @param {number} col - The column index of the cell being evaluated for a move.
 * @param {number} player - The identifier for the player making the move (e.g., 1 or 2).
 * @param {Array<Array<number>>} boardState - The current state of the game board
 *
 * @returns {Object} An object indicating whether the move is valid and, if so, the positions of the valid move and any flipped pieces.
 *                  - validMove: {boolean} Indicates if the move is valid.
 *                  - validMovesPositions: {Array<number>} The [row, col] of the attempted move if valid.
 *                  - flippedPieces: {Array<Array<number>>} An array containing arrays of the positions of flipped pieces
 */
export const validMoves = (row, col, player, boardState) => {
  // Check if the cell is out of bounds
  if (isOutOfBounds(row, col)) {
    return false;
  }

  // Check if the cell is empty
  if (boardState[row][col] !== 0) {
    return false;
  }

  // Copy the board state
  let newFlippedPieces = [];

  // Find valid directions
  const validDirections = findValidDirections(row, col, player, boardState);

  // If there are no valid directions, the move is invalid
  if (validDirections.length === 0) {
    return false;
  }

  // Check for flippable pieces in each valid direction
  validDirections.forEach((direction) => {
    const flippablePieces = findFlippablePiecesForOneDirection(
      row,
      col,
      direction,
      player,
      boardState
    );

    if (flippablePieces.length > 0) {
      newFlippedPieces.push(...flippablePieces);
    }
  });

  // If there are pieces to flip, the move is valid
  if (newFlippedPieces.length > 0) {
    return {
      validMove: true,
      validMovesPositions: [row, col],
      flippedPieces: [newFlippedPieces],
    };
  } else {
    return { validMove: false };
  }
};

