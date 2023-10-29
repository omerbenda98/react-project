import React, { useState } from "react";
import "./components_css/CarouselComponent.css";
import { Link } from "react-router-dom";

const CarouselComponent = ({ items, seeMore }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };

  const currentItem = items[currentIndex];

  return (
    <div className="big-carousel-container">
      <div className="carousel-container">
        {currentItem && (
          <div>
            <img
              src={currentItem.image ? currentItem.image.url : ""}
              alt={currentItem.name}
            />
            <h3>{currentItem.name}</h3>
            <p>Height: {currentItem.height.metric}</p>
            <p>Weight: {currentItem.weight.metric}</p>
            <p>Life Span: {currentItem.life_span}</p>
            <p>Origin: {currentItem.origin}</p>
            <Link
              onClick={() => seeMore(currentItem.id)}
              className="see-more-btn"
            >
              See More
            </Link>
          </div>
        )}

        <button onClick={handlePrev}>Prev</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default CarouselComponent;
