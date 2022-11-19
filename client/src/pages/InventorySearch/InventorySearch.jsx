import React, { useState, useEffect } from "react";
import { inventorySearch } from "../../utils/foodService";
import useDebounce from "../../hooks/useDebounce";

function InventorySearch() {
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
        inventoryList.map((food) => <div key={food.id}>{food.name}</div>)
      ) : (
        <p>No items found</p>
      )}
    </div>
  );
}

export default InventorySearch;
