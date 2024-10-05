import { checkWinner } from '../logic/gameLogic';

function GameStatus({ player, whiteDisks, blackDisks, endGame }) {
  if (endGame) {
    const winner = checkWinner(blackDisks, whiteDisks);

    if (winner === 'draw') {
      return (
        <div className="game-status">
          <p className="winner">Egalité !</p>
          <div className="disk-count">
            <p>
              <span className="disk black-disk"></span> {blackDisks}
            </p>
            <p>
              <span className="disk white-disk"></span> {whiteDisks}
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
              <span className="disk black-disk"></span> {blackDisks}
            </p>
            <p>
              <span className="disk white-disk"></span> {whiteDisks}
            </p>
          </div>
        </div>
      );
    }
  }
  return (
    <>
      <div className="game-status">
        <div className="disk-count">
          <p>
            <span className="disk black-disk"></span> {blackDisks}
          </p>
          <p>
            <span className="disk white-disk"></span> {whiteDisks}
          </p>
        </div>
      </div>
      <p className="player-turn-info">
        C&apos;est au tour du joueur aux jetons :
        <strong> {player === 1 ? 'noir' : 'blanc'}</strong>
      </p>
    </>
  );
}

export default GameStatus;
