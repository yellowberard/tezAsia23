import React from "react";

function Card({ src }) {
  return (
    <img style={{ width: "145px", height: "215px" }} src={src} alt="uno card" />
  );
}

export default Card;
