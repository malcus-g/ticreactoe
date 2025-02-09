import { useState, useEffect } from 'react'
import Board from "./Board"

const winningLines = [
    // Rows
    {combo: [0, 1, 2], strikeClass: "strike-row-1"},
    {combo: [3, 4, 5], strikeClass: "strike-row-2"},
    {combo: [6, 7, 8], strikeClass: "strike-row-3"},

    //Columns
    {combo: [0, 3, 6], strikeClass: "strike-column-1"},
    {combo: [1, 4, 7], strikeClass: "strike-column-2"},
    {combo: [2, 5, 8], strikeClass: "strike-column-3"},

    //Diagonals
    {combo: [0, 4, 8], strikeClass: "strike-diagonal-1"},
    {combo: [2, 4, 6], strikeClass: "strike-diagonal-2"}
];

function checkWinner(squares, setStrikeClass) {
    for(let i = 0; i < winningLines.length; i++) {
      const [a, b, c] = winningLines[i].combo;
      if(squares[a] && 
        squares[a] === squares[b] && 
        squares[a] === squares[c]) {
          setStrikeClass(winningLines[i].strikeClass);
          return;
      }
    }
    return null;
  }

function Game() {

    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [isHistoryAsc, setIsHistoryAsc] = useState(true);
    const [strikeClass, setStrikeClass] = useState();
    const squares = history[currentMove];
    const xIsNext = currentMove % 2 === 0;

    useEffect(() => {
        checkWinner(squares, setStrikeClass);
      }, [squares]);

    function handleSquareClick(i) {
        if (checkWinner(squares, setStrikeClass) || squares[i]) {
            return;
        }
        const newSquares = [...squares];
        newSquares[i] = xIsNext ? 'X' : 'O';
        handlePlay(newSquares);
    }

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
        <h1>Tic Tac Toe</h1>
        <Board 
            xIsNext={xIsNext} 
            squares={squares} 
            onSquareClick={handleSquareClick} 
            strikeClass={strikeClass}
        />
        <div className="game-info">
            <button onClick={handleSort}>
                Sort: {isHistoryAsc ? "Ascending" : "Descending"}
            </button>
            <ol>{renderMoves()}</ol>
        </div>
    </div>
    );
}

export default Game;