import React, { useState, useEffect, useRef } from "react";
import "./components_css/CarouselComponent.css";
import "../pages/pages_css/Neon.css";
import { Link } from "react-router-dom";

const CarouselComponent = ({ items, seeMore }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const carouselRef = useRef(null);

  const handleNext = () => {
    if (!transitioning) {
      setTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }
  };

  const handlePrev = () => {
    if (!transitioning) {
      setTransitioning(true);
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + items.length) % items.length
      );
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.style.transition = "transform 0.5s ease-in-out";
      carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

      const onTransitionEnd = () => {
        setTransitioning(false);
        if (currentIndex === items.length) {
          carousel.style.transition = "none";
          setCurrentIndex(0);
          carousel.style.transform = `translateX(0)`;
        } else if (currentIndex === -1) {
          carousel.style.transition = "none";
          setCurrentIndex(items.length - 1);
          carousel.style.transform = `translateX(-${
            (items.length - 1) * 100
          }%)`;
        }
      };

      carousel.addEventListener("transitionend", onTransitionEnd);
      return () =>
        carousel.removeEventListener("transitionend", onTransitionEnd);
    }
  }, [currentIndex, items.length]);

  const renderItems = () => {
    const itemsToRender = [items[items.length - 1], ...items, items[0]];

    return itemsToRender.map((item, index) => (
      <div key={index} className="carousel-item">
        <CarouselItemContent item={item} seeMore={seeMore} />
      </div>
    ));
  };

  return (
    <div className="carousel-wrapper">
      <div className="carousel-container" ref={carouselRef}>
        {renderItems()}
      </div>
      <button className="carousel-btn prev-btn" onClick={handlePrev}>
        &#10094;
      </button>
      <button className="carousel-btn next-btn" onClick={handleNext}>
        &#10095;
      </button>
    </div>
  );
};

const CarouselItemContent = ({ item, seeMore }) => (
  <>
    <img
      src={item.image ? item.image.url : ""}
      alt={item.name}
      className="carousel-image"
    />
    <div className="carousel-content neon">
      <h2>{item.name}</h2>
      <p>
        <strong>Height:</strong> {item.height.metric}
      </p>
      <p>
        <strong>Weight:</strong> {item.weight.metric}
      </p>
      <p>
        <strong>Life Span:</strong> {item.life_span}
      </p>
      <p>
        <strong>Origin:</strong> {item.origin}
      </p>
      <Link onClick={() => seeMore(item.id)} className="see-more-btn">
        See More
      </Link>
    </div>
  </>
);

export default CarouselComponent;
