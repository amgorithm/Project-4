import React, { useState } from "react";
import { addAFood } from "../../utils/foodService";
import { useNavigate } from "react-router-dom";
import "./AddFood.css";
import useUser from "../../hooks/useUser";

function AddFood() {
  const { user } = useUser();
  let navigate = useNavigate();

  const [food, setFood] = useState({
    name: "",
    quantity: 1,
    expiry_date: "",
    category: { name: "" },
  });

  const handleChange = (e) => {
    if (e.target.name === "category") {
      console.log(food);
      setFood({ ...food, category: { name: e.target.value } });
    } else {
      console.log(food);
      setFood({ ...food, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addAFood(food).then((res) => {
      console.log(res.data);
      navigate(`/inventory`);
    });
  };

  const foodCategories = [
    "Grains",
    "Meat and Fish",
    "Fruits and Vegetables",
    "Dairy",
    "Snacks",
    "Frozen Food",
    "Condiments and Salad Dressings",
    "Beverages",
  ];

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
        <label>Categories</label>
        <select
          name="category"
          value={food.category.name}
          onChange={handleChange}
        >
          <option hidden={true}>Select</option>
          <option default={true} disabled>
            Category
          </option>
          {foodCategories.map((option) => {
            const key = option.replaceAll(" ", "-");
            return (
              <option value={option} key={key}>
                {option}
              </option>
            );
          })}
        </select>
        <button>Add food</button>
      </form>
    </div>
  );
}

export default AddFood;
