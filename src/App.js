import React, { Component } from "react";
import logo from "./assets/images/logo-square180.png";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>incontact.me</p>
        </header>
      </div>
    );
  }
}

export default App;
