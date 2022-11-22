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
    // ! Refresh related to this:
    // if (!user) {
    //   navigate("/");
    //   return;
    // }

    async function getFoodData() {
      const inventoryItem = await getFood(foodID);
      if (!inventoryItem.id) {
        navigate("/inventory");
        return;
      }
      // ! Check navigation route for nonexistent items
      if (parseInt(foodID) !== inventoryItem.id) {
        navigate("/inventory");
        return;
      }

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
