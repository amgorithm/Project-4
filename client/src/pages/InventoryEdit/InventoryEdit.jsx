import React, { useState, useEffect } from "react";
import { updateFood, getFood } from "../../utils/foodService";
import { useNavigate, useParams } from "react-router-dom";
import "./InventoryEdit.css";
import useUser from "../../hooks/useUser";

function InventoryEdit() {
  const { user } = useUser();
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
    // if (!user) {
    //   navigate("/");
    //   return;
    // }
    async function getFoodData() {
      // ! Check navigation/converting issue
      const inventoryItem = await getFood(foodID);
      if (parseInt(foodID) !== inventoryItem.id) {
        navigate("/inventory");
      }

      setUpdateItem(inventoryItem);
    }

    getFoodData();
  }, [foodID]);

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
      console.log(res.data);
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
        {/* <label>Categories</label>
        <select
          name="category"
          value={updateItem.category}
          onChange={handleChange}
        > */}
        {/* <option hidden={true}>Select</option> */}
        {/* <option default={true} disabled>
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
        </select> */}
        <label>Categories</label>
        <select
          name="category"
          value={updateItem.category.name}
          onChange={handleChange}
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

        <label>Expiry date:</label>
        <input
          type="date"
          name="expiry_date"
          value={updateItem.expiry_date}
          onChange={handleChange}
        />
        <label>Consumed</label>
        <input
          type="radio"
          name="wasted"
          value={false}
          onChange={handleChange}
        />
        <label>Wasted</label>
        <input
          type="radio"
          name="wasted"
          value={true}
          onChange={handleChange}
        />
        <button>Update food</button>
      </form>
    </div>
  );
}

export default InventoryEdit;
