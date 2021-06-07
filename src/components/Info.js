import React from "react";

const Info = ({ info, style }) => (
  <div className={`info ${style}`}>
      {info}
  </div>
);

export default Info;