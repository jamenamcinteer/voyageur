// Budget Categories Reducer

const budgetCategoriesReducerDefaultState = [];

export default (state = budgetCategoriesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_BUDGET_CATEGORY":
      return [...state, action.budgetCategory];
    case "REMOVE_BUDGET_CATEGORY":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_BUDGET_CATEGORY":
      return state.map(budgetCategory => {
        if (budgetCategory._id === action.id) {
          return {
            ...budgetCategory,
            ...action.updates
          };
        } else {
          return budgetCategory;
        }
      });
    case "SET_BUDGET_CATEGORIES":
      return action.budgetCategories;
    default:
      return state;
  }
};
