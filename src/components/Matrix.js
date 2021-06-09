import React, { useState } from "react";
import Grid from "./Grid";
import Button from "./Button";
import Info from "./Info";
import Barcode from "./Barcode";


const Matrix = () => {
  const matrixSymbols = ['', 'triangle', 'diamond', 'cross', 'circle'];
  let gameDisplayed = null;
  const [symbolOnSquare, setSymbolOnSquare] = useState(Array(9).fill(matrixSymbols[1]));
  const [info, setInfo] = useState('');
  const [infoStyle, setInfoStyle] = useState(null);
  const[stopBar, setStopBar] = useState(false);
  const[gps, setGps] = useState('');

  const [isDisplayed, setIsDisplayed] = useState(true);
  const [attempt, setAttempt] = useState(1);

  const handleClick = (index) => {
    const copySymbolOnSquare = [...symbolOnSquare];
    const indexMatrixSymbol = matrixSymbols.indexOf(copySymbolOnSquare[index]);

    if (indexMatrixSymbol === matrixSymbols.length - 1) {
      copySymbolOnSquare[index] = matrixSymbols[0];
      setSymbolOnSquare(copySymbolOnSquare);
    } else {
      copySymbolOnSquare[index] = matrixSymbols[indexMatrixSymbol + 1];
      setSymbolOnSquare(copySymbolOnSquare);
    }
  };

  const handleButton = async () => {
    try {      
      let resultToSend = '';
      const copySymbolOnSquare = [...symbolOnSquare];

      for (const symbol of copySymbolOnSquare) {
        const indexMatrixSymbol = matrixSymbols.indexOf(symbol);
        resultToSend += indexMatrixSymbol;
      }

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matrice: resultToSend }),
      };

      const response = await fetch("https://matrice-gc-back.herokuapp.com/answer", requestOptions);

      if (response.status === 201) {
        const result = await response.json();
        setInfo(`La rapport semble juste Agent. ${result.message}`);
        setIsDisplayed(false);
        setInfoStyle('info-right');
        setStopBar(true);
        setGps(result.gps)
      } else if (response.status === 202) {
        const result = await response.json(); 
        setInfo(`Tentative ${attempt} : ${result.message}`);
        setAttempt(attempt + 1);  
        setInfoStyle('info-wrong');   
      } else {
        throw await response.json();
      }

    } catch (error) {
      console.error(error);
    }

  }

  if (isDisplayed) {
    gameDisplayed = (
      <div>
        <Grid symbols={symbolOnSquare} onClick={handleClick} />
        <Button onClick={handleButton} />
      </div>
    );
  }

  return (
    <main>
      <div className="matrice-info">
        <h1>Matrix - GC9CEYK</h1>
        <div>
            <Barcode stopBar={stopBar} gps={gps} />
            <p>
              Cette interface est liée à la cache Mystery : GC9CEYK.
            </p>
            <p>
              Pour envoyer votre rapport via cette interface il vous faut avoir trouver les failles de la matrice : <a href="https://www.geocaching.com/geocache/GC9BNJM_matrice-the-other-side" target="_blank" rel="noreferrer">GC9BNJM</a>, <a href="https://www.geocaching.com/geocache/GC9BNMJ_matrice-which-side" target="_blank" rel="noreferrer">GC9BNMJ</a> et <a href="https://www.geocaching.com/geocache/GC9BNM2_matrice-inside" target="_blank" rel="noreferrer">GC9BNM2</a>.
            </p>            
            <Info info={info} style={infoStyle} />            
        </div>
      </div>
      <div className="matrice-game">
        {gameDisplayed}        
      </div>
    </main>
  );
};

export default Matrix;
