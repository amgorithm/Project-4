import React, { useState, useEffect } from "react";
import { updateFood } from "../../utils/foodService";
import { useNavigate, useParams } from "react-router-dom";
import { getFood } from "../../utils/foodService";
import "./InventoryEdit.css";

function InventoryEdit() {
  let navigate = useNavigate();
  const { foodID } = useParams();
  const [updateItem, setUpdateItem] = useState({
    name: "",
    quantity: 1,
    expiry_date: "",
    category: 0,
  });

  useEffect(() => {
    if (!foodID) {
      return;
    }
    async function getFoodData() {
      const inventoryItem = await getFood(foodID);
      setUpdateItem(inventoryItem);
    }
    getFoodData();
  }, [foodID]);

  const handleChange = (e) => {
    setUpdateItem({ ...updateItem, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFood(updateItem, foodID).then((res) => {
      console.log(res.data);
      navigate(`/inventory-view/${foodID}`);
    });
  };

  return (
    <div>
      <form className="edit-food" onSubmit={handleSubmit}>
        <label>Name:</label>
        <input name="name" value={updateItem.name} onChange={handleChange} />
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          value={updateItem.quantity}
          onChange={handleChange}
        />
        <label>Expiry date:</label>
        <input
          type="date"
          name="expiry_date"
          value={updateItem.expiry_date}
          onChange={handleChange}
        />
        <label>Categories</label>
        <select
          name="category"
          value={updateItem.category}
          onChange={handleChange}
        >
          <option hidden={true}>Select</option>
          <option default={true} disabled>
            Category
          </option>
          <option value={1}>Grains</option>
          <option value={2}>Meat and Fish</option>
          <option value={3}>Fruits and Vegetables</option>
          <option value={4}>Dairy</option>
          <option value={5}>Snacks</option>
          <option value={6}>Frozen Food</option>
          <option value={7}>Condiments and Salad Dressings</option>
          <option value={8}>Beverages</option>
        </select>
        <button>Update food</button>
      </form>
    </div>
  );
}

export default InventoryEdit;
