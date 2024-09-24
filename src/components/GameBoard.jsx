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

  const initializeBoard = () => {
    const newBoardState = boardState.map((row) => row.slice());
    newBoardState[3][3] = 2;
    newBoardState[3][4] = 1;
    newBoardState[4][3] = 1;
    newBoardState[4][4] = 2;
    setBoardState(newBoardState);
  };

  useEffect(() => {
    initializeBoard();
  }, []);

  const isValidMove = (row, col, player) => {
    // Check if the cell is empty
    if (boardState[row][col] !== 0) {
      console.log('Invalid move');
      return false;
    }

    // If the move is valid, update the board state
    const newBoardState = boardState.map((row) => row.slice());
    newBoardState[row][col] = player;
    setBoardState(newBoardState);
  };

  return (
    <div id="board">
      {boardState.map((row, rowIndex) =>
        row.map((cellValue, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            cellValue={cellValue}
            onClick={() => isValidMove(rowIndex, colIndex, 1)}
          />
        ))
      )}
    </div>
  );
}

export default GameBoard;
