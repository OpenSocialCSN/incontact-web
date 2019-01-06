import React, { useState } from "react";

import SideMenu from "./SideMenu";

export default function App() {
  const [route, navigate] = useState("Contacts");

  return (
    <div className="App">
      <SideMenu navigate={navigate} route={route} />
      <div className="App-content">
        {route === "Contacts" && <h1>CONTACTS SCREEN</h1>}
        {route === "Notifications" && <h1>NOTIFICATIONS SCREEN</h1>}
        {route === "History" && <h1>HISTORY SCREEN</h1>}
      </div>
    </div>
  );
}
