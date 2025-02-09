import Square from "./Square"

function Board({ xIsNext, squares, onPlay }) {

    const winner = calculateWinner(squares);
    let status = winner ? "Winner: " + winner.player : "Next player: " + (xIsNext ? 'X' : 'O');
  
    function renderSquare(i) {
      return (
        <Square 
          key={i}
          value={squares[i]} 
          onSquareClick={() => handleClick(i)} 
        />
      );
    }
  
    function renderRow(row) {
      const squaresInRow = [];
      for (let col = 0; col < 3; col++) {
        squaresInRow.push(renderSquare(row * 3 + col));
      }
      return (
        <div key={row} className="board-row">
          {squaresInRow}
        </div>
      );
    }
  
    function renderBoard() {
      const rows = [];
      for (let row = 0; row < 3; row++) {
        rows.push(renderRow(row));
      }
      return rows;
    }
    
    
    function handleClick(i) {
        if (winner || squares[i]) {
            return;
        }
        const newSquares = squares.slice();
        newSquares[i] = xIsNext ? 'X' : 'O';
        onPlay(newSquares);
    }
    
    function calculateWinner() {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        
        for(let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return { player: squares[a], winningSquares: lines[i] };
            }
        }
        return null;
    }

    return (
      <>
        <div className="status">{status}</div>
        <div>
          {renderBoard()}
        </div>
      </>
    );
}

export default Board;