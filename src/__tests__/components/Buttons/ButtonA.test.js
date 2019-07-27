import React from "react";
import { render, cleanup } from "@testing-library/react";
import Button from "../../../components/Buttons/ButtonA";

afterEach(cleanup);

test("should render with no props", () => {
  const { asFragment } = render(<Button />);
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
  const { getByTestId, asFragment } = render(
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
