import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about">
      {/* <h1>About Us</h1> */}
      <h2>Who We Are</h2>
      <div className="whoWeR">
        <p>
          We are a passionate team of travel enthusiasts dedicated to turning
          your travel dreams into reality. With years of experience in the
          tourism industry, we specialize in crafting memorable journeys that go
          beyond ordinary sightseeing.
        </p>
        <p>
          Our goal is simple — to help travelers discover new places, cultures,
          and experiences with comfort, safety, and affordability. Whether it’s
          an exotic international getaway, a relaxing family vacation, or an
          adventurous trek, we make sure every trip is personalized to your
          needs.
        </p>
        <p>
          At our core, we believe that travel is not just about destinations —
          it’s about creating lifelong memories, building connections, and
          exploring the world in a meaningful way.
        </p>
      </div>
      <h2>What We Offer</h2>
      <h3>✈️ Travel Services</h3>
      <ul className="aboutPoints">
        <li>
          <strong>Customized Tour Packages</strong> – Tailor-made trips to match
          your preferences.
        </li>
        <li>
          <strong>Domestic & International Tours</strong> – Explore destinations
          worldwide.
        </li>
        <li>
          <strong>Flight & Hotel Bookings</strong> – Hassle-free reservations at
          the best prices.
        </li>
        <li>
          <strong>Visa & Travel Assistance</strong> – Guidance and support for
          smooth travel.
        </li>
        <li>
          <strong>Transportation & Transfers</strong> – Airport pick-up, drop,
          and local travel.
        </li>
      </ul>
      <h3>&#x1F30D; Types of Trips</h3>
      <ul className="aboutPoints">
        <li>
          <strong>Adventure Tours</strong> – Trekking, safaris, and outdoor
          activities.
        </li>
        <li>
          <strong>Family Vacations</strong> – Fun and safe packages for all
          ages.
        </li>
        <li>
          <strong>Luxury Travel</strong> – Premium stays and exclusive
          experiences.
        </li>
        <li>
          <strong>Honeymoon Packages</strong> – Romantic getaways for couples.
        </li>
        <li>
          <strong>Corporate Travel</strong> – Business trips, conferences, and
          group tours.
        </li>
        <li>
          <strong>Cultural & Heritage Trips</strong> – Explore history, art, and
          traditions.
        </li>
        <li>
          <strong>Pilgrimage & Spiritual Tours</strong> – Religious and
          spiritual journeys.
        </li>
      </ul>
      <h3>&#x1F31F; Special Add-ons</h3>
      <ul className="aboutPoints">
        <li>
          <strong>24/7 Customer Support</strong> – Assistance throughout your
          trip.
        </li>
        <li>
          <strong>Local Guides & Experiences</strong> – Authentic and immersive
          travel.
        </li>
        <li>
          <strong>Group Discounts & Offers</strong> – Affordable options for
          large groups.
        </li>
        <li>
          <strong>Sustainable Travel Options</strong> – Eco-friendly trips
          supporting local communities.
        </li>
      </ul>
    </div>
  );
}

export default About;
