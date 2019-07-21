import React from "react";
import { cleanup, fireEvent } from "@testing-library/react";
import Textarea from "../../../components/FormElements/Textarea";

import { renderWithTheme } from "../../../testUtils/helpers/renderHelpers";

afterEach(cleanup);

jest.mock("uniqid", () => {
  let value = 1;
  return () => value++;
});

const handleChange = jest.fn();
const handleBlur = jest.fn();
const label = "Text Area";
const defaultValue = "default value";
const changedValue = "changed value";

test("should render with theme and passed props", () => {
  const { getByLabelText, asFragment } = renderWithTheme(
    <Textarea label={label} handleChange={handleChange} />
  );
  expect(asFragment()).toMatchSnapshot();

  const input = getByLabelText(label);

  expect(input.value).toBe("");
});

test("should render with passed default value", () => {
  const { getByLabelText } = renderWithTheme(
    <Textarea label={label} value={defaultValue} handleChange={handleChange} />
  );

  const input = getByLabelText(label);

  expect(input.value).toBe(defaultValue);
});

test("should change input value when it is changed", () => {
  const { getByLabelText } = renderWithTheme(
    <Textarea label={label} handleChange={handleChange} />
  );

  const input = getByLabelText(label);

  fireEvent.change(input, {
    target: {
      value: changedValue
    }
  });

  expect(input.value).toBe(changedValue);
  expect(handleChange).toHaveBeenCalledWith(changedValue);
  expect(handleChange).toHaveBeenCalledTimes(1);
});

test("should call passed onBlur method when input loses focus", () => {
  const { getByLabelText } = renderWithTheme(
    <Textarea
      label={label}
      handleBlur={handleBlur}
      handleChange={handleChange}
    />
  );

  const input = getByLabelText(label);

  fireEvent.blur(input);

  expect(handleBlur).toHaveBeenCalledTimes(1);
});
