export const startSetBudgetItems = (state, dispatch) => {
  const budgetItems = JSON.parse(localStorage.getItem("budgetItems"));
  return dispatch({
    type: "FETCH_BUDGET_ITEMS",
    payload: budgetItems
  });
};

export const startRemoveBudgetItem = (id, state, dispatch) => {
  localStorage.setItem(
    "budgetItems",
    JSON.stringify(state.budgetItems.filter(i => i.id !== id))
  );

  return dispatch({
    type: "DELETE_BUDGET_ITEM",
    id
  });
};

export const startEditBudgetItem = (id, updates, state, dispatch) => {
  let arr = state.budgetItems.filter(i => i.id !== id);
  arr.push(updates);
  localStorage.setItem("budgetItems", JSON.stringify(arr));

  return dispatch({
    type: "UPDATE_BUDGET_ITEM",
    id,
    updates
  });
};

export const startAddBudgetItem = (data, state, dispatch) => {
  let arr = state.budgetItems;
  arr.push(data);
  localStorage.setItem("budgetItems", JSON.stringify(arr));

  return dispatch({
    type: "ADD_BUDGET_ITEM",
    data
  });
};
