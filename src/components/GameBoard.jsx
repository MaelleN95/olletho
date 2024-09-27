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
  }, []);

  /**
   *  Check if the board is full
   * @param {Array} boardState The current state of the board
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
   * @param {Array} boardState The current state of the board
   * @returns {boolean} True if the player has at least one valid move, false otherwise
   */
  const canPlayerMakeMove = (player) => {
    // for (let row = 0; row < 8; row++) {
    //   for (let col = 0; col < 8; col++) {
    //     if (player === 1 || player === 2) {
    //       return true;
    //     }
    //   }
    // }
    return true;
  };

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
   * Check if the game is over
   * @param {Array} boardState The current state of the board
   * @returns {boolean} True if the game is over, false otherwise
   * */
  const checkGameOver = (boardState) => {
    if (isBoardFull(boardState)) {
      return true;
    } else if (!canPlayerMakeMove(1) && !canPlayerMakeMove(2)) {
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
   * @param {Array} boardState The current state of the board
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
   * @param {Array} boardState The current state of the board
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
   * @param {Array} newBoardState The new state of the board
   * @param {Array} adversePiecesToFlip The pieces to flip
   * @param {number} player The player making the move
   */
  const flipPieces = (newBoardState, adversePiecesToFlip, player) => {
    adversePiecesToFlip.forEach(([row, col]) => {
      newBoardState[row][col] = player;
    });
  };

  /**
   * Check if the move is valid
   * @param {number} row The row index of the cell where the move is made
   * @param {number} col The column index of the cell where the move is made
   * @param {number} player The player making the mov
   * @returns {boolean} True if the move is valid, false otherwise
   */
  const isValidMove = (row, col, player) => {
    // Check if the cell is empty
    if (boardState[row][col] !== 0) {
      console.log('cell is not empty');
      return false;
    }

    // Copy the board state
    let newBoardState = boardState.map((row) => row.slice());
    let newFlippedPieces = [];

    // Find valid directions
    const validDirections = findValidDirections(row, col, player, boardState);

    // If there are no valid directions, the move is invalid
    if (validDirections.length === 0) {
      console.log('Invalid move - no valid directions');
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

    // If there are pieces to flip, execute the move
    if (newFlippedPieces.length > 0) {
      // Place the player's piece on the board
      newBoardState[row][col] = player;
      // Flip the adverse pieces
      flipPieces(newBoardState, newFlippedPieces, player);

      // Update the game state
      setPlayer(3 - player);
      setLastMove([row, col]);
      setFlippedPieces(newFlippedPieces);
      setBoardState(newBoardState);
      return true;
    } else {
      console.log('Invalid move - no pieces to flip');
      return false;
    }
  };

  /**
   * Process the move
   * @param {number} row The row index of the cell where the move is made
   * @param {number} col The column index of the cell where the move is made
   */
  const managePlayerMove = (row, col) => {
    if (canPlayerMakeMove(player)) {
      isValidMove(row, col, player, boardState);
      // Check if the game is over
      if (checkGameOver(boardState)) {
        console.log('Game Over - Board is full');
        const [winner, blackPieces, whitePieces] = checkWinner(boardState);
        console.log('Winner is ', winner);
        console.log('Black pieces: ', blackPieces);
        console.log('White pieces: ', whitePieces);
      }
    } else if (!canPlayerMakeMove(1) && !canPlayerMakeMove(2)) {
      console.log('Game Over - No valid moves for both players');
      const [winner, blackPieces, whitePieces] = checkWinner(boardState);
      console.log('Winner is ', winner);
      console.log('Black pieces: ', blackPieces);
      console.log('White pieces: ', whitePieces);
    } else if (!canPlayerMakeMove(player)) {
      console.log(
        'No valid moves for player ',
        player === 1 ? 'black' : 'white'
      );
      setPlayer(3 - player);
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
