import React from "react";
import { cleanup } from "@testing-library/react";
import TripHeader from "../../../components/Navigation/TripBudgetHeader";
import { renderWithReduxRouterAndTheme } from "../../../testUtils/helpers/renderHelpers";
import { toBeInTheDocument } from "@testing-library/jest-dom";
import {
  trips,
  budgetItems,
  expenses,
  auth
} from "../../../testUtils/fixtures/mockStoreData";

expect.extend({ toBeInTheDocument });

afterEach(cleanup);

test("should render with theme and passed props", () => {
  const { asFragment } = renderWithReduxRouterAndTheme(
    <TripHeader
      title="Test Header"
      auth={auth}
      backTo="/"
      trip={trips[0]}
      budgetItems={budgetItems}
      expenses={expenses}
    />
  );
  expect(asFragment()).toMatchSnapshot();
});
