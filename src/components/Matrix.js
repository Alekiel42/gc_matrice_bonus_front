import React, { useState } from "react";
import Grid from "./Grid";

const Matrix = () => {
  // tableau avec ordre des valeurs ? 
  const matrixSymbols = ['', 'O', 'V', 'X', 'H'];

  const [symbolOnSquare, setSymbolOnSquare] = useState(Array(9).fill(matrixSymbols[0]));

  const handleClick = (index) => {
    // index du tableau symbolOnSquare
    // recup valeur du tableau
    // inbdex of par rapport a matrixSympa
    // si indexOf > 4 alors 0 sinon: 
    // +1
    // update juste element de cet index avec set
  };

  return (
    <div>
      <h1>Matrix - GC</h1>
      <Grid symbols={symbolOnSquare} onClick={handleClick} />
    </div>
  );
};

export default Matrix;
