function GameInfo({ isHistoryAsc, onHandleSort, history, currentMove, onJumpTo, strikeClass, squares }) {
    
    const player = currentMove % 2 == 0 ? "X" : "O";
    let status;
    if(strikeClass === null && squares.includes(null)){
        status = player === "X" ? "X's Move" : "O's Move";
    } else {
        if(strikeClass !== null){
            status = player === "X" ? "O Wins!" : "X Wins!";
        } else {
            status = "It's a draw!";
        }
    }

    function renderMoves() {
        const moves = history.map((squares, moveNumber) => {
            let description;
            description = `Go to move #${moveNumber}`;
            if(moveNumber === 0){
                return;
            }
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
            <section id="status">
                <h2>Game Status</h2>
                <p>{ status }</p>
            </section>
            <section id="history">
                <h2>Previous Game History</h2>
                <button onClick={onHandleSort}>
                    Sort: {isHistoryAsc ? "Ascending" : "Descending"}
                </button>
                <ol>{renderMoves()}</ol>
            </section>
        </div>
    );
}

export default GameInfo;