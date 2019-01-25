import React, { useEffect, useState } from "react";
import { Route, withRouter } from "react-router-dom";

import Register from "./components/screens/auth/Register";
import Onboarding from "./components/screens/auth/Onboarding";
import ContactsScreen from "./components/screens/contacts/ContactsScreen";
import ServerCall from "./components/screens/ServerCall";
import SideMenu from "./SideMenu";
import EditContactModal from "./components/screens/modals/EditContactModal";
import LinkAccountModal from "./components/screens/modals/LinkAccountModal";
import { getUserById } from "./helpers/graphql";
import { getCache, setCache } from "./helpers/cacheHelper";
import { history } from "./helpers/routerHelper";

let userId = getCache("userId");
if (!userId) {
  history.push("/Register");
}

function App({ location, history }) {
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

  return (
    <div className="App">
      <Route
        path="/Register"
        component={() => <Register setUserId={setUserId} userId={userId} />}
      />
      <Route path="/Onboarding" component={() => <Onboarding user={user} />} />
      {userId && APP_ROUTES.includes(location.pathname) && (
        <SideMenu user={user} setUserId={setUserId} />
      )}
      <Route
        path="/(|Contacts)/" // "/" OR "/Contacts"
        component={() => (
          <ContactsScreen contacts={contacts} setModal={setModal} user={user} />
        )}
      />
      <Route path="/Notifications" component={Notifications} />
      <Route path="/History" component={ServerCall} />
      {modal.screen && (
        <AppModal modal={modal} closeModal={closeModal} userId={user._id} />
      )}
    </div>
  );
}

export default withRouter(App);

const APP_ROUTES = ["/", "/Contacts", "/Notifications", "/History"];

const Notifications = () => (
  <span className="App-screen">
    <h1>NOTIFICATIONS SCREEN</h1>
  </span>
);

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
