import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  orangeExpiryDate,
  yellowExpiryDate,
  greenExpiryDate,
  redExpiryDate,
  wasteUnactionedList,
} from "../../utils/foodService";
// import useUser from "../../hooks/useUser";
import "./UserHomePage.css";

function Homepage() {
  // const { user } = useUser();
  // let navigate = useNavigate();

  const [unactioned, setUnactioned] = useState([]);
  const [orange, setOrange] = useState([]);
  const [yellow, setYellow] = useState([]);
  const [green, setGreen] = useState([]);
  const [red, setRed] = useState([]);

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
        <div className="day-container">
          {red ? (
            <>
              {red.map((food) => (
                <div className="day-card" key={food.id}>
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
                    <p>{food.quantity} stock</p>
                    <p>-</p>
                    <p>{food.expiry_date}</p>
                  </div>
                  <hr className="user-homepage-hr" />
                </div>
              ))}
            </>
          ) : null}
        </div>

        <div className="day-container">
          {orange ? (
            <>
              {orange.map((food) => (
                <div className="day-card" key={food.id}>
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

                    <div className="orange-tag">
                      <h4>1 - 3 days</h4>
                    </div>
                  </div>

                  <div className="user-food-info">
                    <p>{food.quantity} stock</p>
                    <p>-</p>
                    <p>{food.expiry_date}</p>
                  </div>
                  <hr className="user-homepage-hr" />
                </div>
              ))}
            </>
          ) : null}
        </div>

        <div className="day-container">
          {yellow ? (
            <>
              {yellow.map((food) => (
                <div className="day-card" key={food.id}>
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

                    <div className="yellow-tag">
                      <h4>4 - 5 days</h4>
                    </div>
                  </div>

                  <div className="user-food-info">
                    <p>{food.quantity} stock</p>
                    <p>-</p>
                    <p>{food.expiry_date}</p>
                  </div>
                  <hr className="user-homepage-hr" />
                </div>
              ))}
            </>
          ) : null}
        </div>

        <div className="day-container">
          {green ? (
            <>
              {green.map((food) => (
                <div className="day-card" key={food.id}>
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

                    <div className="green-tag">
                      <h4>6 - 7 days</h4>
                    </div>
                  </div>

                  <div className="user-food-info">
                    <p>{food.quantity} stock</p>
                    <p>-</p>
                    <p>{food.expiry_date}</p>
                  </div>
                  <hr className="user-homepage-hr" />
                </div>
              ))}
            </>
          ) : null}
        </div>
      </div>

      <div className="user-homepage-unactioned-container">
        {unactioned.length > 0 ? (
          <div className="unactioned-card">
            <div className="user-homepage-unactioned-title">
              <h2>Unactioned</h2>
              <img
                src={require("../../images/warning.png")}
                alt="warning"
                className="warning"
              />
            </div>

            <div className="unactioned-subtitle">
              <h3>
                Track your food waste by updating the waste status of expired
                foods
              </h3>
            </div>

            {unactioned.map((food) => (
              <div className="unactioned-card" key={food.id}>
                <Link
                  to={`/expired-inventory-view/${food.id}/`}
                  key={food.id}
                  style={{ color: "#bebebe" }}
                >
                  <h4>
                    {food.name} <span className="unactioned-arrow">↗</span>
                  </h4>
                </Link>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Homepage;
