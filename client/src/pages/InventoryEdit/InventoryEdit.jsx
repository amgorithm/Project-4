import React, { useState, useEffect } from "react";
import { updateFood, getFood } from "../../utils/foodService";
import { useNavigate, useParams } from "react-router-dom";
import "./InventoryEdit.css";
// import useUser from "../../hooks/useUser";

function InventoryEdit() {
  // const { user } = useUser();
  let navigate = useNavigate();
  const { foodID } = useParams();

  const [updateItem, setUpdateItem] = useState({
    name: "",
    quantity: 1,
    expiry_date: "",
    category: { name: "" },
    wasted: false,
  });

  useEffect(() => {
    getFoodData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodID]);

  async function getFoodData() {
    const inventoryItem = await getFood(foodID);
    if (!inventoryItem.id) {
      navigate("/inventory");
    }
    setUpdateItem(inventoryItem);
  }

  const handleChange = (e) => {
    if (e.target.name === "wasted") {
      setUpdateItem({ ...updateItem, wasted: e.target.value });
    } else if (e.target.name === "category") {
      setUpdateItem({
        ...updateItem,
        category: {
          name: e.target.value,
          id: e.target.getAttribute("data-id"),
        },
      });
    } else {
      setUpdateItem({ ...updateItem, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFood(updateItem, foodID).then((res) => {
      // console.log(res.data);
      navigate(`/inventory`);
    });
  };

  const foodCategories = [
    { id: 1, name: "Grains" },
    { id: 2, name: "Meat and Fish" },
    { id: 3, name: "Fruits and Vegetables" },
    { id: 4, name: "Dairy" },
    { id: 5, name: "Snacks" },
    { id: 6, name: "Frozen Food" },
    { id: 7, name: "Condiments and Salad Dressings" },
    { id: 8, name: "Beverages" },
  ];

  return (
    <div className="update">
      <div className="update-title">
        <h2>Update</h2>
      </div>

      <div className="update-form-container">
        <form className="update-food-form" onSubmit={handleSubmit}>
          <div className="name-section">
            <div>
              <label>Name</label>
            </div>

            <input
              name="name"
              value={updateItem.name}
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
              value={updateItem.quantity}
              onChange={handleChange}
              className="input-box"
            />
          </div>

          <div className="expiry-section">
            <div>
              <label>Expiry date</label>
            </div>

            <input
              type="date"
              name="expiry_date"
              value={updateItem.expiry_date}
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
              value={updateItem.category.name}
              onChange={handleChange}
              className="input-select"
            >
              <option hidden={true}>Select</option>
              <option default={true} disabled>
                Category
              </option>
              {foodCategories.map((option) => {
                const key = option.name.replaceAll(" ", "-");
                return (
                  <option value={option.name} data-id={option.id} key={key}>
                    {option.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="wasted-status wasted-form">
            <div className="consumed">
              <div className="consumed-label">
                <label>Consumed</label>
              </div>

              <input
                type="radio"
                name="wasted"
                value={false}
                onChange={handleChange}
              />
            </div>
            <div className="wasted">
              <div className="wasted-label">
                <label>Wasted</label>
              </div>

              <input
                type="radio"
                name="wasted"
                value={true}
                onChange={handleChange}
              />
            </div>
          </div>

          <button className="update-btn">Update food</button>
        </form>
      </div>
    </div>
  );
}

export default InventoryEdit;
