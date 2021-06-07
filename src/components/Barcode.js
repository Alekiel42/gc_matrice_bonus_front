import React, { useEffect, useState } from "react";

const Barcode = () => {
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


   return(
    <p className="matrice-info-code">{code}</p>
   );

};

export default Barcode;