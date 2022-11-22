import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  wasteUnactionedDetail,
  wasteUnactionedDelete,
  wasteUnactionedUpdate,
} from "../../utils/foodService";
import useUser from "../../hooks/useUser";

function UnactionedExpiredFoodView() {
  const { user } = useUser();
  const { foodID } = useParams();
  let navigate = useNavigate();

  // const [expiredItem, setExpiredItem] = useState();
  const [updateWasteStatus, setUpdateWasteStatus] = useState({
    // name: "",
    // quantity: 1,
    // expiry_date: "",
    // category: { name: "" },
    wasted: false,
  });

  useEffect(() => {
    // if (!user) {
    //   navigate("/");
    //   return;
    // }
    async function getExpiredFood() {
      const unactioned = await wasteUnactionedDetail(foodID);
      if (!unactioned.id) {
        navigate("/inventory");
        return;
      }

      setUpdateWasteStatus(unactioned);
    }

    getExpiredFood();
  }, [foodID]);

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
    console.log(updateWasteStatus);
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

        {/* <button name="wasted" value={false} onChange={handleChange}>
          Consumed
        </button>

        <button name="wasted" value={true} onChange={handleChange}>
          Wasted
        </button> */}
        <button>Update expiry status</button>
      </form>

      {/* <Link to={`/expired-inventory-edit/${foodID}`}>
        <button>Update waste status</button>
      </Link> */}

      <button onClick={removeFood}>Delete</button>
    </div>
  );
}

export default UnactionedExpiredFoodView;
