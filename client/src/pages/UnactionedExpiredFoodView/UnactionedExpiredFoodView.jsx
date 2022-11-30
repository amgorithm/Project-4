import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  wasteUnactionedDetail,
  wasteUnactionedDelete,
  wasteUnactionedUpdate,
} from "../../utils/foodService";
import useUser from "../../hooks/useUser";
import "./UnactionedExpiredFoodView.css";

function UnactionedExpiredFoodView() {
  const { user } = useUser();
  const { foodID } = useParams();
  let navigate = useNavigate();

  const [updateWasteStatus, setUpdateWasteStatus] = useState({
    wasted: false,
  });

  useEffect(() => {
    getExpiredFood();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodID]);

  async function getExpiredFood() {
    const unactioned = await wasteUnactionedDetail(foodID);
    if (!unactioned.id) {
      navigate("/inventory");
      return;
    }
    setUpdateWasteStatus(unactioned);
  }

  const removeFood = () => {
    wasteUnactionedDelete(updateWasteStatus, foodID).then((res) => {
      navigate(`/inventory`);
    });
  };

  const handleChange = (e) => {
    setUpdateWasteStatus({
      ...updateWasteStatus,
      wasted: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    wasteUnactionedUpdate(updateWasteStatus, foodID).then((res) => {
      console.log(res.data);
      navigate(`/dashboard`);
    });
  };

  return (
    <div className="unactioned">
      <div className="unactioned-container">
        <div className="unactioned-title">
          {updateWasteStatus ? (
            <div>
              <h2>{updateWasteStatus.name}</h2>
            </div>
          ) : (
            <p>Loading, please wait</p>
          )}
        </div>
        <div className="unactioned-delete">
          <button onClick={removeFood} className="delete-btn">
            <img
              src={require("../../images/delete.png")}
              alt="trash can"
              className="unactioned-delete-img"
            />
          </button>
        </div>
      </div>
      <hr />
      <div className="unactioned-information">
        <form className="unactioned-form" onSubmit={handleSubmit}>
          <div className="wasted-status">
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
          <div className="save-btn-container">
            <button className="save-btn">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UnactionedExpiredFoodView;
