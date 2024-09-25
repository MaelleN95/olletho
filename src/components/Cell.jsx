import '../styles/cell.css';

function cell({ cellValue, onClick, isLastMove, isFlipped }) {
  // determine the class name for the cell based on its value
  let cellClassName = 'cell';
  if (cellValue === 1) {
    cellClassName += ' cell-black';
  } else if (cellValue === 2) {
    cellClassName += ' cell-white';
  }

  if (isLastMove) {
    cellClassName += ' last-move'; // Ajouter une classe pour le dernier coup
  }

  if (isFlipped) {
    cellClassName += ' flipped'; // Ajouter une classe pour les pions retournés
  }
  return <div className={cellClassName} onClick={onClick}></div>;
}

export default cell;
