import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/auth";
import tripsReducer from "./reducers/trips";
import budgetCategoriesReducer from "./reducers/budgetCategories";
import budgetItemsReducer from "./reducers/budgetItems";
import expensesReducer from "./reducers/expenses";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      trips: tripsReducer,
      budgetCategories: budgetCategoriesReducer,
      budgetItems: budgetItemsReducer,
      expenses: expensesReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};

// import React from "react";

// export const Store = React.createContext();

// const initialState = {
//   trips: [],
//   budgetCategories: [],
//   budgetItems: [],
//   expenses: []
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case "LOGIN":
//       return {
//         ...state,
//         auth: {
//           uid: action.uid,
//           displayName: action.displayName,
//           email: action.email,
//           photoURL: action.photoURL
//         }
//       };
//     case "LOGOUT":
//       return { ...state, auth: {} };
//     case "FETCH_TRIPS":
//       return { ...state, trips: action.payload };
//     case "FETCH_BUDGET_CATEGORIES":
//       return { ...state, budgetCategories: action.payload };
//     case "FETCH_BUDGET_ITEMS":
//       return { ...state, budgetItems: action.payload };
//     case "FETCH_EXPENSES":
//       return { ...state, expenses: action.payload };
//     case "DELETE_TRIP":
//       return {
//         ...state,
//         trips: state.trips.filter(({ id }) => id !== action.id)
//       };
//     case "DELETE_EXPENSE":
//       return {
//         ...state,
//         expenses: state.expenses.filter(({ id }) => id !== action.id)
//       };
//     case "DELETE_BUDGET_ITEM":
//       return {
//         ...state,
//         budgetItems: state.budgetItems.filter(({ id }) => id !== action.id)
//       };
//     case "DELETE_BUDGET_CATEGORY":
//       return {
//         ...state,
//         budgetCategories: state.budgetCategories.filter(
//           ({ id }) => id !== action.id
//         )
//       };
//     case "UPDATE_TRIP":
//       return {
//         ...state,
//         trips: state.trips.map(i => {
//           if (i.id === action.id) {
//             return {
//               ...i,
//               ...action.updates
//             };
//           } else {
//             return i;
//           }
//         })
//       };
//     case "UPDATE_EXPENSE":
//       return {
//         ...state,
//         expenses: state.expenses.map(i => {
//           if (i.id === action.id) {
//             return {
//               ...i,
//               ...action.updates
//             };
//           } else {
//             return i;
//           }
//         })
//       };
//     case "UPDATE_BUDGET_ITEM":
//       return {
//         ...state,
//         budgetItems: state.budgetItems.map(i => {
//           if (i.id === action.id) {
//             return {
//               ...i,
//               ...action.updates
//             };
//           } else {
//             return i;
//           }
//         })
//       };
//     case "UPDATE_BUDGET_CATEGORY":
//       return {
//         ...state,
//         budgetCategories: state.budgetCategories.map(i => {
//           if (i.id === action.id) {
//             return {
//               ...i,
//               ...action.updates
//             };
//           } else {
//             return i;
//           }
//         })
//       };
//     case "ADD_TRIP":
//       let trips = state.trips;
//       // trips.push(action.data);
//       return { ...state, trips };
//     case "ADD_EXPENSE":
//       let expenses = state.expenses;
//       // expenses.push(action.data);
//       return { ...state, expenses };
//     case "ADD_BUDGET_ITEM":
//       let budgetItems = state.budgetItems;
//       // budgetItems.push(action.data);
//       return { ...state, budgetItems };
//     case "ADD_BUDGET_CATEGORY":
//       // console.log("Store.js", state.budgetCategories);
//       let budgetCategories = state.budgetCategories;
//       // budgetCategories.push(action.data);
//       return {
//         ...state,
//         budgetCategories
//       };
//     default:
//       return state;
//   }
// }

// export function StoreProvider(props) {
//   const [state, dispatch] = React.useReducer(reducer, initialState);
//   const value = { state, dispatch };
//   return <Store.Provider value={value}>{props.children}</Store.Provider>;
// }
