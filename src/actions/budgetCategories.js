export const startSetBudgetCategories = (state, dispatch) => {
  const budgetCategories = JSON.parse(localStorage.getItem("budgetCategories"));
  return dispatch({
    type: "FETCH_BUDGET_CATEGORIES",
    payload: budgetCategories
  });
};

export const startRemoveBudgetCategory = (id, state, dispatch) => {
  localStorage.setItem(
    "budgetCategories",
    JSON.stringify(state.budgetCategories.filter(i => i.id !== id))
  );

  return dispatch({
    type: "DELETE_BUDGET_CATEGORY",
    id
  });
};

export const startEditBudgetCategory = (id, updates, state, dispatch) => {
  let arr = state.budgetCategories.filter(i => i.id !== id);
  arr.push(updates);
  localStorage.setItem("budgetCategories", JSON.stringify(arr));

  return dispatch({
    type: "UPDATE_BUDGET_CATEGORY",
    id,
    updates
  });
};

export const startAddBudgetCategory = (data, state, dispatch) => {
  let arr = state.budgetCategories;
  arr.push(data);
  localStorage.setItem("budgetCategories", JSON.stringify(arr));

  return dispatch({
    type: "ADD_BUDGET_CATEGORY",
    data
  });
};
