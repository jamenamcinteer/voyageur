import axios from "axios";

export const addExpense = expense => ({
  type: "ADD_EXPENSE",
  expense
});

export const startAddExpense = expense => {
  return async dispatch => {
    try {
      const res = await axios.post("/api/expenses", expense);
      let expenses = JSON.parse(localStorage.getItem("expenses"));
      expenses.push(res.data);
      localStorage.setItem("expenses", JSON.stringify(expenses));
      dispatch(addExpense(res.data));
      localStorage.setItem("isOffline", "false");
      return res.data;
    } catch (error) {
      if (error.includes("Network Error")) {
        localStorage.setItem("isOffline", "true");
      }
      return error;
    }
  };
};

export const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id
});

export const startRemoveExpense = ({ id } = {}) => {
  return async dispatch => {
    try {
      const res = await axios.delete(`/api/expenses/${id}`);
      localStorage.setItem("expenses", JSON.stringify(res.data));
      dispatch(removeExpense(id));
      localStorage.setItem("isOffline", "false");
      return res.data;
    } catch (error) {
      if (error.includes("Network Error")) {
        localStorage.setItem("isOffline", "true");
      }
      return error;
    }
  };
};

export const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});

export const startEditExpense = (id, updates) => {
  return async dispatch => {
    try {
      const res = await axios.put(`/api/expenses/${id}`, updates);
      localStorage.setItem("expenses", JSON.stringify(res.data));
      dispatch(editExpense(id, updates));
      localStorage.setItem("isOffline", "false");
      return res.data;
    } catch (error) {
      if (error.includes("Network Error")) {
        localStorage.setItem("isOffline", "true");
      }
      return error;
    }
  };
};

export const setExpenses = expenses => ({
  type: "SET_EXPENSES",
  expenses
});

export const startSetExpenses = () => {
  return async dispatch => {
    try {
      const res = await axios.get("/api/expenses");
      localStorage.setItem("expenses", JSON.stringify(res.data));
      dispatch(setExpenses(res.data));
      localStorage.setItem("isOffline", "false");
      return res.data;
    } catch (error) {
      const res = JSON.parse(localStorage.getItem("expenses"));
      if (error.includes("Network Error")) {
        localStorage.setItem("isOffline", "true");
      }
      if (res) {
        dispatch(setExpenses(res));
      } else {
        return error;
      }
    }
  };
};
