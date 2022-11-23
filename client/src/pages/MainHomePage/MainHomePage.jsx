import React, { useState, useEffect } from "react";
import { foodWasteFacts } from "../../utils/foodService";

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
    <div>
      <h2>Food facts</h2>
      {/* {foodWasteInfo
        ? foodWasteInfo.map((fact) => (
            <>
              <p>{fact.information}</p>
            </>
          ))
        : null} */}
    </div>
  );
}

export default MainHomePage;
