import React, { useState, useEffect } from "react";
import { inventorySearch } from "../../utils/foodService";
import { Link, useNavigate } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import useUser from "../../hooks/useUser";

function InventorySearch() {
  const { user } = useUser();
  let navigate = useNavigate();
  const [inventoryList, setInventoryList] = useState();
  const [query, setQuery] = useState("");
  const debounce = useDebounce(query, 500);

  useEffect(() => {
    // if (!user) {
    //   navigate("/");
    //   return;
    // }
    foodQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce]);

  async function foodQuery() {
    if (query !== "") {
      const food = await inventorySearch(query);
      console.log(food);
      setInventoryList(food);
    } else {
      setInventoryList("");
    }
  }
  console.log(inventoryList);
  return (
    <div>
      <h4>Search</h4>
      <input
        type="search"
        placeholder="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {inventoryList ? (
        inventoryList.map((food) => (
          <Link to={`/inventory-view/${food.id}/`} key={food.id}>
            <div>{food.name}</div>
          </Link>
        ))
      ) : (
        <p>No items found</p>
      )}
    </div>
  );
}

export default InventorySearch;
