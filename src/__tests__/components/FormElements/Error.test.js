import React from "react";
import { render, cleanup } from "@testing-library/react";
import Error from "../../../components/FormElements/Error";
import "jest-styled-components";
import theme from "../../../theme";
import { ThemeProvider } from "styled-components";

export function renderWithTheme(component) {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
}

afterEach(cleanup);

test("should render with theme and passed props", () => {
  const errors = [
    {
      field: "testField",
      error: "This field is required."
    },
    {
      field: "testField2",
      error: "This field must be unique."
    }
  ];
  const { asFragment } = renderWithTheme(
    <Error errors={errors} field="testField" />
  );
  expect(asFragment()).toMatchSnapshot();
});
