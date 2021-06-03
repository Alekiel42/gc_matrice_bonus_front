import React, { useState } from "react";
import Grid from "./Grid";

const Matrix = () => {
  const matrixSymbols = ['', 'O', 'V', 'X', 'H'];

  const [symbolOnSquare, setSymbolOnSquare] = useState(Array(9).fill(matrixSymbols[0]));

  const handleClick = (index) => {
    const copySymbolOnSquare = [...symbolOnSquare];

    const indexMatrixSymbol = matrixSymbols.indexOf(copySymbolOnSquare[index]);
    if(indexMatrixSymbol === matrixSymbols.length -1 ) {
      copySymbolOnSquare[index] = matrixSymbols[0]; 
      setSymbolOnSquare(copySymbolOnSquare); 
    } else {
      copySymbolOnSquare[index] = matrixSymbols[indexMatrixSymbol + 1]; 
      setSymbolOnSquare(copySymbolOnSquare); 
    }
  };

  return (
    <div>
      <h1>Matrix - GC</h1>
      <Grid symbols={symbolOnSquare} onClick={handleClick} />
    </div>
  );
};

export default Matrix;
