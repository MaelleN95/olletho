import { useState } from 'react';
import Cell from './Cell.jsx';
import GameStatus from './GameStatus.jsx';
import {
  initializeBoard,
  validMoves,
  flipPieces,
  checkEndGame,
  canPlayerMakeMove,
} from '../logic/gameLogic';
import '../styles/gameboard.css';

function GameBoard() {
  // Create the initial board state
  const [boardState, setBoardState] = useState(initializeBoard());

  const [player, setPlayer] = useState(1); // Player 1 is black, player 2 is white
  const [lastMove, setLastMove] = useState(null);
  const [flippedPieces, setFlippedPieces] = useState([]);

  const [message, setMessage] = useState('');
  const [endGame, setEndGame] = useState(false);

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
      return { moveExecuted: false, newBoardState: boardState };
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
    // Reset the message
    setMessage('');
    // Try to execute the game logic for the current player
    const { moveExecuted, newBoardState } = executeMove(row, col, player);

    // If the move was successful, attempt to switch to the other player
    if (moveExecuted) {
      const nextPlayer = 3 - player; // Switch to the other player
      // Check if the game is over
      setEndGame(checkEndGame(newBoardState));

      if (endGame) {
        return;
      }

      // Check if the next player has any valid moves
      if (canPlayerMakeMove(nextPlayer, newBoardState)) {
        // Switch to the next player if they can move
        setPlayer(nextPlayer);
      } else if (canPlayerMakeMove(player, newBoardState)) {
        // If the next player can't move, keep the current player
        setMessage(
          `Le joueur aux jetons ${
            nextPlayer === 1 ? 'noir' : 'blanc'
          } n'a aucun mouvement valide. Le joueur aux jetons ${
            player === 1 ? 'noir' : 'blanc'
          } continue.`
        );
      }
    } else {
      setMessage('Coup invalide.');
    }
  };

  return (
    <>
      <GameStatus
        player={player}
        endGame={endGame}
        boardState={boardState}
        message={message}
      />
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
