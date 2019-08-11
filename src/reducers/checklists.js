// Checklists Reducer

export const checklistsReducerDefaultState = [];

export default (state = checklistsReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_CHECKLIST":
      return [...state, action.checklist];
    case "REMOVE_CHECKLIST":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_CHECKLIST":
      return state.map(item => {
        if (item._id === action.id) {
          return {
            ...item,
            ...action.updates
          };
        } else {
          return item;
        }
      });
    case "SET_CHECKLISTS":
      return action.checklists;
    default:
      return state;
  }
};
