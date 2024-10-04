function cell({
  cellValue,
  onClick,
  onHover,
  onLeave,
  isLastMove,
  isFlipped,
  isHoveredFlipped,
}) {
  // determine the class name for the cell based on its value
  let cellClassName = 'cell';
  if (cellValue === 1) {
    cellClassName += ' cell-black';
  } else if (cellValue === 2) {
    cellClassName += ' cell-white';
  }

  // add the last-move class if the cell is the last move
  if (isLastMove) {
    cellClassName += ' last-move';
  }

  // add the flipped class if the cell is flipped
  if (isFlipped) {
    cellClassName += ' flipped';
  }

  // add the hovered-flipped class if the cell is hovered flipped
  if (isHoveredFlipped) {
    cellClassName += ' hovered-flipped';
  }
  return (
    <div
      className={cellClassName}
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    ></div>
  );
}

export default cell;
