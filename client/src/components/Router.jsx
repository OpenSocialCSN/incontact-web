import React from "react";
import { Router } from "react-router-dom";

import App from "./App";
import { history } from "../helpers/routerHelper";

export default function() {
  return (
    <Router history={history}>
      <App />
    </Router>
  );
}
