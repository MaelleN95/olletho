import '../styles/cell.css';

function cell({ cellValue }) {
  // determine the class name for the cell based on its value
  let cellClassName = 'cell';
  if (cellValue === 1) {
    cellClassName += ' cell-black';
  } else if (cellValue === 2) {
    cellClassName += ' cell-white';
  }

  return <div className={cellClassName}></div>;
}

export default cell;
