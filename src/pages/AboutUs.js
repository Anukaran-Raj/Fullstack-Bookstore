import React from "react";
import "./AboutUs.css"; // Import the CSS file

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-box">
        <h1 className="about-title">About Us</h1>
        <p className="about-text">
          Welcome toBook Store – your one-stop destination for all things books!
        </p>
        <div className="about-text">
          <p>
            At Book Store, we believe in the power of stories and knowledge.
            Whether you are an avid reader, a student looking for academic resources, or just exploring new genres,
            we have something for everyone.
          </p>
          <p>
            Our curated collection includes bestsellers, timeless classics, academic textbooks, and indie gems.
            We are dedicated to providing a seamless online book shopping experience with easy navigation, secure
            transactions, and fast deliveries.
          </p>
          <p>
            We are passionate about building a community of book lovers. Follow us for recommendations, reviews,
            and exclusive deals. Let’s turn pages together and embark on countless adventures through books!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
