function GameInfo({ isHistoryAsc, onHandleSort, history, currentMove, onJumpTo, strikeClass, squares, onHandleReset }) {
    
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
                <li className="move inactive" key={moveNumber}>
                    {description}
                </li>
                );
            }
            return (
                <li className="move" 
                    onClick={() => onJumpTo(moveNumber)}
                    key={moveNumber}>
                        {description}
                </li>
            );
        });
        return isHistoryAsc ? moves : moves.reverse();
    }
    
    return (
        <div className="game-info">
            <section id="status">
                <p>{ status }</p>
            </section>
            <button id="reset" onClick={onHandleReset}>
                Reset Game
            </button>
            <section id="history">
                <h2>Current Game History</h2>
                <button id="sort" onClick={onHandleSort}>
                    Sort: {isHistoryAsc ? "Ascending" : "Descending"}
                </button>
                <ul id="move-list">{renderMoves()}</ul>
            </section>
        </div>
    );
}

export default GameInfo;