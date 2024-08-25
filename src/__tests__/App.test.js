import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { Provider } from "react-redux";
import store from "../store/bigPie";
import { HashRouter as Router } from "react-router-dom";

test("renders App component", () => {
  render(
    <Provider store={store}>
      <Router>
        <App data-testid="app-component" />
      </Router>
    </Provider>
  );

  // Check if the App component renders without crashing
  const appElement = screen.getByTestId("app-component");
  expect(appElement).toBeInTheDocument();
});
