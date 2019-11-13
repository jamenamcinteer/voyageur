import React from "react";
import { cleanup, fireEvent, wait } from "@testing-library/react";
import TripForm from "../../../components/Forms/TripForm";
import {
  trips,
  budgetCategories,
  budgetItems,
  expenses,
  auth
} from "../../../testUtils/fixtures/mockStoreData";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { toMatchDiffSnapshot } from "snapshot-diff";
import { toBeInTheDocument } from "@testing-library/jest-dom";
import { renderWithReduxRouterAndTheme } from "../../../testUtils/helpers/renderHelpers";
import moment from "moment";
import "react-dates/initialize";
import { mockSuccessResponseUnsplash } from "../../../testUtils/fixtures/mockApiResponses";

expect.extend({ toMatchDiffSnapshot, toBeInTheDocument });

afterEach(cleanup);

jest.mock("uniqid", () => {
  let value = 1;
  return () => value++;
});

const mockStore = configureStore([thunk]);
const store = mockStore({
  trips,
  budgetCategories,
  budgetItems,
  expenses,
  auth
});
const historyMock = { push: jest.fn() };
const destinationField = "Destination";
const startDateField = "Start Date";
const endDateField = "End Date";

test("should render minimal passed props and respond to callback props", async () => {
  const { getByText, getByLabelText } = renderWithReduxRouterAndTheme(
    <TripForm history={historyMock} />,
    { store }
  );

  fireEvent.change(getByLabelText(destinationField), {
    target: { value: "Rome" }
  });
  fireEvent.change(getByLabelText(startDateField), {
    target: { value: "04/01/2019" }
  });
  fireEvent.change(getByLabelText(endDateField), {
    target: { value: "04/18/2019" }
  });
  getByText("Save").click();
  await wait(() => expect(historyMock.push.mock.calls[0]).toEqual([`/`]))
});

test("should display error if Destination is empty after clicking Save", () => {
  const {
    getByLabelText,
    getByTestId,
    getByText
  } = renderWithReduxRouterAndTheme(<TripForm history={historyMock} />, {
    store
  });

  fireEvent.change(getByLabelText(startDateField), {
    target: { value: "04/01/2019" }
  });
  fireEvent.change(getByLabelText(endDateField), {
    target: { value: "04/18/2019" }
  });
  getByText("Save").click();
  expect(getByTestId("destinationError")).toBeInTheDocument();
});

test("should display error if Start Date is empty after clicking Save", () => {
  const {
    getByLabelText,
    getByTestId,
    getByText
  } = renderWithReduxRouterAndTheme(<TripForm history={historyMock} />, {
    store
  });

  fireEvent.change(getByLabelText(destinationField), {
    target: { value: "Rome" }
  });
  fireEvent.change(getByLabelText(endDateField), {
    target: { value: "04/18/2019" }
  });
  getByText("Save").click();
  expect(getByTestId("datesError")).toBeInTheDocument();
});

test("should display error if End Date is empty after clicking Save", () => {
  const {
    getByLabelText,
    getByTestId,
    getByText
  } = renderWithReduxRouterAndTheme(<TripForm history={historyMock} />, {
    store
  });

  fireEvent.change(getByLabelText(destinationField), {
    target: { value: "Rome" }
  });
  fireEvent.change(getByLabelText(startDateField), {
    target: { value: "04/01/2019" }
  });
  getByText("Save").click();
  expect(getByTestId("datesError")).toBeInTheDocument();
});

test("should display errors if Start Date and End Date are empty after clicking Save", () => {
  const {
    getByLabelText,
    getAllByTestId,
    getByText
  } = renderWithReduxRouterAndTheme(<TripForm history={historyMock} />, {
    store
  });

  fireEvent.change(getByLabelText(destinationField), {
    target: { value: "Rome" }
  });
  getByText("Save").click();
  expect(getAllByTestId("datesError")).toHaveLength(2);
});

