import { useState } from 'react'
import Board from "./Board"

function Game() {

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
    );
}

export default Game;