import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about">
      <div className="about-title">
        <h2>About</h2>
      </div>

      <div>
        <img
          src={require("../../images/food-track.jpg")}
          alt="grocery bag"
          className="about-img"
        />
      </div>
      <div className="about-info">
        <p>
          Waste Not helps you prevent food waste and money loss by tracking the
          freshness of your produce and getting analytics on what you have
          consumed or wasted.
        </p>
      </div>
    </div>
  );
}

export default About;
