import React, { useState, useEffect } from "react";
import { inventorySearch } from "../../utils/foodService";
import { Link, useNavigate } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import useUser from "../../hooks/useUser";
import "./InventorySearch.css";

function InventorySearch() {
  const { user } = useUser();
  let navigate = useNavigate();
  const [inventoryList, setInventoryList] = useState();
  const [query, setQuery] = useState("");
  const debounce = useDebounce(query, 500);

  useEffect(() => {
    foodQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce]);

  async function foodQuery() {
    if (query !== "") {
      const food = await inventorySearch(query);
      setInventoryList(food);
    } else {
      setInventoryList("");
    }
  }
  // console.log(inventoryList);
  return (
    <div className="search">
      <div className="search-title">
        <h2>Search inventory</h2>
      </div>

      <div className="search-bar">
        <input
          type="search"
          placeholder="What food are you looking for?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {inventoryList
        ? inventoryList.map((food) => (
            <div className="results" key={food.id}>
              <Link
                to={`/inventory-view/${food.id}/`}
                style={{ textDecoration: "none", color: "#509498" }}
                key={food.id}
              >
                <h3 className="food-name">{food.name}</h3>
              </Link>
            </div>
          ))
        : null}
    </div>
  );
}

export default InventorySearch;
