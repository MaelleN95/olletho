import { useState, useEffect } from 'react';
import Cell from './Cell.jsx';
import GameStatus from './GameStatus.jsx';
import Modal from './Modal.jsx';
import {
  initializeBoardState,
  validMoves,
  flipPieces,
  isEndGame,
  canPlayerMakeMove,
  countDisks,
} from '../logic/gameLogic';
import { clearGame, saveGame, loadGame } from '../logic/saveLogic.js';

function GameBoard() {
  // Load the saved game state if it exists
  const savedGame = loadGame();

  // Create the initial board state
  const [boardState, setBoardState] = useState(initializeBoardState());

  const [player, setPlayer] = useState(1); // Player 1 is black, player 2 is white
  const [lastMove, setLastMove] = useState(null);
  const [flippedPieces, setFlippedPieces] = useState([]);
  const [hoverFlippedPieces, setHoverFlippedPieces] = useState([]);

  const [message, setMessage] = useState('Bienvenue !');
  const [endGame, setEndGame] = useState(false);
  const [blackDisks, setBlackDisks] = useState(2);
  const [whiteDisks, setWhiteDisks] = useState(2);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (savedGame) {
      setIsModalVisible(true);
    }
  }, []);

  const continueSavedGame = () => {
    if (savedGame) {
      // Load the saved game state
      setBoardState(savedGame.boardState);
      setPlayer(savedGame.player);
      setBlackDisks(savedGame.blackDisks);
      setWhiteDisks(savedGame.whiteDisks);
      setLastMove(savedGame.lastMove);
      setFlippedPieces(savedGame.flippedPieces);
      setMessage('Partie sauvegardée récupérée !');
    }
    setIsModalVisible(false);
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
      return { moveExecuted: false, newBoardState: boardState };
    }

    // Make a copy of the current board state
    let newBoardState = boardState.map((row) => row.slice());

    // Place the player's piece on the selected cell
    newBoardState[row][col] = player;

    // Flip the pieces
    flipPieces(newBoardState, flippedPieces, player);

    // Update the board state
    setBoardState(newBoardState);

    // Store the last move
    setLastMove([row, col]);

    // Set the flipped pieces for visual effect
    setFlippedPieces(flippedPieces);

    // Save the game state
    saveGame(
      newBoardState,
      3 - player,
      countDisks(newBoardState)[0],
      countDisks(newBoardState)[1],
      [row, col],
      flippedPieces
    );

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
      // Switch to the other player
      const nextPlayer = 3 - player;

      // Update the disk count
      setBlackDisks(countDisks(newBoardState)[0]);
      setWhiteDisks(countDisks(newBoardState)[1]);

      // Clear the potential flipped pieces
      setHoverFlippedPieces([]);

      // Check if the game is over
      setEndGame(isEndGame(newBoardState));

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

  /**
   *  Highlight the potential flips for the current player
   * @param {*} row  The row index where the player wants to move
   * @param {*} col  The column index where the player wants to move
   */
  const highlightPotentialFlips = (row, col) => {
    const { validMove, flippedPieces } = validMoves(
      row,
      col,
      player,
      boardState
    );
    if (validMove) setHoverFlippedPieces(flippedPieces);
  };

  /**
   * Clear the potential flips for the current player
   */
  const clearPotentialFlips = () => setHoverFlippedPieces([]);

  const resetGame = () => {
    setBoardState(initializeBoardState());
    setLastMove(null);
    setFlippedPieces([]);
    setMessage('Nouvelle partie !');
    setEndGame(false);
    setPlayer(1);
    setBlackDisks(2);
    setWhiteDisks(2);
  };

  const startNewGame = () => {
    resetGame();
    clearGame();
    setIsModalVisible(false);
  };

  return (
    <>
      <GameStatus
        player={player}
        endGame={endGame}
        boardState={boardState}
        message={message}
        blackDisks={blackDisks}
        whiteDisks={whiteDisks}
      />
      <div id="board">
        {boardState.map((row, rowIndex) =>
          row.map((cellValue, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              cellValue={cellValue}
              onClick={() => managePlayerMove(rowIndex, colIndex, player)}
              onHover={() => highlightPotentialFlips(rowIndex, colIndex)}
              onLeave={clearPotentialFlips}
              isLastMove={
                lastMove && lastMove[0] === rowIndex && lastMove[1] === colIndex
              }
              isFlipped={flippedPieces.some(
                ([flippedirectionRow, flippedirectionCol]) =>
                  flippedirectionRow === rowIndex &&
                  flippedirectionCol === colIndex
              )}
              isHoveredFlipped={hoverFlippedPieces.some(
                ([hoverRow, hoverCol]) =>
                  hoverRow === rowIndex && hoverCol === colIndex
              )}
            />
          ))
        )}
      </div>
      {message ? <p className="message">{message}</p> : null}
      {lastMove && (
        <button className="button restart-button" onClick={startNewGame}>
          Relancer la partie
        </button>
      )}
      {isModalVisible && (
        <Modal title="Partie Sauvegardée" ID="saved-game-modal">
          <p>
            Nous avons retrouvé une partie sauvegardée. Voulez-vous la continuer
            ou démarrer une nouvelle partie ?
          </p>
          <div className="saved-game-modal-buttons-container">
            <button className="button" onClick={continueSavedGame}>
              Continuer la partie
            </button>
            <button className="button" onClick={startNewGame}>
              Nouvelle partie
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default GameBoard;
