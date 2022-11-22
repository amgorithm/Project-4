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

function Homepage() {
  const { user } = useUser();
  let navigate = useNavigate();
  // const [expires, setExpires] = useState();
  const [unactioned, setUnactioned] = useState();
  const [orange, setOrange] = useState();
  const [yellow, setYellow] = useState();
  const [green, setGreen] = useState();
  const [red, setRed] = useState();

  useEffect(() => {
    // if (!user) {
    //   navigate("/");
    //   return;
    // }
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

  // console.log("orange", orange);
  // console.log("yellow", yellow);
  // console.log("red", red);
  return (
    <div>
      <h4>Unactioned expired foods:</h4>
      {unactioned ? (
        <div>
          {unactioned.map((food) => (
            <Link to={`/expired-inventory-view/${food.id}/`} key={food.id}>
              <div>{food.name}</div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No items</p>
      )}

      <h4>Today:</h4>
      {red ? (
        <div>
          {red.map((food) => (
            <Link to={`/inventory-view/${food.id}/`} key={food.id}>
              <div>{food.name}</div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No items</p>
      )}

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
  );
}

export default Homepage;
