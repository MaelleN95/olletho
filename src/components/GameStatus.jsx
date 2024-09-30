import { checkWinner } from '../logic/gameLogic';

function GameStatus({ player, endGame, boardState, message }) {
  if (endGame) {
    const [winner, numberOfBlackDisk, numberOfWhiteDisk] =
      checkWinner(boardState);

    if (winner === 'draw') {
      return (
        <div className="game-status">
          <h2>Egalité !</h2>
          <p>Nombre de jetons noirs : {numberOfBlackDisk}</p>
          <p>Nombre de jetons blancs : {numberOfWhiteDisk}</p>
        </div>
      );
    } else {
      return (
        <div className="game-status">
          <h2>Le joueur aux jetons {winner} a gagné !</h2>
          <p>Nombre de jetons noirs : {numberOfBlackDisk}</p>
          <p>Nombre de jetons blancs : {numberOfWhiteDisk}</p>
        </div>
      );
    }
  }
  return (
    <div className="game-status">
      <p>
        C&apos;est au tour du joueur aux jetons :{' '}
        {player === 1 ? 'noir' : 'blanc'}
      </p>
      {message ? <p>{message}</p> : null}
    </div>
  );
}

export default GameStatus;
