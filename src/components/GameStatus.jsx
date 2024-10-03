import { checkWinner } from '../logic/gameLogic';

function GameStatus({ player, endGame, boardState, message }) {
  if (endGame) {
    const [winner, numberOfBlackDisk, numberOfWhiteDisk] =
      checkWinner(boardState);

    if (winner === 'draw') {
      return (
        <div className="game-status">
          <p className="winner">Egalité !</p>
          <div className="disk-count">
            <p>
              <span className="disk black-disk"></span> {numberOfBlackDisk}
            </p>
            <p>
              <span className="disk white-disk"></span> {numberOfWhiteDisk}
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="game-status">
          <p className="winner">
            Le joueur aux jetons <strong>{winner}</strong> a gagné !
          </p>
          <div className="disk-count">
            <p>
              <span className="disk black-disk"></span> {numberOfBlackDisk}
            </p>
            <p>
              <span className="disk white-disk"></span> {numberOfWhiteDisk}
            </p>
          </div>
        </div>
      );
    }
  }
  return (
    <div className="game-status">
      <p className="player-turn-info">
        C&apos;est au tour du joueur aux jetons :{' '}
        <strong>{player === 1 ? 'noir' : 'blanc'}</strong>
      </p>
      {message ? <p className="message">{message}</p> : null}
    </div>
  );
}

export default GameStatus;
