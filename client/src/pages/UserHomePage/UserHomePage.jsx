import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  orangeExpiryDate,
  yellowExpiryDate,
  greenExpiryDate,
  redExpiryDate,
  wasteUnactionedList,
} from "../../utils/foodService";
import useUser from "../../hooks/useUser";
import "./UserHomePage.css";

function Homepage() {
  const { user } = useUser();
  let navigate = useNavigate();

  const [unactioned, setUnactioned] = useState();
  const [orange, setOrange] = useState();
  const [yellow, setYellow] = useState();
  const [green, setGreen] = useState();
  const [red, setRed] = useState();

  useEffect(() => {
    getUnactioned();
    getOrangeExpiryDate();
    getYellowExpiryDate();
    getGreenExpiryDate();
    getRedExpiryDate();
  }, []);

  // Unactioned
  async function getUnactioned() {
    const unactioned = await wasteUnactionedList();
    setUnactioned(unactioned);
  }

  // Red
  async function getRedExpiryDate() {
    const red = await redExpiryDate();
    setRed(red);
  }

  // Orange
  async function getOrangeExpiryDate() {
    const orange = await orangeExpiryDate();
    setOrange(orange);
  }

  // Yellow
  async function getYellowExpiryDate() {
    const yellow = await yellowExpiryDate();
    setYellow(yellow);
  }

  // Green
  async function getGreenExpiryDate() {
    const green = await greenExpiryDate();
    setGreen(green);
  }

  return (
    <div className="user-homepage">
      <div className="user-homepage-title">
        <h2>
          This week in your
          <span>
            {" "}
            <Link to={"/inventory"} style={{ color: "#43572c" }}>
              inventory
            </Link>{" "}
          </span>{" "}
          <span className="inventory-arrow">↗</span>
        </h2>
      </div>

      <div className="this-week-container">
        <div className="today-container">
          {red ? (
            <>
              {red.map((food) => (
                <div className="today-card">
                  <div className="title-tag">
                    <div className="user-food-title">
                      <Link
                        to={`/inventory-view/${food.id}/`}
                        key={food.id}
                        style={{ textDecoration: "none" }}
                      >
                        <h3>{food.name}</h3>
                      </Link>
                    </div>

                    <div className="today-tag">
                      <h4>Today</h4>
                    </div>
                  </div>

                  <div className="user-food-info">
                    <p>{food.quantity} piece</p>
                    <p>-</p>
                    <p>{food.expiry_date}</p>
                  </div>
                  <hr className="user-homepage-hr" />
                </div>
              ))}
            </>
          ) : (
            <p>No items</p>
          )}
        </div>

        <h4>1-3 days:</h4>
        {orange ? (
          <div>
            {orange.map((food) => (
              <Link to={`/inventory-view/${food.id}/`} key={food.id}>
                <div>{food.name}</div>
              </Link>
            ))}
          </div>
        ) : (
          <p>No items</p>
        )}

        <h4>4-5 days:</h4>
        {yellow ? (
          <div>
            {yellow.map((food) => (
              <Link to={`/inventory-view/${food.id}/`} key={food.id}>
                <div>{food.name}</div>
              </Link>
            ))}
          </div>
        ) : (
          <p>No items</p>
        )}
        <h4>6-7 days:</h4>
        {green ? (
          <div>
            {green.map((food) => (
              <Link to={`/inventory-view/${food.id}/`} key={food.id}>
                <div>{food.name}</div>
              </Link>
            ))}
          </div>
        ) : (
          <p>No items</p>
        )}
      </div>

      <div className="unactioned-container">
        <h4>Unactioned expired foods:</h4>
        {unactioned ? (
          <>
            {unactioned.map((food) => (
              <Link to={`/expired-inventory-view/${food.id}/`} key={food.id}>
                <div>
                  <p>{food.name}</p>
                </div>
              </Link>
            ))}
          </>
        ) : (
          <p>No items</p>
        )}
      </div>
    </div>
  );
}

export default Homepage;
