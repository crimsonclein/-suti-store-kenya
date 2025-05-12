import React, { useState } from "react";
import "./Carousel.css"; // Import the CSS for the carousel styles
import pic1 from "../Components/Images/carousel1a.jpg";
import pic2 from "../Components/Images/carouselb.jpg";
import pic3 from "../Components/Images/carouselc.jpg";
import pic4 from "../Components/Images/carouseld.jpg";
import "bootstrap/dist/css/bootstrap.min.css";

const Carousel = () => {
  // Step 1: Manage the current slide index with state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Step 2: Array of images or content for each slide
  const slides = [
    pic1,
    pic2,
    pic3,
    pic4
  ];

  // Step 3: Handle next and previous slide navigation
  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const goToPreviousSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  return (
    <div className="carousel">
      <div className="carousel-inner">
        {/* Step 4: Display the current slide */}
        <img
          src={slides[currentSlide]}
          alt={`Slide ${currentSlide + 1}`}
          className="carousel-image"
        />
      </div>

      {/* Step 5: Navigation buttons */}
      <button
        onClick={goToPreviousSlide}
        className="prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Prev</span>
      </button>
      <button
        onClick={goToNextSlide}
        className="next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
