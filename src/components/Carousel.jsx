import React from "react";
import "../assets/styles/Carousel.css";
import Confetti from "../assets/icons/Confetti.svg";
import courthouse from "../assets/icons/courthouse.svg";
import RocketLaunch from "../assets/icons/RocketLaunch.svg";
import GlobeHemisphereWest from "../assets/icons/GlobeHemisphereWest.svg";

const content = [
  "Admission 2025-2026",
  "The best universities waiting for you!",
];

const logos = [Confetti, courthouse, RocketLaunch, GlobeHemisphereWest];

const Carousel = () => {
  const items = [];
  for (let i = 0; i < logos.length; i++) {
    items.push(
      <div className="carousel-text" key={`text-${i}`}>
        {content[i % content.length]}
      </div>
    );
    items.push(
      <div className="carousel-slide" key={`logo-${i}`}>
        <img src={logos[i]} alt={`Client ${i + 1}`} className="carousel-logo" />
      </div>
    );
  }
  return (
    <div className="carousel-container">
      <div className="carousel-track">{[...items, ...items]}</div>
    </div>
  );
};

export default Carousel;
