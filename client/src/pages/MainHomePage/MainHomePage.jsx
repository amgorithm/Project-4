import React, { useState, useEffect } from "react";
import { foodWasteFacts } from "../../utils/foodService";
import "./MainHomePage.css";

function MainHomePage() {
  const [foodWasteInfo, setFoodWasteInfo] = useState();

  useEffect(() => {
    getFoodWasteFacts();
  }, []);

  async function getFoodWasteFacts() {
    const fact = await foodWasteFacts();
    setFoodWasteInfo(fact);
  }

  console.log(foodWasteInfo);

  return (
    <div className="homepage-body">
      <div className="waste-not-container">
        <div className="waste-not-info">
          <h2>Fight food waste.</h2>
          <h2>Save money.</h2>
          <h3>Waste Not, Want Not.</h3>
        </div>
        <div className="header-photo">
          <img
            src={require("../../images/food-waste-header.jpg")}
            alt="Recyling shopping bad"
            className="waste-not-header-photo"
          />
        </div>
      </div>

      <div className="waste-not-facts-container">
        <div className="food-waste-meaning">
          <h3>Food waste: what is it and why does it matter?</h3>
          <p>
            Food waste is
            <a
              href="https://www.fao.org/3/i3901e/i3901e.pdf"
              className="food-waste-definition"
              target="_blank"
              rel="noreferrer"
            >
              food produced for people that ends up being thrown away or left to
              spoil (FAO).
            </a>
            <span className="diagonal-arrow">↗</span>
          </p>
          <p>
            A large portion of all food produced globally goes to waste. The
            production of the wasted food strains natural resources such as
            water, land, energy, and labour. Food waste continues to wreak havoc
            not only on environmental health, but also on economic, population,
            and community health.
          </p>
        </div>
        <div className="food-waste-facts">
          <h4>Some more food for thought...</h4>
          <div className="fact">
            {foodWasteInfo ? (
              foodWasteInfo.map((fact) => (
                <div key={fact.id}>
                  <p>{fact.information}</p>
                </div>
              ))
            ) : (
              <p className="Loading-msg">Loading, please wait.</p>
            )}
          </div>
        </div>
      </div>

      <div className="waste-not-app-info">
        <h4>
          Waste Not helps you keep track of the food you have and its shelf life
        </h4>
        <div className="waste-not-infograph-container">
          <div className="waste-not-infograph">
            <div className="family-shopping">
              <img
                src={require("../../images/family-shopping.jpg")}
                alt="family-shopping"
                className="family-shopping-graph"
              />
              <p>Track food freshness</p>
            </div>

            <div className="user-analytics">
              <img
                src={require("../../images/user-analytics.jpg")}
                alt="family-shopping"
                className="user-analytics-graph"
              />
              <p>Get tailored food consumption and waste analytics</p>
            </div>

            <div className="saving-money">
              <img
                src={require("../../images/saving-money.jpg")}
                alt="family-shopping"
                className="saving-money-graph"
              />
              <p>Save money</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainHomePage;
