import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getFood, deleteFood } from "../../utils/foodService";

function InventoryView() {
  const [inventoryItem, setInventoryItem] = useState();

  const { foodID } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    async function getFoodData() {
      const inventoryItem = await getFood(foodID);
      setInventoryItem(inventoryItem);
    }
    getFoodData();
  }, [foodID]);

  const removeFood = () => {
    deleteFood(inventoryItem, foodID).then((res) => {
      console.log("deleted");
      navigate(`/inventory`);
    });
  };
  // TODO: Add a consumed/wasted button

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
      <Link to={`/inventory-edit/${foodID}`}>
        <button>Edit</button>
      </Link>
      <button onClick={removeFood}>Delete</button>
    </div>
  );
}

export default InventoryView;
