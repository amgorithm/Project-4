import tokenService from "./tokenService.js";

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
      },
      body: food,
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateFood = async (food, foodID) => {
  console.log(food, foodID);

  try {
    const token = tokenService.getToken();
    let res = await fetch(`/api/v1/inventory-detail/${foodID}/`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: food,
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteFood = async (food, foodID) => {
  console.log("Food was deleted");

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
