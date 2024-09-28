import { useState, useEffect } from 'react';
import Cell from './Cell.jsx';
import '../styles/gameboard.css';

function GameBoard() {
  // Create an 8x8 array each initialized to 0
  const [boardState, setBoardState] = useState(
    Array(8)
      .fill()
      .map(() => Array(8).fill(0))
  );

  const [player, setPlayer] = useState(1);

  const [lastMove, setLastMove] = useState(null);
  const [flippedPieces, setFlippedPieces] = useState([]);

  /**
   * Initialize the board with the starting pieces
   */
  const initializeBoard = () => {
    const newBoardState = boardState.map((row) => row.slice());
    newBoardState[3][3] = 2;
    newBoardState[3][4] = 1;
    newBoardState[4][3] = 1;
    newBoardState[4][4] = 2;

    // for testing
    // newBoardState[4][5] = 2;
    // newBoardState[2][2] = 2;
    // newBoardState[1][2] = 2;
    // newBoardState[0][2] = 1;
    // newBoardState[0][3] = 2;
    // newBoardState[0][4] = 2;
    // newBoardState[0][5] = 2;
    // newBoardState[0][6] = 2;
    // newBoardState[0][7] = 2;
    // newBoardState[1][7] = 2;
    // newBoardState[2][7] = 2;
    // newBoardState[3][7] = 2;
    // newBoardState[4][7] = 2;
    // newBoardState[5][7] = 2;
    // newBoardState[6][7] = 2;
    // newBoardState[7][7] = 2;
    // newBoardState[7][6] = 2;
    // newBoardState[7][5] = 2;
    // newBoardState[7][4] = 2;
    // newBoardState[7][3] = 2;
    // newBoardState[7][2] = 2;
    // newBoardState[7][1] = 2;
    // newBoardState[7][0] = 2;
    // newBoardState[6][0] = 1;
    // newBoardState[5][0] = 1;
    // newBoardState[4][0] = 1;
    // newBoardState[3][0] = 1;
    // newBoardState[2][0] = 1;
    // newBoardState[1][0] = 1;
    // newBoardState[1][1] = 2;
    // newBoardState[2][1] = 2;
    // newBoardState[3][1] = 2;
    // newBoardState[4][1] = 2;
    // newBoardState[5][1] = 2;
    // newBoardState[6][1] = 2;
    // newBoardState[6][2] = 2;

    setBoardState(newBoardState);
  };

  // Initialize the board
  useEffect(() => {
    initializeBoard();
    // eslint-disable-next-line
  }, []);

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
  const canPlayerMakeMove = (player, boardState) => {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const { validMove } = validMoves(row, col, player, boardState);
        if (validMove) {
          return true;
        }
      }
    }
    return true;
  };

  /**
   * Check who is the winner of the game
   * @param {Array<Array<number>>} boardState The current state of the board
   * @returns {Array} An array containing the winner and the number of black and white pieces
   */
  const checkWinner = (boardState) => {
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
  const checkGameOver = (boardState) => {
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
  const flipPieces = (newBoardState, adversePiecesToFlip, player) => {
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
  const validMoves = (row, col, player, boardState) => {
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

  /**
   * Execute the move for the current player
   * @param {number} row The row index where the player wants to move
   * @param {number} col The column index where the player wants to move
   * @param {number} player The player making the move
   * @returns {Object} An object indicating whether the move was executed and the new board state
   */
  const executeMove = (row, col, player) => {
    // Check if the move is valid and get the list of flippable pieces
    const { validMove, flippedPieces } = validMoves(
      row,
      col,
      player,
      boardState
    );

    // If the move is invalid, do nothing
    if (!validMove) {
      return { moveExecuted: false };
    }

    // Make a copy of the current board state
    let newBoardState = boardState.map((row) => row.slice());

    // Place the player's piece on the selected cell
    newBoardState[row][col] = player;

    // Flip the pieces
    flipPieces(newBoardState, flippedPieces[0], player);

    // Update the board state
    setBoardState(newBoardState);

    // Store the last move
    setLastMove([row, col]);

    // Set the flipped pieces for visual effect
    setFlippedPieces(flippedPieces[0]);

    return { moveExecuted: true, newBoardState };
  };

  /**
   * Manage the player turn logic
   * @param {number} row The row index where the player wants to move
   * @param {number} col The column index where the player wants to move
   */
  const managePlayerMove = (row, col) => {
    // Try to execute the game logic for the current player
    const { moveExecuted, newBoardState } = executeMove(row, col, player);

    // If the move was successful, attempt to switch to the other player
    if (moveExecuted) {
      const nextPlayer = 3 - player; // Switch to the other player
      // Check if the game is over
      const gameOver = checkGameOver(newBoardState);

      if (gameOver) {
        console.log('Game Over');
        const [winner, blackPieces, whitePieces] = checkWinner(boardState);
        console.log('Winner is ', winner);
        console.log('Black pieces: ', blackPieces);
        console.log('White pieces: ', whitePieces);
        return;
      }

      // Check if the next player has any valid moves
      if (canPlayerMakeMove(nextPlayer, newBoardState)) {
        // Switch to the next player if they can move
        setPlayer(nextPlayer);
      } else if (canPlayerMakeMove(player, newBoardState)) {
        // If the next player can't move, keep the current player
        console.log(
          `Player ${
            nextPlayer === 1 ? 'black' : 'white'
          } has no valid moves. Player ${
            player === 1 ? 'black' : 'white'
          } continues.`
        );
      }
    } else {
      console.log('Invalid move');
    }
  };

  return (
    <>
      <p>C&apos;est au tour du joueur {player === 1 ? 'noir' : 'blanc'}</p>
      <div id="board">
        {boardState.map((row, rowIndex) =>
          row.map((cellValue, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              cellValue={cellValue}
              onClick={() => managePlayerMove(rowIndex, colIndex, player)}
              isLastMove={
                lastMove && lastMove[0] === rowIndex && lastMove[1] === colIndex
              }
              isFlipped={flippedPieces.some(
                ([flippedirectionRow, flippedirectionCol]) =>
                  flippedirectionRow === rowIndex &&
                  flippedirectionCol === colIndex
              )}
            />
          ))
        )}
      </div>
    </>
  );
}

export default GameBoard;
