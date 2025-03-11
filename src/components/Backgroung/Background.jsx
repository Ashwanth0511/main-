import React from "react";
import "./Background.css";

const Background = ({ heroCount }) => {
  
  if(heroCount == 0){
    return <img className="background" src="assets\car.jpg" alt="" />
  }
  else{
    return <img className="background" src="assets\bike-wallpapers-4k-3.jpg" alt="" />
  }
};

export default Background;
