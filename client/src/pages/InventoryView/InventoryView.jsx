import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getFood, deleteFood } from "../../utils/foodService";
import useUser from "../../hooks/useUser";

function InventoryView() {
  const { user } = useUser();
  const { foodID } = useParams();
  let navigate = useNavigate();

  const [inventoryItem, setInventoryItem] = useState();

  useEffect(() => {
    getFoodData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodID]);

  async function getFoodData() {
    const item = await getFood(foodID);
    if (!item.id) {
      navigate("/inventory");
    }
    setInventoryItem(item);
  }

  const removeFood = () => {
    deleteFood(inventoryItem, foodID).then((res) => {
      console.log("deleted");
      navigate(`/inventory`);
    });
  };

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
