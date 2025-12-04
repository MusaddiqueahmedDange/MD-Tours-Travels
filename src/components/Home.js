import React, { useState, useRef, useEffect } from "react";
import "./Home.css";
// MUI Components for Detail View
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import bali from "./International/IntImages/bali.png";
import dubai from "./International/IntImages/dubai.png";
import paris from "./International/IntImages/paris.png";
import domestic1 from "./International/IntImages/bali.png"; // Placeholder for domestic image
import domestic2 from "./International/IntImages/dubai.png"; // Placeholder for domestic image
import domestic3 from "./International/IntImages/paris.png"; // Placeholder for domestic image
import whatsapp from "../assets/whatsapp.png";
import HeroVideo1 from "/Users/musaddique/Desktop/travel-app/src/assets/hero1.mp4";
import HeroVideo2 from "/Users/musaddique/Desktop/travel-app/src/assets/hero2.mp4";
import HeroVideo3 from "/Users/musaddique/Desktop/travel-app/src/assets/hero3.mp4";

import image1 from "/Users/musaddique/Desktop/travel-app/src/assets/image1.png";
import image2 from "/Users/musaddique/Desktop/travel-app/src/assets/image2.png";

// Placeholder Inclusions/Exclusions for new packages
const defaultInclusions = [
  "Accommodation in 3/4 Star Hotels (Daily Breakfast included)",
  "All internal transfers (flights/trains not included)",
  "Sightseeing entrance fees as per itinerary",
];
const defaultExclusions = [
  "International/Domestic flights (unless specified)",
  "Visa fees and Travel Insurance",
  "Any personal expenses or tips",
];

