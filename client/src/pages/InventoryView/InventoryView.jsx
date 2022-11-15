import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getFood } from "../../utils/foodService";

function InventoryView() {
  const [inventoryItem, setInventoryItem] = useState();

  const { foodID } = useParams();

  useEffect(() => {
    async function getFoodData() {
      const inventoryItem = await getFood(foodID);
      setInventoryItem(inventoryItem);
    }
    getFoodData();
  }, [foodID]);

  console.log(inventoryItem);
  return (
    <div>
      {inventoryItem ? (
        <div>
          <p>{inventoryItem.name}</p>
        </div>
      ) : (
        <p>No item</p>
      )}
    </div>
  );
}

export default InventoryView;