test("should display error if Start Date is not correctly formatted after clicking Save", () => {
  const {
    getByLabelText,
    getByTestId,
    getByText,
    queryByTestId
  } = renderWithReduxRouterAndTheme(<TripForm history={historyMock} />, {
    store
  });

  fireEvent.change(getByLabelText(destinationField), {
    target: { value: "Rome" }
  });
  fireEvent.change(getByLabelText(endDateField), {
    target: { value: "06/01/2019" }
  });

  let newDate = "test";
  fireEvent.change(getByLabelText(startDateField), {
    target: { value: newDate }
  });
  getByText("Save").click();
  expect(getByTestId("datesError")).toBeInTheDocument();

  newDate = " ";
  fireEvent.change(getByLabelText(startDateField), {
    target: { value: newDate }
  });
  getByText("Save").click();
  expect(getByTestId("datesError")).toBeInTheDocument();

  newDate = "05/03/19";
  fireEvent.change(getByLabelText(startDateField), {
    target: { value: newDate }
  });
  getByText("Save").click();
  expect(getByTestId("datesError")).toBeInTheDocument();

  newDate = "05/03/1";
  fireEvent.change(getByLabelText(startDateField), {
    target: { value: newDate }
  });
  getByText("Save").click();
  expect(getByTestId("datesError")).toBeInTheDocument();

  newDate = "5/3/19";
  fireEvent.change(getByLabelText(startDateField), {
    target: { value: newDate }
  });
  getByText("Save").click();
  expect(getByTestId("datesError")).toBeInTheDocument();

  newDate = "5/3/2019";
  fireEvent.change(getByLabelText(startDateField), {
    target: { value: newDate }
  });
  getByText("Save").click();
  expect(getByTestId("datesError")).toBeInTheDocument();

  newDate = "05/03/2019";
  fireEvent.change(getByLabelText(startDateField), {
    target: { value: newDate }
  });
  getByText("Save").click();
  expect(queryByTestId("datesError")).toBeNull();
});

test("should display error if End Date is not correctly formatted after clicking Save", () => {
  const {
    getByLabelText,
    getByTestId,
    getByText,
    queryByTestId
  } = renderWithReduxRouterAndTheme(<TripForm history={historyMock} />, {
    store
  });

  fireEvent.change(getByLabelText(destinationField), {
    target: { value: "Rome" }
  });
  fireEvent.change(getByLabelText(startDateField), {
    target: { value: "04/01/2019" }
  });

  let newDate = "test";
  fireEvent.change(getByLabelText(endDateField), {
    target: { value: newDate }
  });
  getByText("Save").click();
  expect(getByTestId("datesError")).toBeInTheDocument();

  newDate = " ";
  fireEvent.change(getByLabelText(endDateField), {
    target: { value: newDate }
  });
  getByText("Save").click();
  expect(getByTestId("datesError")).toBeInTheDocument();

  newDate = "05/03/19";
  fireEvent.change(getByLabelText(endDateField), {
    target: { value: newDate }
  });
  getByText("Save").click();
  expect(getByTestId("datesError")).toBeInTheDocument();

  newDate = "05/03/1";
  fireEvent.change(getByLabelText(endDateField), {
    target: { value: newDate }
  });
  getByText("Save").click();
  expect(getByTestId("datesError")).toBeInTheDocument();

  newDate = "5/3/19";
  fireEvent.change(getByLabelText(endDateField), {
    target: { value: newDate }
  });
  getByText("Save").click();
  expect(getByTestId("datesError")).toBeInTheDocument();

  newDate = "5/3/2019";
  fireEvent.change(getByLabelText(endDateField), {
    target: { value: newDate }
  });
  getByText("Save").click();
  expect(getByTestId("datesError")).toBeInTheDocument();

  newDate = "05/03/2019";
  fireEvent.change(getByLabelText(endDateField), {
    target: { value: newDate }
  });
  getByText("Save").click();
  expect(queryByTestId("datesError")).toBeNull();
});