// New Full-Page Component for Package Details (Refactored)
const PackageDetailView = ({ pkg, setExpandedPackage, whatsappNumber }) => {
  const [expandedDays, setExpandedDays] = useState({});

  const handleDayAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedDays((prevState) => ({
      ...prevState,
      [panel]: isExpanded,
    }));
  };

  const handleExpandAll = () => {
    const allExpanded = pkg.itinerary.reduce((acc, item, index) => {
      acc[`day-${index}`] = true;
      return acc;
    }, {});
    setExpandedDays(allExpanded);
  };

  const handleCollapseAll = () => {
    setExpandedDays({});
  };

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=I%20am%20interested%20in%20the%20${encodeURIComponent(
    pkg.title
  )}%20package%20(${
    pkg.days
  }%20Days).%20Please%20send%20me%20booking%20details.`;

  // 1. Overview Accordion Component
  const overviewAccordion = (
    <Accordion
      defaultExpanded
      className="detail-itinerary-accordion detail-overview-accordion"
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" className="accordion-main-title">
          Overview
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ul className="detail-info-list">
          <li>{pkg.overview}</li>
        </ul>
      </AccordionDetails>
    </Accordion>
  );

  // 2. Inclusions Accordion Component
  const inclusionsAccordion = (
    <Accordion
      defaultExpanded
      className="detail-itinerary-accordion detail-inclusions-accordion"
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" className="accordion-main-title">
          Inclusions
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ul className="inclusion-custom-list">
          {pkg.inclusions.map((item, index) => (
            <li key={`inc-${index}`}>{item}</li>
          ))}
        </ul>
      </AccordionDetails>
    </Accordion>
  );

  // 3. Exclusions Accordion Component
  const exclusionsAccordion = (
    <Accordion
      defaultExpanded
      className="detail-itinerary-accordion detail-exclusions-accordion"
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" className="accordion-main-title">
          Exclusions
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ul className="exclusion-custom-list">
          {pkg.exclusions.map((item, index) => (
            <li key={`exc-${index}`}>{item}</li>
          ))}
        </ul>
      </AccordionDetails>
    </Accordion>
  );

  return (
    <div className="destination-detail-page">
      {/* Detail Header Bar */}
      <div className="detail-navigation-header">
        <button
          className="back-to-list-button"
          onClick={() => setExpandedPackage(null)}
        >
          &larr; Back to Packages
        </button>
      </div>

      {/* Main Content Area */}
      <div className="detail-main-content">
        {/* LEFT COLUMN */}
        <div className="detail-primary-column">
          {/* Image */}
          <div className="detail-image-wrapper">
            <img
              src={pkg.image}
              alt={pkg.title}
              className="detail-hero-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/800x500/cccccc/333333?text=Package+Image+Unavailable";
              }}
            />
          </div>

          {/* Title and Duration Tag moved here, just below the image */}
          <div className="title-and-duration-info">
            <h2>{pkg.title}</h2>
            <span className="duration-label">
              <AccessTimeIcon className="duration-icon" />
              {pkg.days} Days / {pkg.nights} Nights
            </span>
          </div>

          {/* Overview for Mobile/Tablet */}
          <Box className="overview-mobile-container">{overviewAccordion}</Box>

          {/* Detailed Itinerary Accordion */}
          <Accordion defaultExpanded className="detail-itinerary-accordion">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" className="accordion-main-title">
                Detailed Itinerary
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* Expand/Collapse buttons for Detailed Itinerary */}
              <Box className="itinerary-action-controls">
                <Button
                  onClick={handleExpandAll}
                  variant="outlined"
                  size="small"
                  className="itinerary-toggle-button"
                >
                  Expand All
                </Button>
                <Button
                  onClick={handleCollapseAll}
                  variant="outlined"
                  size="small"
                  className="itinerary-toggle-button"
                >
                  Collapse All
                </Button>
              </Box>

              {/* Itinerary uses nested accordions */}
              {pkg.itinerary.map((item, index) => (
                <Accordion
                  key={index}
                  disableGutters
                  className="day-plan-accordion"
                  expanded={expandedDays[`day-${index}`] || false}
                  onChange={handleDayAccordionChange(`day-${index}`)}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1" component="div">
                      <span className="day-title-emphasis">
                        {item.day || `Day ${index + 1}`}:
                      </span>{" "}
                      {item.dayDesc || item.detail}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {/* Day Details content in ul li format */}
                    <ul className="day-detail-list">
                      <li>{item.detail}</li>
                    </ul>
                  </AccordionDetails>
                </Accordion>
              ))}
            </AccordionDetails>
          </Accordion>

          {/* Inclusions Accordion */}
          {inclusionsAccordion}

          {/* Exclusions Accordion */}
          {exclusionsAccordion}
        </div>

        {/* RIGHT COLUMN (Booking/Contact) */}
        <Box className="detail-secondary-column">
          {/* Overview for Desktop */}
          <Box className="overview-desktop-container">{overviewAccordion}</Box>

          {/* Booking/Contact Section */}
          <Box className="contact-action-box">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="whatsapp-contact-button"
            >
              <WhatsAppIcon />
              Contact us for Booking
            </a>
          </Box>
        </Box>
      </div>
    </div>
  );
};
// END PackageDetailView Component

export default function Home() {
  const videos = [HeroVideo1, HeroVideo2, HeroVideo3];
  const [currentVideo, setCurrentVideo] = useState(0);

  // States for Package View
  const [selectedPackage, setSelectedPackage] = useState(null);

  // States for Gallery Modal
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(null);

  // Carousel States and Refs
  const [activeIntIndex, setActiveIntIndex] = useState(0);
  const internationalCarouselRef = useRef(null);
  const [activeDomIndex, setActiveDomIndex] = useState(0);
  const domesticCarouselRef = useRef(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const galleryCarouselRef = useRef(null);

  // Package Data (Updated with Inclusions/Exclusions)
  const internationalPackages = [
    {
      id: 1,
      title: "Canary Islands (Spain)",
      image: bali,
      days: 5,
      nights: 4,
      overview:
        " The Canary Islands are a Spanish archipelago near Africa known for their year-round warm climate and volcanic landscapes. Popular islands include Tenerife, Gran Canaria, Lanzarote, and Fuerteventura, famous for beaches and adventure activities. It’s one of Europe’s top winter-sun destinations with diverse nature and resorts.",
      itinerary: [
        {
          day: "Day 1",
          dayDesc: "Fly from Bangalore → Tenerife (Spain)",
          detail: "Arrival and hotel check-in.",
        },
        {
          day: "Day 2",
          dayDesc: "Island hopping and snorkeling",
          detail:
            "Enjoy the beautiful beaches of Tenerife and a guided snorkeling trip to see the marine life.",
        },
        {
          day: "Day 3",
          dayDesc: "Water sports activities",
          detail:
            "Full day dedicated to Jet Skiing, Parasailing, and other thrilling water sports.",
        },
        {
          day: "Day 4",
          dayDesc: "Leisure day and spa relaxation",
          detail:
            "Explore the local markets or indulge in a volcanic mud spa treatment.",
        },
        {
          day: "Day 5",
          dayDesc: "Departure",
          detail:
            "Breakfast and transfer to Tenerife South Airport (TFS) for your flight home.",
        },
      ],
      inclusions: [
        ...defaultInclusions,
        "Inter-island ferry transfers (where applicable)",
        "Entrance to Teide National Park cable car",
      ],
      exclusions: defaultExclusions,
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
        {
          day: "Day 1",
          dayDesc: "Arrival and Marina Dhow Cruise",
          detail: "Transfer to hotel and evening Dhow Cruise with dinner.",
        },
        {
          day: "Day 2",
          dayDesc: "City tour and Burj Khalifa visit",
          detail:
            "Half-day city tour followed by a visit to the 124th floor of Burj Khalifa.",
        },
        {
          day: "Day 3",
          dayDesc: "Desert safari with BBQ dinner",
          detail:
            "Afternoon desert safari including dune bashing, camel rides, and BBQ dinner with cultural shows.",
        },
        {
          day: "Day 4",
          dayDesc: "Abu Dhabi full-day tour",
          detail:
            "Visit the Sheikh Zayed Grand Mosque and Ferrari World (outside view).",
        },
        {
          day: "Day 5",
          dayDesc: "Shopping and leisure day",
          detail: "Time for shopping at Dubai Mall and relaxing by the pool.",
        },
        {
          day: "Day 6",
          dayDesc: "Departure",
          detail:
            "Breakfast and check out. Transfer to Dubai International Airport (DXB).",
        },
      ],
      inclusions: [
        ...defaultInclusions,
        "Burj Khalifa ticket (non-prime hours)",
        "Desert Safari with BBQ Dinner",
      ],
      exclusions: defaultExclusions,
    },
    {
      id: 3,
      title: "Paris Getaway",
      image: paris,
      days: 7,
      nights: 6,
      overview: "Romantic Paris tour with Eiffel Tower and Louvre visits.",
      itinerary: [
        {
          day: "Day 1",
          dayDesc: "Arrival and Seine River Cruise",
          detail: "Check-in and evening boat tour on the Seine River.",
        },
        {
          day: "Day 2",
          dayDesc: "City tour and Eiffel Tower",
          detail:
            "Guided city tour covering major landmarks and ascend to the 2nd level of the Eiffel Tower.",
        },
        {
          day: "Day 3",
          dayDesc: "Louvre Museum and Notre Dame",
          detail:
            "Visit the Louvre Museum (Mona Lisa) and exterior view of Notre Dame Cathedral.",
        },
        {
          day: "Day 4",
          dayDesc: "Versailles Day trip",
          detail:
            "Full-day excursion to the Palace of Versailles and its gardens.",
        },
        {
          day: "Day 5",
          dayDesc: "Shopping and Montmartre",
          detail: "Explore the Montmartre neighborhood and enjoy shopping.",
        },
        {
          day: "Day 6",
          dayDesc: "Leisure day",
          detail: "Free day for optional tours or personal exploration.",
        },
        {
          day: "Day 7",
          dayDesc: "Departure",
          detail: "Transfer to Paris Charles de Gaulle Airport (CDG).",
        },
      ],
      inclusions: [
        ...defaultInclusions,
        "Eiffel Tower 2nd Level access ticket",
        "Louvre Museum entrance ticket",
      ],
      exclusions: defaultExclusions,
    },
    {
      id: 4,
      title: "Bali Adventure",
      image: bali,
      days: 6,
      nights: 5,
      overview: "Explore Bali’s beaches, temples, and culture.",
      itinerary: [
        {
          day: "Day 1",
          dayDesc: "Arrival and hotel check-in",
          detail:
            "Arrive at Denpasar (DPS), transfer to Ubud, and check into your hotel.",
        },
        {
          day: "Day 2",
          dayDesc: "Beach hopping and surfing",
          detail:
            "Full-day trip to Seminyak and Kuta beaches. Optional surfing lessons.",
        },
        {
          day: "Day 3",
          dayDesc: "Ubud tour",
          detail:
            "Visit Tegalalang Rice Terraces, Monkey Forest, and Tirta Empul Temple.",
        },
        {
          day: "Day 4",
          dayDesc: "Temple visits and cultural show",
          detail:
            "Visit Uluwatu Temple for sunset and watch the Kecak Dance performance.",
        },
        {
          day: "Day 5",
          dayDesc: "Leisure day",
          detail: "Free day for spa, shopping, or diving activities.",
        },
        {
          day: "Day 6",
          dayDesc: "Departure",
          detail:
            "Breakfast and transfer to Denpasar International Airport (DPS).",
        },
      ],
      inclusions: [
        ...defaultInclusions,
        "Entrance fees for all temples/attractions mentioned",
        "Kecak Dance Show ticket",
      ],
      exclusions: defaultExclusions,
    },
  ];

  const domesticPackages = [
    {
      id: 5,
      title: "Goa Beach Bliss",
      image: domestic1,
      days: 4,
      nights: 3,
      overview: "Enjoy the sun, sand, and shacks of Goa.",
      itinerary: [
        {
          day: "Day 1",
          dayDesc: "Arrival and North Goa sightseeing",
          detail:
            "Check into your North Goa hotel and visit Candolim and Baga beaches.",
        },
        {
          day: "Day 2",
          dayDesc: "Water sports and beach time",
          detail:
            "Day dedicated to water sports at Calangute beach and exploring local markets.",
        },
        {
          day: "Day 3",
          dayDesc: "South Goa exploration",
          detail:
            "Full-day trip to South Goa: Palolem beach and Old Goa Churches.",
        },
        {
          day: "Day 4",
          dayDesc: "Departure",
          detail:
            "Transfer to Goa International Airport (GOI) or Thivim Railway Station.",
        },
      ],
      inclusions: [
        ...defaultInclusions,
        "Full day North & South Goa sightseeing via AC coach/car",
      ],
      exclusions: defaultExclusions,
    },
    {
      id: 6,
      title: "Kerala Backwaters",
      image: domestic2,
      days: 5,
      nights: 4,
      overview: "Houseboat experience and lush greenery of Kerala.",
      itinerary: [
        {
          day: "Day 1",
          dayDesc: "Arrival in Kochi and transfer to Alleppey",
          detail:
            "Arrive at Kochi (COK) and transfer to Alleppey for a houseboat experience.",
        },
        {
          day: "Day 2",
          dayDesc: "Overnight Houseboat stay",
          detail:
            "Enjoy a day cruising the famous Kerala backwaters with all meals included on the houseboat.",
        },
        {
          day: "Day 3",
          dayDesc: "Munnar tea plantations",
          detail:
            "Transfer to Munnar (Hill Station). Check into the hotel and enjoy the evening.",
        },
        {
          day: "Day 4",
          dayDesc: "Local sightseeing",
          detail: "Visit Eravikulam National Park and Mattupetty Dam.",
        },
        {
          day: "Day 5",
          dayDesc: "Departure",
          detail: "Transfer back to Kochi (COK) for your onward journey.",
        },
      ],
      inclusions: [
        ...defaultInclusions,
        "One night stay in a private A/C Houseboat with all meals (Alleppey)",
      ],
      exclusions: defaultExclusions,
    },
    {
      id: 7,
      title: "Himalayan Trek (Manali)",
      image: domestic3,
      days: 7,
      nights: 6,
      overview: "Mountain views and adventure in Manali.",
      itinerary: [
        {
          day: "Day 1",
          dayDesc: "Arrival in Delhi, overnight bus to Manali",
          detail:
            "Arrive in Delhi and board the Volvo bus for an overnight journey to Manali.",
        },
        {
          day: "Day 2",
          dayDesc: "Check-in and local Manali tour",
          detail:
            "Arrive in Manali, check in, and visit Hadimba Devi Temple and Vashisht Village.",
        },
        {
          day: "Day 3",
          dayDesc: "Solang Valley",
          detail:
            "Full day excursion to Solang Valley for adventure activities (Paragliding, Zorbing).",
        },
        {
          day: "Day 4",
          dayDesc: "Rohtang Pass/Atal Tunnel day trip",
          detail:
            "Day trip to Rohtang Pass or Atal Tunnel (subject to permit/weather).",
        },
        {
          day: "Day 5",
          dayDesc: "Kullu sightseeing",
          detail: "Visit Kullu for River Rafting and shawl factory.",
        },
        {
          day: "Day 6",
          dayDesc: "Leisure day/Shopping",
          detail: "Enjoy the Mall Road and prepare for departure.",
        },
        {
          day: "Day 7",
          dayDesc: "Departure",
          detail:
            "Board the Volvo bus for the overnight journey back to Delhi.",
        },
      ],
      inclusions: [
        ...defaultInclusions,
        "Delhi-Manali-Delhi Volvo Bus tickets (Semi-Sleeper)",
        "Permits for Rohtang Pass/Atal Tunnel access",
      ],
      exclusions: [
        ...defaultExclusions,
        "Adventure activity costs (e.g., paragliding, rafting)",
      ],
    },
  ];

  const travelerGalleryImages = [
    { id: 101, src: image1, alt: "Urwah Baby" },
    { id: 102, src: image2, alt: "Our Visiting Card" },
    { id: 103, src: bali, alt: "Group photo on Bali beach" },
    { id: 104, src: domestic2, alt: "Family relaxing on Kerala houseboat" },
    { id: 105, src: domestic3, alt: "Trekking photo in Manali" },
  ];

  // Function to open the Gallery Modal (kept)
  const openGalleryModal = (image) => {
    setSelectedGalleryImage(image);
    setShowGalleryModal(true);
  };

  // --- Carousel Scroll Logic (unchanged) ---
  const handleScroll = (ref, setActiveIndex, isGallery = false) => {
    if (ref.current) {
      const cardWidth = isGallery
        ? ref.current.firstChild.offsetWidth + 15
        : ref.current.firstChild.offsetWidth + 30;
      const scrollLeft = ref.current.scrollLeft;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(index);
    }
  };

  const scrollTo = (ref, index, isGallery = false) => {
    if (ref.current && ref.current.firstChild) {
      const cardWidth = isGallery
        ? ref.current.firstChild.offsetWidth + 15
        : ref.current.firstChild.offsetWidth + 30;
      ref.current.scrollTo({
        left: cardWidth * index,
        behavior: "smooth",
      });
    }
  };

  const handleGalleryScroll = () =>
    handleScroll(galleryCarouselRef, setActiveGalleryIndex, true);
  const scrollToGalleryIndex = (index) =>
    scrollTo(galleryCarouselRef, index, true);
  const handleIntScroll = () =>
    handleScroll(internationalCarouselRef, setActiveIntIndex);
  const scrollToIntIndex = (index) => scrollTo(internationalCarouselRef, index);
  const handleDomScroll = () =>
    handleScroll(domesticCarouselRef, setActiveDomIndex);
  const scrollToDomIndex = (index) => scrollTo(domesticCarouselRef, index);

  useEffect(() => {
    const intCarousel = internationalCarouselRef.current;
    if (intCarousel) intCarousel.addEventListener("scroll", handleIntScroll);
    const domCarousel = domesticCarouselRef.current;
    if (domCarousel) domCarousel.addEventListener("scroll", handleDomScroll);
    const galleryCarousel = galleryCarouselRef.current;
    if (galleryCarousel)
      galleryCarousel.addEventListener("scroll", handleGalleryScroll);

    return () => {
      if (intCarousel)
        intCarousel.removeEventListener("scroll", handleIntScroll);
      if (domCarousel)
        domCarousel.removeEventListener("scroll", handleDomScroll);
      if (galleryCarousel)
        galleryCarousel.removeEventListener("scroll", handleGalleryScroll);
    };
  }, [travelerGalleryImages.length]);

  const handleVideoEnd = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
  };

  const whatsappNumber = "917337864840";

  // --- CONDITIONAL RENDERING ---
  if (selectedPackage) {
    return (
      <PackageDetailView
        pkg={selectedPackage}
        setExpandedPackage={setSelectedPackage}
        whatsappNumber={whatsappNumber}
      />
    );
  }
  // --- END CONDITIONAL RENDERING ---

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

      {/* INTERNATIONAL PACKAGE CAROUSEL */}
      <h2 className="section-title">
        ✈️ Top Selling International Destinations
      </h2>
      <div className="carousel-wrapper">
        <div className="package-carousel" ref={internationalCarouselRef}>
          {internationalPackages.map((pkg) => (
            <div key={pkg.id} className="package-card-wrapper">
              <div
                className="package-card"
                onClick={() => setSelectedPackage(pkg)} // OPENS FULL PAGE
              >
                <div className="package-img-container">
                  <img
                    src={pkg.image}
                    className="package-img"
                    alt={pkg.title}
                  />
                </div>
                <h3>{pkg.title}</h3>
                <p>
                  {pkg.days} Days / {pkg.nights} Nights
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="carousel-dots">
          {internationalPackages.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === activeIntIndex ? "active" : ""}`}
              onClick={() => scrollToIntIndex(index)}
            ></span>
          ))}
        </div>
      </div>

      {/* DOMESTIC PACKAGE CAROUSEL */}
      <h2 className="section-title">🇮🇳 Top Selling Domestic Destinations</h2>
      <div className="carousel-wrapper">
        <div className="package-carousel" ref={domesticCarouselRef}>
          {domesticPackages.map((pkg) => (
            <div key={pkg.id} className="package-card-wrapper">
              <div
                className="package-card"
                onClick={() => setSelectedPackage(pkg)} // OPENS FULL PAGE
              >
                <div className="package-img-container">
                  <img
                    src={pkg.image}
                    className="package-img"
                    alt={pkg.title}
                  />
                </div>
                <h3>{pkg.title}</h3>
                <p>
                  {pkg.days} Days / {pkg.nights} Nights
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="carousel-dots">
          {domesticPackages.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === activeDomIndex ? "active" : ""}`}
              onClick={() => scrollToDomIndex(index)}
            ></span>
          ))}
        </div>
      </div>

      {/* TRAVELER PHOTO GALLERY CAROUSEL */}
      <div className="gallery-section-container">
        <h2 className="section-title">📸 Happy Traveler Memories</h2>
        <div className="carousel-wrapper gallery-wrapper">
          <div className="gallery-carousel-track" ref={galleryCarouselRef}>
            {travelerGalleryImages.map((image) => (
              <div
                key={image.id}
                className="gallery-image-item"
                onClick={() => openGalleryModal(image)}
              >
                <img
                  src={image.src}
                  className="gallery-image"
                  alt={image.alt}
                />
                <p className="image-caption">{image.alt}</p>
              </div>
            ))}
          </div>
          <div className="carousel-dots gallery-dots">
            {travelerGalleryImages.map((_, index) => (
              <span
                key={index}
                className={`dot ${
                  index === activeGalleryIndex ? "active" : ""
                }`}
                onClick={() => scrollToGalleryIndex(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>
      {/* --- END HOME SCREEN STRUCTURE --- */}

      {/* GALLERY IMAGE MODAL (Lightbox - IMPLEMENTED HERE) */}
      {showGalleryModal && selectedGalleryImage && (
        <div
          className="modal-overlay gallery-modal-overlay"
          onClick={() => setShowGalleryModal(false)}
        >
          <div
            className="gallery-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className="modal-close-x"
              onClick={() => setShowGalleryModal(false)}
            >
              &times;
            </span>
            <img
              src={selectedGalleryImage.src}
              alt={selectedGalleryImage.alt}
              className="gallery-modal-image"
            />
            <p className="gallery-modal-caption">{selectedGalleryImage.alt}</p>
          </div>
        </div>
      )}

      {/* WHATSAPP BUTTON (Fixed on screen - unchanged) */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
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
