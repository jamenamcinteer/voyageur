import React from "react";
import { render, cleanup } from "@testing-library/react";
import Login from "../../components/Login";

afterEach(cleanup);

it("renders", () => {
  const { asFragment } = render(<Login />);
  expect(asFragment()).toMatchSnapshot();
});
