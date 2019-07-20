import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Button from "../../../components/Buttons/Button";

afterEach(cleanup);

test("should render with no props", () => {
  const { asFragment } = render(<Button />);
  expect(asFragment()).toMatchSnapshot();
});

test("should render passed props and respond to callback props", () => {
  const handleClick = jest.fn();
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
      handleClick={handleClick}
      customStyles={customStyles}
      buttonType={buttonType}
      buttonWidth={buttonWidth}
      buttonText={buttonText}
      id="1"
    />
  );

  expect(asFragment()).toMatchSnapshot();

  expect(getByTestId("buttonText1").textContent).toBe("TEST");

  fireEvent.click(getByTestId("button1"));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
