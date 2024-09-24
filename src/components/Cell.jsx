import '../styles/cell.css';

function cell({ cellValue, onClick }) {
  // determine the class name for the cell based on its value
  let cellClassName = 'cell';
  if (cellValue === 1) {
    cellClassName += ' cell-black';
  } else if (cellValue === 2) {
    cellClassName += ' cell-white';
  }

  return <div className={cellClassName} onClick={onClick}></div>;
}

export default cell;
