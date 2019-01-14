import React, { useEffect, useRef, useState } from "react";

import "./styles/ContactsScreen.scss";
import ContactList from "./ContactList";
import ContactInfo from "./ContactInfo";

export default function ContactsScreen({ contacts, setModal }) {
  if (!contacts) return "loading..";
  const [selectedContact, selectContact] = useState(
    contacts ? contacts[0] : null
  );
  const prevContacts = usePrevious(contacts);
  useEffect(
    () => {
      if (contacts && !prevContacts) {
        // initial load complete
        selectContact(contacts[0]);
      }
    },
    [contacts]
  );

  return (
    <div className="ContactsScreen">
      <ContactList
        contacts={contacts}
        selectContact={selectContact}
        selectedContactId={selectedContact && selectedContact._id}
        setModal={setModal}
      />
      <ContactInfo contact={selectedContact} setModal={setModal} />
    </div>
  );
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
