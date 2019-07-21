import axios from "axios";

export const addBudgetItem = budgetItem => ({
  type: "ADD_BUDGET_ITEM",
  budgetItem
});

export const startAddBudgetItem = budgetItem => {
  return async dispatch => {
    const res = await axios.post("/api/budgetItems", budgetItem);
    dispatch(addBudgetItem(res.data));
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
      dispatch(removeBudgetItem(id));
      return res.data;
    } catch (error) {
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
    await axios.put(`/api/budgetItems/${id}`, updates);
    dispatch(editBudgetItem(id, updates));
  };
};

export const setBudgetItems = budgetItems => ({
  type: "SET_BUDGET_ITEMS",
  budgetItems
});

export const startSetBudgetItems = () => {
  return async dispatch => {
    const res = await axios.get("/api/budgetItems");
    dispatch(setBudgetItems(res.data));
  };
};
