import tokenService from "./tokenService.js";

// Main homepage food waste
export const foodWasteFacts = async () => {
  try {
    let res = await fetch("/api/v1/food-waste-facts/", {
      method: "GET",
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// Unactioned food waste
export const wasteUnactionedList = async () => {
  try {
    const token = tokenService.getToken();
    let res = await fetch("/api/v1/inventory/waste-unactioned-list/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const wasteUnactionedDetail = async (foodID) => {
  try {
    const token = tokenService.getToken();
    let res = await fetch(
      `/api/v1/inventory/waste-unactioned-detail/${foodID}/`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const wasteUnactionedUpdate = async (expiredItem, foodID) => {
  try {
    const token = tokenService.getToken();
    let res = await fetch(
      `/api/v1/inventory/waste-unactioned-detail/${foodID}/`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },

        body: JSON.stringify(expiredItem),
      }
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const wasteUnactionedDelete = async (expiredItem, foodID) => {
  try {
    const token = tokenService.getToken();
    let res = await fetch(
      `/api/v1/inventory/waste-unactioned-detail/${foodID}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: expiredItem,
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

// User homepage expiring this week
export const redExpiryDate = async () => {
  try {
    const token = tokenService.getToken();
    let res = await fetch("/api/v1/inventory/expiring-this-week/red/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const orangeExpiryDate = async () => {
  try {
    const token = tokenService.getToken();
    let res = await fetch("/api/v1/inventory/expiring-this-week/orange/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const yellowExpiryDate = async () => {
  try {
    const token = tokenService.getToken();
    let res = await fetch("/api/v1/inventory/expiring-this-week/yellow/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const greenExpiryDate = async () => {
  try {
    const token = tokenService.getToken();
    let res = await fetch("/api/v1/inventory/expiring-this-week/green/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.json();
  } catch (error) {}
};

// Inventory
export const getFoods = async () => {
  try {
    const token = tokenService.getToken();
    let res = await fetch("/api/v1/inventory/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.json();
  } catch (error) {
    console.log(Error);
  }
};

export const getFood = async (foodID) => {
  try {
    const token = tokenService.getToken();
    let res = await fetch(`/api/v1/inventory-detail/${foodID}/`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const addAFood = async (food) => {
  try {
    const token = tokenService.getToken();
    let res = await fetch("/api/v1/inventory/", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
      body: JSON.stringify(food),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateFood = async (food, foodID) => {
  try {
    const token = tokenService.getToken();
    let res = await fetch(`/api/v1/inventory-detail/${foodID}/`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
      body: JSON.stringify(food),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteFood = async (food, foodID) => {
  try {
    const token = tokenService.getToken();
    let res = await fetch(`/api/v1/inventory-detail/${foodID}/`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: food,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

// User analytics
export const overallConsumed = async () => {
  try {
    const token = tokenService.getToken();
    let res = await fetch(`/api/v1/inventory/overall-consumed/`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const overallWasted = async () => {
  try {
    const token = tokenService.getToken();
    let res = await fetch(`/api/v1/inventory/overall-wasted/`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const threeMonthConsumed = async () => {
  try {
    const token = tokenService.getToken();
    let res = await fetch(`/api/v1/inventory/last-three-months/consumed/`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const threeMonthWasted = async () => {
  try {
    const token = tokenService.getToken();
    let res = await fetch(`/api/v1/inventory/last-three-months/wasted/`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const thisYearConsumed = async () => {
  try {
    const token = tokenService.getToken();
    let res = await fetch(`/api/v1/inventory/this-year/consumed/`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const thisYearWasted = async () => {
  try {
    const token = tokenService.getToken();
    let res = await fetch(`/api/v1/inventory/this-year/wasted/`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// Inventory search
export const inventorySearch = async (query) => {
  try {
    const token = tokenService.getToken();
    let res = await fetch(`/api/v1/inventory-search/${query}/`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.json();
  } catch (error) {
    console.log(Error);
  }
};
