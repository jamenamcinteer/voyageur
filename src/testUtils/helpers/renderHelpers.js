import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import theme from "../../theme";
import "jest-styled-components";

export function renderWithTheme(component) {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
}
