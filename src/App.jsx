import React, { Component } from "react";
import logo from "./assets/images/logo-square180.png";

import SideMenu from "./SideMenu";

class App extends Component {
  render() {
    return (
      <div className="App">
        <SideMenu />
        <div className="AppContent">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>incontact.me</p>
          </header>
        </div>
      </div>
    );
  }
}

export default App;
