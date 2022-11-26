import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getFoods } from "../../utils/foodService";
import useUser from "../../hooks/useUser";
import "./Inventory.css";

function Inventory() {
  const { user } = useUser();
  let navigate = useNavigate();
  const [inventory, setInventory] = useState();

  useEffect(() => {
    getFoodData();
  }, []);

  async function getFoodData() {
    const inventory = await getFoods();
    setInventory(inventory);
  }

  console.log(inventory);
  return (
    <div className="inventory">
      {/* {inventory ? (
        <div>
          {inventory.map((food) => (
            <Link to={`/inventory-view/${food.id}/`} key={food.name}>
              <p>{food.name}</p>
            </Link>
          ))}
          <p></p>
        </div>
      ) : (
        <p>No items</p>
      )} */}
      <div className="inventory-title">
        <h2>Your inventory</h2>
      </div>

      {inventory ? (
        <div className="inventory-container">
          {inventory.map((food) => {
            if (food.category.id === 1) {
              return (
                <div className="inventory-item-container">
                  <div className="item-left">
                    <div className="category">
                      <img
                        src={require("../../images/grains.png")}
                        alt="grains"
                        className="category-icon"
                      />
                    </div>
                    <div className="food-name">
                      <Link
                        to={`/inventory-view/${food.id}/`}
                        style={{ textDecoration: "none", color: "#509498" }}
                        key={food.name}
                      >
                        <h3>{food.name}</h3>
                      </Link>
                    </div>
                  </div>

                  <div className="item-right">
                    <p className="number">{food.quantity} </p>
                    <p className="quantity">stock</p>
                    <p className="date">{food.created_at}</p>
                  </div>
                </div>
              );
            } else if (food.category.id === 2) {
              return (
                <div className="inventory-item-container">
                  <div className="item-left">
                    <div className="category">
                      <img
                        src={require("../../images/meat-and-fish.png")}
                        alt="meat and fish"
                        className="category-icon"
                      />
                    </div>

                    <div className="food-name">
                      <Link
                        to={`/inventory-view/${food.id}/`}
                        style={{ textDecoration: "none", color: "#509498" }}
                        key={food.name}
                      >
                        <h3>{food.name}</h3>
                      </Link>
                    </div>
                  </div>

                  <div className="item-right">
                    <p className="number">{food.quantity} </p>
                    <p className="quantity">stock</p>
                    <p className="date">{food.created_at}</p>
                  </div>
                </div>
              );
            } else if (food.category.id === 3) {
              return (
                <div className="inventory-item-container">
                  <div className="item-left">
                    <div className="category">
                      <img
                        src={require("../../images/fruits-and-vegetables.png")}
                        alt="fruits and vegetables"
                        className="category-icon"
                      />
                    </div>

                    <div className="food-name">
                      <Link
                        to={`/inventory-view/${food.id}/`}
                        style={{ textDecoration: "none", color: "#509498" }}
                        key={food.name}
                      >
                        <h3>{food.name}</h3>
                      </Link>
                    </div>
                  </div>

                  <div className="item-right">
                    <p className="number">{food.quantity} </p>
                    <p className="quantity">stock</p>
                    <p className="date">{food.created_at}</p>
                  </div>
                </div>
              );
            } else if (food.category.id === 4) {
              return (
                <div className="inventory-item-container">
                  <div className="item-left">
                    <div className="category">
                      <img
                        src={require("../../images/dairy.png")}
                        alt="dairy"
                        className="category-icon"
                      />
                    </div>
                    <div className="food-name">
                      <Link
                        to={`/inventory-view/${food.id}/`}
                        style={{ textDecoration: "none", color: "#509498" }}
                        key={food.name}
                      >
                        <h3>{food.name}</h3>
                      </Link>
                    </div>
                  </div>

                  <div className="item-right">
                    <p className="number">{food.quantity} </p>
                    <p className="quantity">stock</p>
                    <p className="date">{food.created_at}</p>
                  </div>
                </div>
              );
            } else if (food.category.id === 5) {
              return (
                <div className="inventory-item-container">
                  <div className="item-left">
                    <div className="category">
                      <img
                        src={require("../../images/snacks.png")}
                        alt="snacks"
                        className="category-icon"
                      />
                    </div>

                    <div className="food-name">
                      <Link
                        to={`/inventory-view/${food.id}/`}
                        style={{ textDecoration: "none", color: "#509498" }}
                        key={food.name}
                      >
                        <h3>{food.name}</h3>
                      </Link>
                    </div>
                  </div>
                  <div className="item-right">
                    <p className="number">{food.quantity} </p>
                    <p className="quantity">stock</p>
                    <p className="date">{food.created_at}</p>
                  </div>
                </div>
              );
            } else if (food.category.id === 6) {
              return (
                <div className="inventory-item-container">
                  <div className="item-left">
                    <div className="category">
                      <img
                        src={require("../../images/frozen-food.png")}
                        alt="frozen food"
                        className="category-icon"
                      />
                    </div>
                    <div className="food-name">
                      <Link
                        to={`/inventory-view/${food.id}/`}
                        style={{ textDecoration: "none", color: "#509498" }}
                        key={food.name}
                      >
                        <h3>{food.name}</h3>
                      </Link>
                    </div>
                  </div>
                  <div className="item-right">
                    <p className="number">{food.quantity} </p>
                    <p className="quantity">stock</p>
                    <p className="date">{food.created_at}</p>
                  </div>
                </div>
              );
            } else if (food.category.id === 7) {
              return (
                <div className="inventory-item-container">
                  <div className="item-left">
                    <div className="category">
                      <img
                        src={require("../../images/condiments-and-salad-dressings.png")}
                        alt="condiments and salad dressings"
                        className="category-icon"
                      />
                    </div>

                    <div className="food-name">
                      <Link
                        to={`/inventory-view/${food.id}/`}
                        style={{ textDecoration: "none", color: "#509498" }}
                        key={food.name}
                      >
                        <h3>{food.name}</h3>
                      </Link>
                    </div>
                  </div>

                  <div className="item-right">
                    <p className="number">{food.quantity}</p>
                    <p className="quantity">stock</p>
                    <p className="date">{food.created_at}</p>
                  </div>
                </div>
              );
            } else if (food.category.id === 8) {
              return (
                <div className="inventory-item-container">
                  <div className="item-left">
                    <div className="category">
                      <img
                        src={require("../../images/beverages.png")}
                        alt="beverages"
                        className="category-icon"
                      />
                    </div>

                    <div className="food-name">
                      <Link
                        to={`/inventory-view/${food.id}/`}
                        style={{ textDecoration: "none", color: "#509498" }}
                        key={food.name}
                      >
                        <h3>{food.name}</h3>
                      </Link>
                    </div>
                  </div>

                  <div className="item-right">
                    <p className="number">{food.quantity} </p>
                    <p className="quantity">stock</p>
                    <p className="date">{food.created_at}</p>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      ) : (
        <p>No items</p>
      )}

      <div className="inventory-add">
        <Link to={"/inventory-add"}>
          <h3>Add</h3>
        </Link>
      </div>
    </div>
  );
}

export default Inventory;
