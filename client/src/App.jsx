import React, { useEffect, useState } from "react";
import { Route, withRouter } from "react-router-dom";

import ContactsScreen from "./components/screens/contacts/ContactsScreen";
import ServerCall from "./components/screens/ServerCall";
import SideMenu from "./SideMenu";
import EditContactModal from "./components/screens/modals/EditContactModal";
import LinkAccountModal from "./components/screens/modals/LinkAccountModal";
import { getUserById } from "./helpers/graphql";
import { getCache, setCache } from "./helpers/cacheHelper";
import Register from "./components/screens/auth/Register";

let userId = getCache("userId");

function App({ location }) {
  const [modal, setModal] = useState({ screen: null, context: null });
  const [user, setUser] = useState(null);
  const [contacts, setContacts] = useState(null);

  const updateData = (id, shouldLogout = false) => {
    id = id || userId;
    if (id && !shouldLogout) {
      loadData(id).then(({ user }) => {
        const { contacts } = user;
        delete user.contacts;
        setUser(user);
        setContacts(contacts);
      });
    } else {
      // logout || initial page load w/ no user
      setUser(null);
      setContacts(null);
    }
  };

  const closeModal = () => {
    setModal({ screen: null, context: null });
    // temporary: when user is done with editing modal, reload all
    // fututre: add mobx, update individual contacts, users on update actions
    updateData();
  };

  const setUserId = id => {
    userId = id;
    setCache("userId", id);
    updateData(id, id ? false : true);
  };

  // Only re-run the effect if route changes
  useEffect(() => updateData(userId), [location.pathname]);

  if (!userId) {
    return <Register setUserId={setUserId} />;
  }

  return (
    <div className="App">
      <SideMenu user={user} setUserId={setUserId} />
      <div className="App-content">
        <Route
          path="/(|Contacts)/" // "/" OR "/Contacts"
          component={() => (
            <ContactsScreen
              contacts={contacts}
              setModal={setModal}
              user={user}
            />
          )}
        />
        <Route path="/Notifications" component={Notifications} />
        <Route path="/History" component={ServerCall} />
      </div>
      {modal.screen && (
        <AppModal modal={modal} closeModal={closeModal} userId={user._id} />
      )}
    </div>
  );
}

export default withRouter(App);

const Notifications = () => <h1>NOTIFICATIONS SCREEN</h1>;

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
