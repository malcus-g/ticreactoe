import { useState } from 'react';

function Square({ value, onSquareClick, isWinner }) {
  return (
    <button 
      className={isWinner ? "square winner" : "square"}
      onClick={onSquareClick} 
    >
        { value }
    </button>
  ); 
}

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
  
  return (
    <>
      <div className="status">{status}</div>
      <div>
        {renderBoard()}
      </div>
    </>
  );
  
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
}

export default function Game() {

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isHistoryAsc, setIsHistoryAsc] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(newSquares) {
    const newHistory = [...history.slice(0, currentMove + 1), newSquares];
    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
  }

  function handleSort() {
    setIsHistoryAsc(!isHistoryAsc);
  }

  function renderMoves() {
    const moves = history.map((squares, moveNumber) => {
      let description;
      description = moveNumber > 0 ? `Go to move #${moveNumber}` : 'Go to game start';
      if(moveNumber === currentMove) {
        return (
          <li key={moveNumber}>
            {description}
          </li>
        );
      }
      return (
        <li key={moveNumber}>
          <button onClick={() => jumpTo(moveNumber)}>{description}</button>
        </li>
      );
    });
    return isHistoryAsc ? moves : moves.reverse();
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={handleSort}>Sort: {isHistoryAsc ? "Ascending" : "Descending"}</button>
        <ol>{renderMoves()}</ol>
      </div>
    </div>
  )
}
