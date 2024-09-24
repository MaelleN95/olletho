import Cell from './Cell.jsx';
import '../styles/gameboard.css';

function GameBoard() {
  // Create an 8x8 array of null values
  let boardState = Array(8)
    .fill(0)
    .map(() => Array(8).fill(0));

  // Set the initial state of the board
  boardState[3][3] = 1;
  boardState[3][4] = 2;
  boardState[4][3] = 2;
  boardState[4][4] = 1;

  return (
    <div id="board">
      {boardState.map((row, rowIndex) =>
        row.map((cellValue, colIndex) => (
          <Cell key={`${rowIndex}-${colIndex}`} cellValue={cellValue} />
        ))
      )}
    </div>
  );
}

export default GameBoard;
