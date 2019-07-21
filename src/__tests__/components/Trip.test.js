import React from "react";
import { cleanup } from "@testing-library/react";
import { createStore } from "redux";
import Trip from "../../components/Trip";
import {
  trips,
  budgetCategories,
  budgetItems,
  expenses,
  auth
} from "../../testUtils/fixtures/mockStoreData";
import { renderWithReduxRouterAndTheme } from "../../testUtils/helpers/renderHelpers";

// function renderWithRedux(
//   ui,
//   {
//     initialState,
//     store = createStore(tripsReducer, tripsReducerDefaultState)
//   } = {}
// ) {
//   return {
//     ...render(<Provider store={store}>{ui}</Provider>),
//     store
//   };
// }

// function renderWithRouter(
//   ui,
//   {
//     route = "/",
//     history = createMemoryHistory({ initialEntries: [route] })
//   } = {}
// ) {
//   return {
//     ...render(<Router history={history}>{ui}</Router>),
//     history
//   };
// }

afterEach(cleanup);

// it("renders", () => {
//   const { asFragment } = render(
//     <Provider store={store}>
//       <Trip trips={trips} />
//     </Provider>
//   );
//   expect(asFragment()).toMatchSnapshot();
// });

// test("can render with redux with defaults", () => {
//   // const { getByTestId, getByText } = renderWithRedux(<Trip />)
//   // fireEvent.click(getByText('+'))
//   // expect(getByTestId('count-value').textContent).toBe('1')
//   const { asFragment } = renderWithRedux(<Trip />);
//   expect(asFragment()).toMatchSnapshot();
// });

test("can render with redux with custom store", () => {
  // this is a silly store that can never be changed
  const store = createStore(() => ({
    trips,
    budgetCategories,
    budgetItems,
    expenses,
    auth
  }));
  const { asFragment } = renderWithReduxRouterAndTheme(
    <Trip match={{ params: { id: "1" } }} />,
    {
      store
    }
  );
  // const { getByTestId, getByText } = renderWithRedux(<Trip />, {
  //   store,
  // })
  // fireEvent.click(getByText('+'))
  // expect(getByTestId('count-value').textContent).toBe('1000')
  // fireEvent.click(getByText('-'))
  // expect(getByTestId('count-value').textContent).toBe('1000')
  expect(asFragment()).toMatchSnapshot();
});
