import React, { useEffect, useState } from "react";

import ContactsScreen from "./components/screens/contacts/ContactsScreen";
import ServerCall from "./components/screens/ServerCall";
import SideMenu from "./SideMenu";
import EditContactModal from "./components/screens/modals/EditContactModal";
import LinkAccountModal from "./components/screens/modals/LinkAccountModal";
import { getUserById } from "./helpers/graphql";
import { getCache, setCache } from "./helpers/cacheHelper";
import Register from "./components/screens/auth/Register";

let userId = getCache("userId");

export default function App() {
  const [route, navigate] = useState("Contacts");
  const [modal, setModal] = useState({ screen: null, context: null });
  const [user, setUser] = useState(null);
  const [contacts, setContacts] = useState(null);

  const updateData = id => {
    id = id || userId;
    loadData(id).then(({ user }) => {
      const { contacts } = user;
      delete user.contacts;
      setUser(user);
      setContacts(contacts);
    });
  };

  const closeModal = () => {
    setModal({ screen: null, context: null });
    // temporary: when user is done with editing modal, reload all
    // fututre: add mobx, update individual contacts, users on update actions
    updateData();
  };

  if (!userId) {
    return (
      <Register
        setUserId={id => {
          userId = id;
          updateData(id);
          setCache("userId", id);
        }}
      />
    );
  }

  // Only re-run the effect if route changes
  useEffect(updateData, [route]);

  return (
    <div className="App">
      <SideMenu navigate={navigate} route={route} user={user} />
      <div className="App-content">
        {route === "Contacts" && (
          <ContactsScreen contacts={contacts} setModal={setModal} user={user} />
        )}
        {route === "Notifications" && <h1>NOTIFICATIONS SCREEN</h1>}
        {route === "History" && <ServerCall />}
      </div>
      {modal.screen && (
        <AppModal modal={modal} closeModal={closeModal} userId={user._id} />
      )}
    </div>
  );
}

const AppModal = ({ modal, closeModal, userId }) => {
  const props = {
    onClose: closeModal,
    context: modal.context,
    userId
  };

  switch (modal.screen) {
    case "EditContact":
      return <EditContactModal {...props} />;
    case "LinkAccount":
      return <LinkAccountModal {...props} />;
    default:
      throw new Error("Unrecognized modal");
  }
};

const loadData = userId => {
  return new Promise(resolve => {
    getUserById(userId).then(data => {
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
