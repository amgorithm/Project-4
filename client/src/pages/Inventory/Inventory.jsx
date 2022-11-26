import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getFoods } from "../../utils/foodService";
import useUser from "../../hooks/useUser";

function Inventory() {
  const { user } = useUser();
  let navigate = useNavigate();
  const [inventory, setInventory] = useState();

  useEffect(() => {
    getFoodData();
  }, []);

  async function getFoodData() {
    const inventory = await getFoods();
    setInventory(inventory);
  }

  console.log(user);
  return (
    <div>
      <Link to={"/inventory-add"}>
        <h4>Add items</h4>
      </Link>

      {inventory ? (
        <div>
          {inventory &&
            inventory.map((food) => (
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
