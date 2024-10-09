/**
 * Saves the current game state in the local storage under the object "olletho".
 *
 * If the "olletho" object does not exist in local storage, it will be created.
 * The game state is saved in a nested structure, allowing for future retrieval
 * of the game progress.
 *
 * @param {Array<Array<number>>} boardState - The current state of the board.
 * @param {number} player - The player making the move (1 for black, 2 for white).
 * @param {number} blackDisks - The count of black disks on the board.
 * @param {number} whiteDisks - The count of white disks on the board.
 * @param {Array<number>} lastMove - The last move made, represented as [row, col].
 * @param {Array<Array<number>>} flippedPieces - The pieces flipped by the last move.
 */
export const saveGame = (
  boardState,
  player,
  blackDisks,
  whiteDisks,
  lastMove,
  flippedPieces
) => {
  const gameData = {
    boardState,
    player,
    blackDisks,
    whiteDisks,
    lastMove,
    flippedPieces,
  };

  // Retrieve the existing "olletho" object or create a new one
  const existingData = JSON.parse(localStorage.getItem('olletho')) || {};

  // Add or update the gameInProgress object
  existingData.gameInProgress = gameData;

  // Save the updated object in local storage
  localStorage.setItem('olletho', JSON.stringify(existingData));
};

/**
 * Loads the game state from local storage from the "olletho" object.
 *
 * @returns {Object|null} An object containing the game data if available, or null if there is no saved game.
 */
export const loadGame = () => {
  // Retrieve the existing "olletho" object from local storage
  const existingData = JSON.parse(localStorage.getItem('olletho'));

  // Check if there is a gameInProgress object
  if (existingData && existingData.gameInProgress) {
    return existingData.gameInProgress;
  }

  // Return null if there is no saved game
  return null;
};

/**
 * Clears the gameInProgress data from the "olletho" object in local storage.
 */
export const clearGame = () => {
  // Load the existing "olletho" object from local storage
  const olletho = JSON.parse(localStorage.getItem('olletho'));

  // Check if "olletho" exists and has a "gameInProgress" property
  if (olletho && olletho.gameInProgress) {
    // Remove the "gameInProgress" property
    delete olletho.gameInProgress;

    // Save the updated "olletho" object back to local storage
    localStorage.setItem('olletho', JSON.stringify(olletho));
  }
};
