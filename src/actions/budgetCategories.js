import axios from "axios";

export const addBudgetCategory = budgetCategory => ({
  type: "ADD_BUDGET_CATEGORY",
  budgetCategory
});

export const startAddBudgetCategory = budgetCategory => {
  return async dispatch => {
    try {
      const res = await axios.post("/api/budgetCategories", budgetCategory);
      let budgetCategories = JSON.parse(
        localStorage.getItem("budgetCategories")
      );
      budgetCategories.push(res.data);
      localStorage.setItem(
        "budgetCategories",
        JSON.stringify(budgetCategories)
      );
      dispatch(addBudgetCategory(res.data));
      localStorage.setItem("isOffline", "false");
      return res.data;
    } catch (error) {
      // if (error.includes("Network Error")) {
      //   localStorage.setItem("isOffline", "true");
      // }
      return error;
    }
  };
};

export const removeBudgetCategory = ({ id } = {}) => ({
  type: "REMOVE_BUDGET_CATEGORY",
  id
});

export const startRemoveBudgetCategory = ({ id } = {}) => {
  return async dispatch => {
    try {
      const res = await axios.delete(`/api/budgetCategories/${id}`);
      localStorage.setItem("expenses", JSON.stringify(res.data));
      dispatch(removeBudgetCategory(id));
      localStorage.setItem("isOffline", "false");
      return res.data;
    } catch (error) {
      // if (error.includes("Network Error")) {
      //   localStorage.setItem("isOffline", "true");
      // }
      return error;
    }
  };
};

export const editBudgetCategory = (id, updates) => ({
  type: "EDIT_BUDGET_CATEGORY",
  id,
  updates
});

export const startEditBudgetCategory = (id, updates) => {
  return async dispatch => {
    try {
      const res = await axios.put(`/api/budgetCategories/${id}`, updates);
      localStorage.setItem("expenses", JSON.stringify(res.data));
      dispatch(editBudgetCategory(id, updates));
      localStorage.setItem("isOffline", "false");
      return res.data;
    } catch (error) {
      // if (error.includes("Network Error")) {
      //   localStorage.setItem("isOffline", "true");
      // }
      return error;
    }
  };
};

export const setBudgetCategories = budgetCategories => ({
  type: "SET_BUDGET_CATEGORIES",
  budgetCategories
});

export const startSetBudgetCategories = () => {
  return async dispatch => {
    try {
      const res = await axios.get("/api/budgetCategories");
      localStorage.setItem("budgetCategories", JSON.stringify(res.data));
      dispatch(setBudgetCategories(res.data));
      localStorage.setItem("isOffline", "false");
      return res.data;
    } catch (error) {
      const res = JSON.parse(localStorage.getItem("budgetCategories"));
      // if (error.includes("Network Error")) {
      //   localStorage.setItem("isOffline", "true");
      // }
      if (res) {
        dispatch(setBudgetCategories(res));
      } else {
        return error;
      }
    }
  };
};
