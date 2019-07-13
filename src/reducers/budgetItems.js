// Budget Items Reducer

const budgetItemsReducerDefaultState = [];

export default (state = budgetItemsReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_BUDGET_ITEM":
      return [...state, action.budgetItem];
    case "REMOVE_BUDGET_ITEM":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_BUDGET_ITEM":
      return state.map(budgetItem => {
        if (budgetItem._id === action.id) {
          return {
            ...budgetItem,
            ...action.updates
          };
        } else {
          return budgetItem;
        }
      });
    case "SET_BUDGET_ITEMS":
      return action.budgetItems;
    default:
      return state;
  }
};
