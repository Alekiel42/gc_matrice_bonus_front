import React, { useState } from "react";
import Grid from "./Grid";
import Button from "./Button";
import Info from "./Info";

const Matrix = () => {
  const matrixSymbols = ['', 'O', 'V', 'X', 'H'];
  const [symbolOnSquare, setSymbolOnSquare] = useState(Array(9).fill(matrixSymbols[0]));
  const [info, setInfo] = useState('');

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

  const handleButton = async () => {
    try{
          let resultToSend = '';
          const copySymbolOnSquare = [...symbolOnSquare];
      
          for(const symbol of copySymbolOnSquare) {
            const indexMatrixSymbol = matrixSymbols.indexOf(symbol);
            resultToSend += indexMatrixSymbol;
          }
          
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ matrice : resultToSend }),
          };
      
          const response =  await fetch("http://localhost:4000/answer",  requestOptions);
      
          if (response.status === 201) {
            const result = await response.json();
            setInfo(result.gps);
            console.log('GPS juste', result.gps);
          } else if (response.status === 202) {
            const result = await response.json();
            // afficher component
            setInfo(result.message);
            console.log('faux', result.message);
          } else {
            throw await response.json();
          }
          
    } catch(error){
      console.error(error);
    }


  }

  return (
    <div>
      <h1>Matrix - GC</h1>
      <Grid symbols={symbolOnSquare} onClick={handleClick} />
      <Button onClick={handleButton} />
      <Info info={info} />
    </div>
  );
};

export default Matrix;
