import React from "react";

const Button = ({onClick, textButton}) => (

         <button onClick={onClick} >
            {textButton}
        </button>

);

export default Button;