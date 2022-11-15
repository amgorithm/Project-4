import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getFoods } from "../../utils/foodService";

function Inventory() {
  const [inventory, setInventory] = useState();

  useEffect(() => {
    getFoodData();
  }, []);

  async function getFoodData() {
    const inventory = await getFoods();
    setInventory(inventory);
    // getFoods()
    //   .then((res) => {
    //     setInventory(res);
    //   })
    //   .catch((err) => console.log(err));
  }

  console.log(inventory);
  return (
    <div>
      {inventory ? (
        <div>
          {inventory.map((food) => (
            <Link to={`/inventory-view/${food.id}/`} key={food.name}>
              <p>{food.name}</p>
            </Link>
          ))}
          <p></p>
        </div>
      ) : (
        <p>No items</p>
      )}
    </div>
  );
}

export default Inventory;
