import React from "react";

const Square = ({ symbol, onClick }) => {

    let image = null;
    if (symbol !== '') {
        image = (
            <img src={`../img/square-${symbol}.png`} alt="Logo" />
        );
    }

    return (
        <div
            className="square"
            onClick={onClick}
        >
            {image}
        </div>
    )
}

export default Square;