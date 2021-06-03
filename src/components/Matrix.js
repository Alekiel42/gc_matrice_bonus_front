import React, { useState } from "react";
import Grid from "./Grid";
import Button from "./Button";
import Info from "./Info";

const Matrix = () => {
  const matrixSymbols = ['', 'O', 'V', 'X', 'H'];
  let gameDisplayed = null;
  const [symbolOnSquare, setSymbolOnSquare] = useState(Array(9).fill(matrixSymbols[0]));
  const [info, setInfo] = useState('');
  const [isDisplayed, setIsDisplayed] = useState(true);

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
        <h1>Matrix - GC</h1>
        <div>
          <p>
            Cette interface est liée à la cache Mystery : XXXXXX.
        </p>
          <p>
            Pour envoyer votre rapport via cette interface il vous faut avoir trouver les failles de la matrice : <a href="https://www.geocaching.com/geocache/GC9BNJM_matrice-the-other-side" target="_blank" rel="noreferrer">GC9BNJM</a>, <a href="https://www.geocaching.com/geocache/GC9BNMJ_matrice-which-side" target="_blank" rel="noreferrer">GC9BNMJ</a> et <a href="https://www.geocaching.com/geocache/GC9BNM2_matrice-inside" target="_blank" rel="noreferrer">GC9BNM2</a>.
        </p>

        </div>
        {gameDisplayed}
        <Info info={info} />
      </main>
    );
  };

  export default Matrix;
