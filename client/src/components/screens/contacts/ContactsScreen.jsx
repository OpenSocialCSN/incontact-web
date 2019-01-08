import React, { useState } from "react";

import "./styles/ContactsScreen.scss";
import ContactList from "./ContactList";
import ContactInfo from "./ContactInfo";

export default function ContactsScreen({ contacts = [], setModal }) {
  const [selectedContact, selectContact] = useState(
    contacts ? contacts[0] : null
  );
  const selectedContactId = selectedContact && selectedContact.id;

  return (
    <div className="ContactsScreen">
      <ContactList
        contacts={contacts}
        selectContact={selectContact}
        selectedContactId={selectedContactId}
        setModal={setModal}
      />
      <ContactInfo contact={selectedContact} setModal={setModal} />
    </div>
  );
}
