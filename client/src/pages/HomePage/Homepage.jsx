import React, { useState, useEffect } from "react";
import {
  orangeExpiryDate,
  yellowExpiryDate,
  greenExpiryDate,
  redExpiryDate,
} from "../../utils/foodService";

function Homepage() {
  // const [expires, setExpires] = useState();
  const [orange, setOrange] = useState();
  const [yellow, setYellow] = useState();
  const [green, setGreen] = useState();
  const [red, setRed] = useState();

  useEffect(() => {
    //
    getOrangeExpiryDate();
    getYellowExpiryDate();
    getGreenExpiryDate();
    getRedExpiryDate();
  }, []);

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

  console.log("orange", orange);
  console.log("yellow", yellow);
  console.log("red", red);
  return (
    <div>
      <h4>Today:</h4>
      {red ? (
        <div>
          {red.map((food) => (
            <div>{food.name}</div>
          ))}
        </div>
      ) : (
        <p>No items</p>
      )}

      <h4>1-3 days:</h4>
      {orange ? (
        <div>
          {orange.map((food) => (
            <div>{food.name}</div>
          ))}
        </div>
      ) : (
        <p>No items</p>
      )}

      <h4>4-5 days:</h4>
      {yellow ? (
        <div>
          {yellow.map((food) => (
            <>{food.name}</>
          ))}
        </div>
      ) : (
        <p>No items</p>
      )}
      <h4>6-7 days:</h4>
      {green ? (
        <div>
          {green.map((food) => (
            <div>{food.name}</div>
          ))}
        </div>
      ) : (
        <p>No items</p>
      )}
    </div>
  );
}

export default Homepage;
