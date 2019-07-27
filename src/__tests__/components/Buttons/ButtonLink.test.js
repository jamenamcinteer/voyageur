import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import Button from "../../../components/Buttons/ButtonLink";

function renderWithRouter(
  ui,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history
  };
}

afterEach(cleanup);

test("should render with no props", () => {
  const to = "/";
  const { asFragment } = renderWithRouter(<Button to={to} />);
  expect(asFragment()).toMatchSnapshot();
});

test("should render passed props and respond to callback props", () => {
  const to = "/";
  const customStyles = {
    background: {
      backgroundColor: "orange"
    },
    text: {
      color: "teal"
    }
  };
  const buttonType = "secondary";
  const buttonWidth = "75px";
  const buttonText = "TEST";
  const { getByTestId, asFragment } = renderWithRouter(
    <Button
      to={to}
      customStyles={customStyles}
      buttonType={buttonType}
      buttonWidth={buttonWidth}
      buttonText={buttonText}
      id="1"
    />
  );

  expect(asFragment()).toMatchSnapshot();

  expect(getByTestId("buttonText1").textContent).toBe("TEST");
});
