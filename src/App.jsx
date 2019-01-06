import React, { useState } from "react";
import logo from "./assets/images/logo-square180.png";

import SideMenu from "./SideMenu";

export default function App() {
  const [route, navigate] = useState("Contacts");

  return (
    <div className="App">
      <SideMenu navigate={navigate} />
      <div className="AppContent">
        {route === "Contacts" && <h1>CONTACTS SCREEN</h1>}
        {route === "Notifications" && <h1>NOTIFICATIONS SCREEN</h1>}
        {route === "History" && <h1>HISTORY SCREEN</h1>}
      </div>
    </div>
  );
}
