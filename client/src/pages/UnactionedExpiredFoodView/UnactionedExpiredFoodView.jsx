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
    console.log("clicked to update", updateWasteStatus);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    wasteUnactionedUpdate(updateWasteStatus, foodID).then((res) => {
      console.log(res.data);
      navigate(`/dashboard`);
    });
  };

  return (
    <div>
      {updateWasteStatus ? (
        <div>
          <p>{updateWasteStatus.name}</p>
        </div>
      ) : (
        <p> No item</p>
      )}

      <form className="edit-food" onSubmit={handleSubmit}>
        <label>Wasted:</label>

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

        <button>Update expiry status</button>
      </form>

      <button onClick={removeFood}>Delete</button>
    </div>
  );
}

export default UnactionedExpiredFoodView;
