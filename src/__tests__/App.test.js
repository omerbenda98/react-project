import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { Provider } from "react-redux";
import store from "../store/bigPie";
import { HashRouter as Router } from "react-router-dom";

test("renders DogHome link", () => {
  const { container } = render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
  console.log(container.innerHTML); // Log the output
  const linkElement = screen.getByText(/&/i);
  expect(linkElement).toBeInTheDocument();
});
