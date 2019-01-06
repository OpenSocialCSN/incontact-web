import React, { useState } from "react";

import ContactsScreen from "./components/screens/contacts/ContactsScreen";
import SideMenu from "./SideMenu";

const FAKE_CONTACTS = [];
for (let i = 0; i < 40; i++) {
  FAKE_CONTACTS.push({
    displayName: "Andrew Jones",
    id: i
  });
}

export default function App() {
  const [route, navigate] = useState("Contacts");

  return (
    <div className="App">
      <SideMenu navigate={navigate} route={route} />
      <div className="App-content">
        {route === "Contacts" && <ContactsScreen contacts={FAKE_CONTACTS} />}
        {route === "Notifications" && <h1>NOTIFICATIONS SCREEN</h1>}
        {route === "History" && <h1>HISTORY SCREEN</h1>}
      </div>
    </div>
  );
}
