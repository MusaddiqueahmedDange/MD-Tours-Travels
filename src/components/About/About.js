import React, { useState } from "react";
import "./About.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import teamMembers from "./AboutData";
import partners from "./tradePrtners";
import hotels from "./hotelPartners";
import reviews from "./Reviews";

const Stars = ({ count }) => (
  <div className="stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < count ? "star filled" : "star"}>
        ★
      </span>
    ))}
  </div>
);

// simple clean arrows
const NextArrow = ({ onClick }) => (
  <button className="arrow next" onClick={onClick} aria-label="Next">
    ▶
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button className="arrow prev" onClick={onClick} aria-label="Previous">
    ◀
  </button>
);

function About() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  const settingsReview = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3500,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 2 } },
      { breakpoint: 900, settings: { slidesToShow: 1 } }, // 📱 Always 1 on tablets
      { breakpoint: 600, settings: { slidesToShow: 1 } }, // 📱 Always 1 on mobile
      { breakpoint: 480, settings: { slidesToShow: 1 } }, // 📱 Always 1 on very small screen
    ],
  };

  const [selectedMember, setSelectedMember] = useState(null);
  const handleClose = () => setSelectedMember(null);
  const [modalData, setModalData] = useState(null);

  return (
    <div className="about">
      {/* <h1>About Us</h1> */}

      <div className="whoWeR">
        <h2 style={{ color: "Black" }}>Who We Are</h2>
        <p>
          <b>M D Tours and Travels</b> is a premier travel company based in
          Karnataka, dedicated to curating exceptional travel experiences across
          India and around the world. With a focus on comfort, quality, and
          personalization, we specialize in luxury holidays, Char Dham Yatra,
          Hindu pilgrimage tours, Umrah packages, honeymoon getaways, and
          adventure tourism, as well as exclusive international vacations
          tailored to each traveler’s preferences.
        </p>
        <p>
          Our team of seasoned travel professionals ensures every detail is
          handled with precision — from seamless flight and hotel arrangements
          to visa assistance, travel insurance, and private transfers. We take
          pride in offering family holidays, corporate tours, group travel, and
          customized itineraries designed to match your interests, pace, and
          budget.
        </p>
        <p>
          Whether it’s a serene spiritual journey, a romantic escape, a
          thrilling adventure, or a luxurious global expedition,{" "}
          <b>M D Tours and Travels</b> delivers excellence at every step. Guided
          by trust, transparency, and personalized service, we continue to be
          Karnataka’s most preferred partner for meaningful and memorable travel
          experiences across the world.
        </p>

        <h2>What We Offer</h2>
        <p>
          We offer a wide range of travel solutions including domestic and
          international tour packages, honeymoon trips, adventure tours, and
          luxury holidays tailored to your style. Our expertise extends to Char
          Dham Yatra, Hindu pilgrimage tours, and Umrah packages with complete
          travel assistance. From flight bookings and visa support to hotel
          arrangements and private transfers, we handle every detail with care.
          With personalized planning and 24/7 support,{" "}
          <b>M D Tours and Travels </b>ensures every journey is seamless,
          comfortable, and unforgettable.
        </p>
      </div>

      {/* Meet th team section */}
      <div>
        <section className="team-section">
          <h2 className="team-heading">Meet the Team</h2>
          <p className="team-text">
            The passionate travel experts behind your unforgettable journeys.
          </p>

          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="team-card"
                onClick={() => setSelectedMember(member)}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="team-image"
                />
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
              </div>
            ))}
          </div>

          {selectedMember && (
            <div className="modal-overlay" onClick={handleClose}>
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <button className="close-btn" onClick={handleClose}>
                  &times;
                </button>
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="modal-image"
                />
                <h3 className="modal-name">{selectedMember.name}</h3>
                <p className="modal-role">{selectedMember.role}</p>
                <p className="modal-bio">{selectedMember.bio}</p>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Airline partners section */}
      <dv>
        <section className="partners-section">
          <h2 className="partners-heading">Our Trade & Airline Partners</h2>
          <p className="partners-text">
            We collaborate with leading airlines and travel partners worldwide
            to bring you the best connectivity and comfort.
          </p>

          <div className="carousel-container">
            <Slider {...settings}>
              {partners.map((partner, index) => (
                <div key={index} className="partner-slide">
                  <div className="partner-card">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="partner-logo"
                    />
                    {/* <p className="partner-name">{partner.name}</p> */}
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>
      </dv>

      {/* Hotel Prtners Section */}
      <div>
        <section className="hotels-section">
          <h2 className="hotels-heading">Our Hotel & Hospitality Partners</h2>
          <p className="hotels-text">
            We partner with world-class hotels and resorts to ensure your stay
            is as luxurious and comfortable as your journey.
          </p>

          <div className="carousel-container">
            <Slider {...settings}>
              {hotels.map((hotel, index) => (
                <div key={index} className="hotel-slide">
                  <div className="hotel-card">
                    <img
                      src={hotel.logo}
                      alt={hotel.name}
                      className="hotel-logo"
                    />
                    {/* <p className="hotel-name">{hotel.name}</p> */}
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>
      </div>

      {/* Reviews section */}
      <div>
        <section className="reviews-section">
          <h2 className="reviews-heading">What Our Travelers Say</h2>
          <p className="reviews-subtitle">
            We take pride in creating memorable journeys for our clients. Here’s
            what they have to say!
          </p>

          <div className="reviews-carousel">
            <Slider {...settingsReview}>
              {reviews.map((review, index) => {
                const shortText =
                  review.text.length > 120
                    ? review.text.substring(0, 120) + "..."
                    : review.text;

                return (
                  <div key={index} className="review-card">
                    <img
                      src={review.photo}
                      alt={review.name}
                      className="review-photo"
                    />
                    <p className="review-text">“{shortText}”</p>
                    {review.text.length > 120 && (
                      <button
                        className="view-more"
                        onClick={() => setModalData(review)}
                      >
                        View More
                      </button>
                    )}
                    <Stars count={review.rating} />
                    <h4 className="review-name">{review.name}</h4>
                  </div>
                );
              })}
            </Slider>
          </div>

          {/* Modal */}
          {modalData && (
            <div className="modal-overlay" onClick={() => setModalData(null)}>
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="modal-close"
                  onClick={() => setModalData(null)}
                >
                  ✕
                </button>
                <img
                  src={modalData.photo}
                  alt={modalData.name}
                  className="modal-photo"
                />
                <h3 className="modal-name">{modalData.name}</h3>
                <Stars count={modalData.rating} />
                <p className="modal-text">“{modalData.text}”</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default About;
