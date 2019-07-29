import axios from "axios";

export const addBudgetItem = budgetItem => ({
  type: "ADD_BUDGET_ITEM",
  budgetItem
});

export const startAddBudgetItem = budgetItem => {
  return async dispatch => {
    try {
      const res = await axios.post("/api/budgetItems", budgetItem);
      let budgetItems = JSON.parse(localStorage.getItem("budgetItems"));
      budgetItems.push(res.data);
      localStorage.setItem("budgetItems", JSON.stringify(budgetItems));
      dispatch(addBudgetItem(res.data));
      localStorage.setItem("isOffline", "false");
      return res.data;
    } catch (error) {
      if (error.message === "Network Error") {
        localStorage.setItem("isOffline", "true");
      }
      return error;
    }
  };
};

export const removeBudgetItem = ({ id } = {}) => ({
  type: "REMOVE_BUDGET_ITEM",
  id
});

export const startRemoveBudgetItem = ({ id } = {}) => {
  return async dispatch => {
    try {
      const res = await axios.delete(`/api/budgetItems/${id}`);
      localStorage.setItem("expenses", JSON.stringify(res.data));
      dispatch(removeBudgetItem(id));
      localStorage.setItem("isOffline", "false");
      return res.data;
    } catch (error) {
      if (error.message === "Network Error") {
        localStorage.setItem("isOffline", "true");
      }
      return error;
    }
  };
};

export const editBudgetItem = (id, updates) => ({
  type: "EDIT_BUDGET_ITEM",
  id,
  updates
});

export const startEditBudgetItem = (id, updates) => {
  return async dispatch => {
    try {
      const res = await axios.put(`/api/budgetItems/${id}`, updates);
      localStorage.setItem("expenses", JSON.stringify(res.data));
      dispatch(editBudgetItem(id, updates));
      localStorage.setItem("isOffline", "false");
      return res.data;
    } catch (error) {
      if (error.message === "Network Error") {
        localStorage.setItem("isOffline", "true");
      }
      return error;
    }
  };
};

export const setBudgetItems = budgetItems => ({
  type: "SET_BUDGET_ITEMS",
  budgetItems
});

export const startSetBudgetItems = () => {
  return async dispatch => {
    try {
      const res = await axios.get("/api/budgetItems");
      localStorage.setItem("budgetItems", JSON.stringify(res.data));
      dispatch(setBudgetItems(res.data));
      localStorage.setItem("isOffline", "false");
      return res.data;
    } catch (error) {
      const res = JSON.parse(localStorage.getItem("budgetItems"));
      if (error.message === "Network Error") {
        localStorage.setItem("isOffline", "true");
      }
      if (res) {
        dispatch(setBudgetItems(res));
      } else {
        return error;
      }
    }
  };
};
