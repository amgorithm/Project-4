import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  wasteUnactionedDetail,
  wasteUnactionedUpdate,
} from "../../utils/foodService";

// TODO: Delete this component as it's been combined with the unactioned expired food edit comp

function UnactionedExpiredFoodEdit() {
  let navigate = useNavigate();
  const { foodID } = useParams();
  const [updateWasteStatus, setUpdateWasteStatus] = useState({
    name: "",
    quantity: 1,
    expiry_date: "",
    category: 1,
    wasted: false,
  });

  useEffect(() => {
    async function getExpiredFood() {
      const unactioned = await wasteUnactionedDetail(foodID);

      if (parseInt(foodID) !== unactioned.id) {
        navigate("/dashboard");
      }
      setUpdateWasteStatus(unactioned);
    }
    getExpiredFood();
  }, [foodID]);

  const handleChange = (e) => {
    setUpdateWasteStatus({
      ...updateWasteStatus,
      [e.target.name]: e.target.value,
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
    <div>
      {updateWasteStatus.name}
      <form className="edit-food" onSubmit={handleSubmit}>
        <button
          type="radio"
          name="wasted"
          value={false}
          onChange={handleChange}
        >
          {" "}
          Consumed
        </button>

        <button type="radio" name="wasted" value={true} onChange={handleChange}>
          Wasted
        </button>
      </form>
    </div>
  );
}

export default UnactionedExpiredFoodEdit;
