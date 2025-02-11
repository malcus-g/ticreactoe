function GameInfo({ isHistoryAsc, onHandleSort, history, currentMove, onJumpTo }) {
    
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
                <button onClick={() => onJumpTo(moveNumber)}>{description}</button>
                </li>
            );
        });
        return isHistoryAsc ? moves : moves.reverse();
    }
    
    return (
        <div className="game-info">
            <button onClick={onHandleSort}>
                Sort: {isHistoryAsc ? "Ascending" : "Descending"}
            </button>
            <ol>{renderMoves()}</ol>
        </div>
    );
}

export default GameInfo;