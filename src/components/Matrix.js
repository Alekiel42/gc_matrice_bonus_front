import React, { useEffect, useState } from "react";
import Grid from "./Grid";
import Button from "./Button";
import Info from "./Info";


const Matrix = () => {
  const matrixSymbols = ['', 'triangle', 'diamond', 'cross', 'circle'];
  let gameDisplayed = null;
  const [symbolOnSquare, setSymbolOnSquare] = useState(Array(9).fill(matrixSymbols[0]));
  const [info, setInfo] = useState('');
  const [isDisplayed, setIsDisplayed] = useState(true);

  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const alphabetArray = alphabet.split('');
  const [code, setCode] = useState(['y', 'e', 'o', 'b', 'd', 'o', 'f', 'b', 'd', 'o', 'f', 'g','a', 'x', 'i']);

  useEffect(()=> {
    const interval = setInterval(() => {
      const randomIndexAlphabet = Math.floor(Math.random() * 26);  
      const randomIndexCode = Math.floor(Math.random() * code.length);
      const codeCopy = [...code];
      codeCopy[randomIndexCode] = alphabetArray[randomIndexAlphabet];
      setCode(codeCopy);      
    }, 30);
    return () => clearInterval(interval);
  });

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

      const response = await fetch("http://localhost:4000/answer", requestOptions);

      if (response.status === 201) {
        const result = await response.json();
        setInfo(`La rapport semble juste Agent. Rendez-vous aux coordonnées ${result.gps} pour confirmer votre position.`);
        setIsDisplayed(false);
      } else if (response.status === 202) {
        const result = await response.json();
        setInfo(result.message);
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
            <p className="matrice-info-code">{code}</p>
            <p>
              Cette interface est liée à la cache Mystery : GC9CEYK.
            </p>
            <p>
              Pour envoyer votre rapport via cette interface il vous faut avoir trouver les failles de la matrice : <a href="https://www.geocaching.com/geocache/GC9BNJM_matrice-the-other-side" target="_blank" rel="noreferrer">GC9BNJM</a>, <a href="https://www.geocaching.com/geocache/GC9BNMJ_matrice-which-side" target="_blank" rel="noreferrer">GC9BNMJ</a> et <a href="https://www.geocaching.com/geocache/GC9BNM2_matrice-inside" target="_blank" rel="noreferrer">GC9BNM2</a>.
            </p>
        </div>
      </div>
      <div className="matrice-game">
        {gameDisplayed}
        <Info info={info} />
      </div>
    </main>
  );
};

export default Matrix;
