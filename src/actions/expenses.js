export const startSetExpenses = (state, dispatch) => {
  const expenses = JSON.parse(localStorage.getItem("expenses"));
  return dispatch({
    type: "FETCH_EXPENSES",
    payload: expenses
  });
};

export const startRemoveExpense = (id, state, dispatch) => {
  localStorage.setItem(
    "expenses",
    JSON.stringify(state.expenses.filter(i => i.id !== id))
  );

  return dispatch({
    type: "DELETE_EXPENSE",
    id
  });
};

export const startEditExpense = (id, updates, state, dispatch) => {
  let arr = state.expenses.filter(i => i.id !== id);
  arr.push(updates);
  localStorage.setItem("expenses", JSON.stringify(arr));

  return dispatch({
    type: "UPDATE_EXPENSE",
    id,
    updates
  });
};

export const startAddExpense = (data, state, dispatch) => {
  let arr = state.expenses;
  arr.push(data);
  localStorage.setItem("expenses", JSON.stringify(arr));

  return dispatch({
    type: "ADD_EXPENSE",
    data
  });
};
