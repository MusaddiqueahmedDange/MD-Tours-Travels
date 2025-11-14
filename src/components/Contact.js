import React from "react";
import "./Contact.css";
import { Button } from "@mui/material";

function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-info">
        <h2>Get in Touch With Us</h2>
        <ul>
          <li>
            📍 K M Centre, Opp. STC College, <br />
            Near Police Station, Banahatti, KA, 587311
          </li>
          <li>
            <a href="tel:+9178337864840">📞 +91 7337864840</a>
          </li>
          <li>
            <a href="mailto:mdtravels3o@gmail.com">✉️ mdtravels30@gmail.com</a>
          </li>
          <li>⏰ Monday – Saturday; 9:00 AM – 6:00 PM</li>
        </ul>

        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15529506.356995901!2d65.42490854999998!3d14.844020700772464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc7315da7da3c93%3A0x1518e45bc83158ed!2sM%20D%20Tours%20and%20Travels!5e1!3m2!1sen!2sin!4v1762847914709!5m2!1sen!2sin"
            referrerpolicy="no-referrer-when-downgrade"
            title="Google Map"
            height="200"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="contact-form">
        <form>
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <input type="text" placeholder="Subject" />
          <textarea placeholder="Message" rows="4" required></textarea>

          <Button
            style={{
              backgroundImage: "linear-gradient(to right, #183048, #356da5)",
            }}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
