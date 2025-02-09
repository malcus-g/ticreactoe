function Square({ value, onSquareClick, xIsNext}) {
    let hoverClass = null;
    if(value == null && xIsNext !== null){
        hoverClass = xIsNext ? "x-hover" : "o-hover";
    }

    return (
        <div 
        className={`square ${hoverClass}`}
        onClick={onSquareClick} 
        >
            { value }
        </div>
    ); 
}

export default Square;