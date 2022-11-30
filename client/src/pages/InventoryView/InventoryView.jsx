import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getFood, deleteFood } from "../../utils/foodService";
import useUser from "../../hooks/useUser";
import "./InventoryView.css";

function InventoryView() {
  const { user } = useUser();
  const { foodID } = useParams();
  let navigate = useNavigate();

  const [inventoryItem, setInventoryItem] = useState([]);

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
      navigate(`/inventory`);
    });
  };

  return (
    <div className="inventory-view">
      <div className="inventory-view-container">
        {inventoryItem ? (
          <>
            <div className="viewed-title">
              <h2>{inventoryItem.name}</h2>
            </div>
            <div className="inventory-edit">
              <Link
                to={`/inventory-edit/${foodID}`}
                style={{ textDecoration: "none" }}
              >
                <img
                  src={require("../../images/edit.png")}
                  alt="edit"
                  className="inventory-edit-link"
                />
              </Link>
            </div>
          </>
        ) : (
          <p>Loading, please wait.</p>
        )}
      </div>
      <hr />
      <div className="inventory-view-information">
        {inventoryItem ? (
          <>
            <div className="item-detail">
              <p className="item-bold">{inventoryItem.quantity}</p>
              <p>Piece</p>
            </div>
            <div className="item-detail">
              <p className="item-bold">{inventoryItem.expiry_date}</p>
              <p>Expires</p>
            </div>

            <div className="item-detail">
              <button onClick={removeFood}>
                <img
                  src={require("../../images/delete.png")}
                  alt="trash can"
                  className="delete-img"
                />
              </button>
              <p className="item-remove">Remove</p>
            </div>
          </>
        ) : (
          <p>Loading, please wait.</p>
        )}
      </div>
    </div>
  );
}

export default InventoryView;
