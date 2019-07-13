import React from "react";
import AppRouter from "./routers/AppRouter";
import "./App.css";
import { ThemeProvider } from "styled-components";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRouter theme={theme} />
    </ThemeProvider>
  );
}

export default App;
