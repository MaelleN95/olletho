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

  const initializeBoard = () => {
    const newBoardState = boardState.map((row) => row.slice());
    newBoardState[3][3] = 2;
    newBoardState[3][4] = 1;
    newBoardState[4][3] = 1;
    newBoardState[4][4] = 2;

    // for testing
    // newBoardState[4][5] = 2;
    // newBoardState[2][2] = 2;
    // newBoardState[1][1] = 1;

    setBoardState(newBoardState);
  };

  // Initialize the board
  useEffect(() => {
    initializeBoard();
  }, []);

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

  /**
   *  Check if the move is valid
   * @param {Number} row  row index
   * @param {Number} col  column index
   * @param {Number} player  player number
   * @returns   true if the move is valid, false otherwise
   */
  const isValidMove = (row, col, player) => {
    // Check if the cell is empty
    if (boardState[row][col] !== 0) {
      console.log('Invalid move');
      return false;
    }

    // Check if a adverse piece touch the cell
    let validDirection = [];
    let newBoardState = boardState.map((row) => row.slice());
    let newFlippedPieces = [];

    // Check if there is a adverse piece in each direction
    directions.forEach(({ row: directionRow, col: directionCol }) => {
      let checkRow = row + directionRow;
      let checkCol = col + directionCol;

      if (
        checkRow >= 0 &&
        checkRow < 8 &&
        checkCol >= 0 &&
        checkCol < 8 &&
        boardState[checkRow][checkCol] === 3 - player
      )
        validDirection.push([checkRow, checkCol]);
    });

    // If there is no adverse piece in any direction, the move is invalid
    if (validDirection.length === 0) {
      console.log('Invalid move');
      return false;
    } else {
      // If there is an adverse piece in any direction, check if the move is valid for each valid direction
      validDirection.forEach(([validRowDirection, validColDirection]) => {
        let adversePiecesToFlip = [];
        // Create a copy of the direction to check
        let checkRowDirection = validRowDirection - row;
        let checkColDirection = validColDirection - col;
        // Initialize the current row and column to the next cell in the direction
        let currentRow = validRowDirection;
        let currentCol = validColDirection;

        // Check if, by continuing in the direction, we find other adverse pieces
        while (
          currentRow >= 0 &&
          currentRow < 8 &&
          currentCol >= 0 &&
          currentCol < 8 &&
          boardState[currentRow][currentCol] === 3 - player
        ) {
          // Add the adverse piece to the list of pieces to flip
          adversePiecesToFlip.push([currentRow, currentCol]);
          // Move to the next cell in the direction
          currentRow += checkRowDirection;
          currentCol += checkColDirection;
        }
        // If we find a piece of the player at the end of the direction, the move is valid
        if (
          currentRow >= 0 &&
          currentRow < 8 &&
          currentCol >= 0 &&
          currentCol < 8 &&
          boardState[currentRow][currentCol] === player
        ) {
          console.log('Valid move');
          newBoardState[row][col] = player;

          // Flip the adverse pieces
          adversePiecesToFlip.forEach(([row, col]) => {
            newBoardState[row][col] = player;
            newFlippedPieces.push([row, col]);
          });

          // Change the player
          setPlayer(3 - player);
          setLastMove([row, col]);
          setFlippedPieces(newFlippedPieces);
        } else {
          // If we don't find a piece of the player at the end of the direction, the move is invalid
          adversePiecesToFlip = [];
          console.log('Invalid move');
        }
      });
    }
    setBoardState(newBoardState);
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
              onClick={() => isValidMove(rowIndex, colIndex, player)}
              isLastMove={
                lastMove && lastMove[0] === rowIndex && lastMove[1] === colIndex
              }
              isFlipped={flippedPieces.some(
                ([flippedRow, flippedCol]) =>
                  flippedRow === rowIndex && flippedCol === colIndex
              )}
            />
          ))
        )}
      </div>
    </>
  );
}

export default GameBoard;
