import React, { useState, useRef, useEffect } from "react";
import "./Home.css";
import bali from "./International/IntImages/bali.png";
import dubai from "./International/IntImages/dubai.png";
import paris from "./International/IntImages/paris.png";
import whatsapp from "../assets/whatsapp.png";
import HeroVideo1 from "/Users/musaddique/Desktop/travel-app/src/assets/hero1.mp4";
import HeroVideo2 from "/Users/musaddique/Desktop/travel-app/src/assets/hero2.mp4";
import HeroVideo3 from "/Users/musaddique/Desktop/travel-app/src/assets/hero3.mp4";

export default function Home() {
  const videos = [HeroVideo1, HeroVideo2, HeroVideo3];
  const [currentVideo, setCurrentVideo] = useState(0);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [expandAll, setExpandAll] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  // Sample packages
  const packages = [
    {
      id: 1,
      title: "Maldives Escape",
      image: bali,
      days: 5,
      nights: 4,
      overview: "Experience the serene beaches and luxury villas of Maldives.",
      itinerary: [
        { day: "Day 1", detail: "Arrival and hotel check-in." },
        { day: "Day 2", detail: "Island hopping and snorkeling." },
        { day: "Day 3", detail: "Water sports activities." },
        { day: "Day 4", detail: "Leisure day and spa relaxation." },
        { day: "Day 5", detail: "Departure." },
      ],
    },
    {
      id: 2,
      title: "Dubai Delight",
      image: dubai,
      days: 6,
      nights: 5,
      overview:
        "Explore skyscrapers, desert safari, and luxury shopping in Dubai.",
      itinerary: [
        { day: "Day 1", detail: "Arrival and Marina Dhow Cruise." },
        { day: "Day 2", detail: "City tour and Burj Khalifa visit." },
        { day: "Day 3", detail: "Desert safari with BBQ dinner." },
        { day: "Day 4", detail: "Abu Dhabi full-day tour." },
        { day: "Day 5", detail: "Shopping and leisure day." },
        { day: "Day 6", detail: "Departure." },
      ],
    },
    {
      id: 3,
      title: "Paris Getaway",
      image: paris,
      days: 7,
      nights: 6,
      overview: "Romantic Paris tour with Eiffel Tower and Louvre visits.",
      itinerary: [
        { day: "Day 1", detail: "Arrival and Seine River Cruise." },
        { day: "Day 2", detail: "City tour and Eiffel Tower." },
        { day: "Day 3", detail: "Louvre Museum and Notre Dame." },
        { day: "Day 4", detail: "Versailles Day trip." },
        { day: "Day 5", detail: "Shopping and Montmartre." },
        { day: "Day 6", detail: "Leisure day." },
        { day: "Day 7", detail: "Departure." },
      ],
    },
    {
      id: 4,
      title: "Bali Adventure",
      image: bali,
      days: 6,
      nights: 5,
      overview: "Explore Bali’s beaches, temples, and culture.",
      itinerary: [
        { day: "Day 1", detail: "Arrival and hotel check-in." },
        { day: "Day 2", detail: "Beach hopping and surfing." },
        { day: "Day 3", detail: "Ubud tour." },
        { day: "Day 4", detail: "Temple visits and cultural show." },
        { day: "Day 5", detail: "Leisure day." },
        { day: "Day 6", detail: "Departure." },
      ],
    },
  ];

  // Handle scroll for dots
  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft;
      const cardWidth = carouselRef.current.firstChild.offsetWidth + 30;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    carousel.addEventListener("scroll", handleScroll);
    return () => carousel.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToIndex = (index) => {
    const cardWidth = carouselRef.current.firstChild.offsetWidth + 30;
    carouselRef.current.scrollTo({
      left: cardWidth * index,
      behavior: "smooth",
    });
  };

  // Switch to next video when current ends
  const handleVideoEnd = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
  };

  return (
    <div className="home-container">
      {/* HERO VIDEO CAROUSEL */}
      <div className="hero-banner">
        <video
          className="hero-video"
          src={videos[currentVideo]}
          autoPlay
          loop={false}
          muted
          playsInline
          onEnded={handleVideoEnd}
        />
        <div className="hero-text">
          <h1>Discover Your Next Adventure</h1>
          <p>
            Explore the best destinations with our exclusive travel packages
          </p>
        </div>
      </div>

      {/* PACKAGE CAROUSEL */}
      <h2 className="section-title">Top Selling International Destinations</h2>
      <div className="package-carousel" ref={carouselRef}>
        {packages.map((pkg) => (
          <div key={pkg.id} className="package-card-wrapper">
            <div
              className="package-card"
              onClick={() => setSelectedPackage(pkg)}
            >
              <img src={pkg.image} className="package-img" alt={pkg.title} />
              <h3>{pkg.title}</h3>
              <p>
                {pkg.days} Days / {pkg.nights} Nights
              </p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="section-title">Top Selling Domestic Destinations</h2>
      <div className="package-carousel" ref={carouselRef}>
        {packages.map((pkg) => (
          <div key={pkg.id} className="package-card-wrapper">
            <div
              className="package-card"
              onClick={() => setSelectedPackage(pkg)}
            >
              <img src={pkg.image} className="package-img" alt={pkg.title} />
              <h3>{pkg.title}</h3>
              <p>
                {pkg.days} Days / {pkg.nights} Nights
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* SCROLL DOTS */}
      <div className="carousel-dots">
        {packages.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === activeIndex ? "active" : ""}`}
            onClick={() => scrollToIndex(index)}
          ></span>
        ))}
      </div>

      {/* MODAL */}
      {selectedPackage && (
        <div className="modal-overlay" onClick={() => setSelectedPackage(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <img src={selectedPackage.image} className="modal-img" alt="" />
            <h2>{selectedPackage.title}</h2>
            <p>
              {selectedPackage.days} Days / {selectedPackage.nights} Nights
            </p>

            <details className="accordion">
              <summary>Overview</summary>
              <p>{selectedPackage.overview}</p>
            </details>

            <details className="accordion">
              <summary>Itinerary</summary>
              <button
                className="expand-btn"
                onClick={() => setExpandAll(!expandAll)}
              >
                {expandAll ? "Collapse All" : "Expand All"}
              </button>
              {selectedPackage.itinerary.map((item, index) => (
                <details key={index} open={expandAll} className="day-accordion">
                  <summary>{item.day}</summary>
                  <p>{item.detail}</p>
                </details>
              ))}
            </details>

            <button
              className="close-btn"
              onClick={() => setSelectedPackage(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* WHATSAPP BUTTON */}
      <a
        href="https://wa.me/917337864840"
        target="_blank"
        rel="noreferrer"
        className="whatsapp-btn"
      >
        <img
          src={whatsapp}
          alt="WhatsApp"
          style={{ width: "32px", height: "32px" }}
        />
      </a>
    </div>
  );
}
