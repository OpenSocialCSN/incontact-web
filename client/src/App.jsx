import React, { useState } from "react";

import ContactsScreen from "./components/screens/contacts/ContactsScreen";
import SideMenu from "./SideMenu";

const getRan = arr => arr[Math.floor(Math.random() * arr.length)];
const FIRST_NAMES = ["Joe", "Anne", "Eric", "Tina"];
const LAST_NAMES = ["Adams", "Johnson", "Nance", "Smith"];
const FAKE_CONTACTS = [];

for (let i = 0; i < 15; i++) {
  const firstName = getRan(FIRST_NAMES);
  const lastName = getRan(LAST_NAMES);

  FAKE_CONTACTS.push({
    displayName: firstName + " " + lastName,
    firstName,
    lastName,
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
