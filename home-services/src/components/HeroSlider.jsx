import React, { useState, useEffect } from 'react';
import './HeroSlider.css';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      title: "Professional Home Services",
      description: "Book trusted professionals for all your home needs",
      bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      cta: "Book Now"
    },
    {
      id: 2,
      title: "Emergency Services Available",
      description: "24/7 emergency services for urgent home repairs",
      bgColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      cta: "Emergency Help"
    },
    {
      id: 3,
      title: "Satisfaction Guaranteed",
      description: "100% satisfaction guarantee on all our services",
      bgColor: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      cta: "Learn More"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="hero-slider">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
          style={{ background: slide.bgColor }}
        >
          <div className="slide-content">
            <h1>{slide.title}</h1>
            <p>{slide.description}</p>
            <button className="cta-button">{slide.cta}</button>
          </div>
        </div>
      ))}
      
      <button className="slider-nav prev" onClick={prevSlide}>
        ‹
      </button>
      <button className="slider-nav next" onClick={nextSlide}>
        ›
      </button>
      
      <div className="slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;