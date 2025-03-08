import React from "react";
import "./Background.css";

const Background = ({ heroCount }) => {
  const image = heroCount === 0 ? "assets/car.jpg" :"assets/bike-wallpapers-4k-3.jpg";
  return (
    <div
      className="background"
      style={{
        backgroundImage: `url(${image})`
      }}
    ></div>
  );
};

export default Background;
