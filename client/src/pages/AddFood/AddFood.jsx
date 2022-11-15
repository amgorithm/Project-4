import React, { useState } from "react";
import { addAFood } from "../../utils/foodService";
import { useNavigate } from "react-router-dom";
import "./AddFood.css";

function AddFood() {
  let navigate = useNavigate();

  const [food, setFood] = useState({
    name: "",
    quantity: 1,
    expiry_date: "",
    category: 0,
  });

  const handleChange = (e) => {
    setFood({ ...food, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addAFood(food).then((res) => {
      console.log(res.data);
      navigate(`/inventory`);
    });
  };

  return (
    <div>
      <form className="add-food" onSubmit={handleSubmit}>
        <label>Name:</label>
        <input name="name" value={food.name} onChange={handleChange} />
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          value={food.quantity}
          onChange={handleChange}
        />
        <label>Expiry date:</label>
        <input
          type="date"
          name="expiry_date"
          value={food.expiry_date}
          onChange={handleChange}
        />

        <select name="category" value={food.category} onChange={handleChange}>
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
        <button>Add food</button>
      </form>
    </div>
  );
}

export default AddFood;
