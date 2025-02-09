import Strike from "./Strike"
import Square from "./Square"

function Board({ xIsNext, squares, onSquareClick, strikeClass }) {

  function renderSquare(i) {
    return (
      <Square 
        xIsNext={xIsNext}
        key={i}
        value={squares[i]} 
        onSquareClick={() => onSquareClick(i)} 
      />
    );
  }

  function renderBoard() {
    const squares = [];
    for (let square = 0; square < 9; square++) {
      squares.push(renderSquare(square));
    }
    return squares;
  }

  return (
    <>
      <div className="board">
        {renderBoard()}
      <Strike 
        strikeClass={strikeClass}
      />
      </div>
    </>
  );
}

export default Board;