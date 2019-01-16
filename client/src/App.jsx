import React, { useEffect, useState } from "react";

import ContactsScreen from "./components/screens/contacts/ContactsScreen";
import ServerCall from "./components/screens/ServerCall";
import SideMenu from "./SideMenu";
import EditContactModal from "./components/screens/modals/EditContactModal";
import LinkAccountModal from "./components/screens/modals/LinkAccountModal";

import { getUserById } from "./helpers/graphql";

export default function App() {
  const [route, navigate] = useState("Contacts");
  const [modal, setModal] = useState({ screen: null, context: null });
  const [user, setUser] = useState(null);
  const [contacts, setContacts] = useState(null);

  const updateData = () => {
    loadData().then(({ user }) => {
      const { contacts } = user;
      delete user.contacts;
      setUser(user);
      setContacts(contacts);
    });
  };

  // Only re-run the effect if route changes
  useEffect(updateData, [route]);

  const closeModal = () => {
    setModal({ screen: null, context: null });
    // temporary: when user is done with editing modal, reload all
    // fututre: add mobx, update individual contacts, users on update actions
    updateData();
  };

  return (
    <div className="App">
      <SideMenu navigate={navigate} route={route} user={user} />
      <div className="App-content">
        {route === "Contacts" && (
          <ContactsScreen contacts={contacts} setModal={setModal} />
        )}
        {route === "Notifications" && <h1>NOTIFICATIONS SCREEN</h1>}
        {route === "History" && <ServerCall />}
      </div>
      {modal.screen && <AppModal modal={modal} closeModal={closeModal} />}
    </div>
  );
}

const AppModal = function({ modal, closeModal }) {
  switch (modal.screen) {
    case "EditContact":
      return <EditContactModal onClose={closeModal} context={modal.context} />;
    case "LinkAccount":
      return <LinkAccountModal onClose={closeModal} context={modal.context} />;
    default:
      throw new Error("Unrecognized modal");
  }
};

const loadData = () => {
  return new Promise(resolve => {
    getUserById("5c3cd65a8474e01b17a8101d").then(data => {
      const {
        user: { contacts }
      } = data;
      contacts &&
        contacts.forEach(c => {
          c.displayName = generateDisplayName(c);
        });
      resolve(data);
    });
  });
};

const generateDisplayName = contact => {
  if (contact.firstName || contact.lastName) {
    return `${contact.firstName || ""}${
      contact.firstName && contact.lastName ? ` ` : ``
    }${contact.lastName || ""}`;
  }
  return contact.email || contact.homePhone || contact.workPhone || "?";
};
