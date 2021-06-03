import React from "react";
import Square from "./Square";

const Grid = ({ symbols, onClick }) => (
  <div className="box">
      <div className="box-grid">
    {symbols.map((symbol, index) => (
      <Square key={index} symbol={symbol} onClick={() => onClick(index)} />
    ))}
        </div>
  </div>
);

export default Grid;