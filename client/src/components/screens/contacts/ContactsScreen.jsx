import React, { useState } from "react";

import "./styles/ContactsScreen.scss";
import ContactList from "./ContactList";
import ContactInfo from "./ContactInfo";
import { Spinner } from "../../reusable";

export default function ContactsScreen({ contacts, setModal, user }) {
  if (!contacts) return <LoadingContacts />;
  const [selectedContactId, selectContact] = useState(
    localStorage.getItem("prevSelectedContact") ||
      (contacts.length > 0 ? contacts[0]._id : null)
  );
  const selectedContact = contacts.find(c => c._id === selectedContactId);
  localStorage.setItem("prevSelectedContact", selectedContactId);

  return (
    <div className="ContactsScreen App-screen">
      <ContactList
        contacts={contacts}
        selectContact={selectContact}
        selectedContactId={selectedContactId}
        setModal={setModal}
        user={user}
      />
      <ContactInfo contact={selectedContact} setModal={setModal} />
    </div>
  );
}

const LoadingContacts = () => (
  <div className="ContactsScreen">
    <Spinner />
  </div>
);
