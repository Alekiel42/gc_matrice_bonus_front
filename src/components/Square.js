import React from "react";

const Square = ({ symbol, onClick}) => {
    // faire css avec image ? du coup symbol plus vas import image au lieux texte! 
    const style = symbol ? `square ${symbol}` : `square`;
    return(
        <div className={style} onClick={onClick}>
            {symbol}
        </div>
    )
}

export default Square;