import React, { useState } from "react";
import { addAFood } from "../../utils/foodService";
import { useNavigate } from "react-router-dom";
import "./AddFood.css";
// import useUser from "../../hooks/useUser";

function AddFood() {
  // const { user } = useUser();
  let navigate = useNavigate();

  const [food, setFood] = useState({
    name: "",
    quantity: 1,
    expiry_date: "",
    category: { name: "" },
  });

  const handleChange = (e) => {
    if (e.target.name === "category") {
      setFood({ ...food, category: { name: e.target.value } });
    } else {
      setFood({ ...food, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addAFood(food).then((res) => {
      // console.log(res.data);
      navigate(`/inventory`);
    });
  };

  const isFormInvalid = () => {
    return !(
      food.name &&
      food.quantity &&
      food.expiry_date &&
      food.category.name
    );
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
    <div className="add">
      <div className="add-title">
        <h2>Add</h2>
      </div>
      <div className="add-form-container">
        <form className="add-food" onSubmit={handleSubmit}>
          <div className="name-section">
            <div>
              <label>Name:</label>
            </div>

            <input
              name="name"
              value={food.name}
              onChange={handleChange}
              className="input-box"
            />
          </div>
          <div className="quantity-section">
            <div>
              <label>Quantity</label>
            </div>

            <input
              type="number"
              name="quantity"
              value={food.quantity}
              onChange={handleChange}
              className="input-box"
            />
          </div>

          <div className="expiry-section">
            <div>
              <label>Expiry date:</label>
            </div>

            <input
              type="date"
              name="expiry_date"
              value={food.expiry_date}
              onChange={handleChange}
              className="input-box-expiry"
            />
          </div>

          <div className="category-section">
            <div>
              <label>Category</label>
            </div>

            <select
              name="category"
              value={food.category.name}
              onChange={handleChange}
              className="input-select"
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
          </div>
          <div className="save-btn-container">
            <button disabled={isFormInvalid()} className="save-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddFood;
