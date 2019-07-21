import React from "react";
import { cleanup, fireEvent } from "@testing-library/react";
import Select from "../../../components/FormElements/Select";

import { renderWithTheme } from "../../../testUtils/helpers/renderHelpers";

afterEach(cleanup);

jest.mock("uniqid", () => {
  let value = 1;
  return () => value++;
});

const options = [
  {
    value: "1",
    text: "Option 1"
  },
  {
    value: "2",
    text: "Option 2"
  },
  {
    value: "3",
    text: "Option 3"
  }
];
const handleChange = jest.fn();
const label = "Select Options";

test("should render with theme and passed props", () => {
  const { getByLabelText, asFragment } = renderWithTheme(
    <Select options={options} label={label} handleChange={handleChange} />
  );
  expect(asFragment()).toMatchSnapshot();

  const select = getByLabelText(label);

  expect(select.value).toBe(options[0].value);
});

test("should render with passed default value", () => {
  const { getByLabelText } = renderWithTheme(
    <Select
      options={options}
      label={label}
      value={options[2].value}
      handleChange={handleChange}
    />
  );

  const select = getByLabelText(label);

  expect(select.value).toBe(options[2].value);
});

test("should change select value when option is changed", () => {
  const { getByLabelText } = renderWithTheme(
    <Select options={options} label={label} handleChange={handleChange} />
  );

  const select = getByLabelText(label);

  fireEvent.change(select, {
    target: {
      value: options[1].value
    }
  });

  expect(select.value).toBe(options[1].value);
  expect(handleChange).toHaveBeenCalledWith(options[1].value);
  expect(handleChange).toHaveBeenCalledTimes(1);
});