test("should select photo when clicked after destination is set", done => {
  const mockJsonPromise = Promise.resolve(mockSuccessResponseUnsplash);
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise
  });
  jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

  const { getByLabelText, getByTestId } = renderWithReduxRouterAndTheme(
    <TripForm history={historyMock} />,
    {
      store
    }
  );

  fireEvent.change(getByLabelText(destinationField), {
    target: { value: "Rome" }
  });
  fireEvent.blur(getByLabelText(destinationField));

  expect(global.fetch).toHaveBeenCalledTimes(1);

  process.nextTick(() => {
    fireEvent.click(getByTestId("photo2"));
    expect(getByTestId("photoSelected2")).toBeInTheDocument();

    global.fetch.mockClear();
    done();
  });
});

test("should render passed trip and handle edits correctly", done => {
  const mockJsonPromise = Promise.resolve(mockSuccessResponseUnsplash);
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise
  });
  jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

  const {
    getByTestId,
    getByText,
    getByLabelText,
    getAllByTestId
  } = renderWithReduxRouterAndTheme(
    <TripForm trip={trips[0]} history={historyMock} />,
    { store }
  );

  // Display existing trip data
  expect(getByLabelText(destinationField).value).toBe(trips[0].destination);
  expect(getByLabelText(startDateField).value).toBe(
    moment(trips[0].startDate).format("MM/DD/YYYY")
  );
  expect(getByLabelText(endDateField).value).toBe(
    moment(trips[0].endDate).format("MM/DD/YYYY")
  );

  // Test change photo functionallity
  fireEvent.click(getByLabelText(destinationField));
  fireEvent.blur(getByLabelText(destinationField));
  fireEvent.click(getByText("Change Photo"));

  process.nextTick(() => {
    fireEvent.click(getByTestId("photo2"));
    expect(getByTestId("photoSelected2")).toBeInTheDocument();

    // Empty the required fields and trigger errors
    fireEvent.change(getByLabelText(destinationField), {
      target: { value: "" }
    });
    fireEvent.blur(getByLabelText(destinationField));
    fireEvent.change(getByLabelText(startDateField), {
      target: { value: "" }
    });
    fireEvent.change(getByLabelText(endDateField), {
      target: { value: "" }
    });
    getByText("Save").click();
    expect(getByTestId("destinationError")).toBeInTheDocument();
    // expect(getByTestId("datesError")).toBeInTheDocument();
    expect(getAllByTestId("datesError")).toHaveLength(2);

    // Change field values to new values
    fireEvent.change(getByLabelText(destinationField), {
      target: { value: "Rome" }
    });
    fireEvent.blur(getByLabelText(destinationField));

    process.nextTick(async () => {
      fireEvent.click(getByTestId("photo1"));

      fireEvent.change(getByLabelText(startDateField), {
        target: { value: "04/02/2019" }
      });

      fireEvent.change(getByLabelText(endDateField), {
        target: { value: "04/20/2019" }
      });

      // Save and redirect to dashboard page
      getByText("Save").click();
      await wait(() => expect(historyMock.push.mock.calls[0]).toEqual([`/`]))
      global.fetch.mockClear()
      done()
    });
  });
});

test("should display modal after clicking Delete and redirect to dashboard page after confirming delete", async () => {
  const { getByText, getByTestId, queryByText } = renderWithReduxRouterAndTheme(
    <TripForm
      trip={trips[0]}
      budgetCategories={budgetCategories}
      budgetItems={budgetItems}
      expenses={expenses}
      history={historyMock}
      isTest={true}
    />,
    { store }
  );

  getByText("Delete").click();
  expect(getByText("Yes, Delete")).toBeInTheDocument();

  getByTestId("closeModal").click();
  expect(queryByText("Yes, Delete")).toBeNull();

  getByText("Delete").click();
  await wait(() => expect(historyMock.push.mock.calls[0]).toEqual([`/`]))
});
