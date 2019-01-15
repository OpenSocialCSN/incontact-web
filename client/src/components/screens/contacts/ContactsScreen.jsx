import React, { useEffect, useRef, useState } from "react";

import "./styles/ContactsScreen.scss";
import ContactList from "./ContactList";
import ContactInfo from "./ContactInfo";

export default function ContactsScreen({ contacts, setModal }) {
  if (!contacts) return "loading..";
  const [selectedContactId, selectContact] = useState(
    contacts ? contacts[0]._id : null
  );

  contacts = sortContacts(contacts);

  const prevContacts = usePrevious(contacts);
  useEffect(
    () => {
      if (contacts && !prevContacts) {
        // initial load complete
        selectContact(contacts[0]._id);
      }
    },
    [contacts]
  );

  const selectedContact = contacts.find(c => c._id === selectedContactId);

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

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const sortContacts = contactsArr =>
  contactsArr.slice(0).sort((a, b) => {
    if (a.lastName < b.lastName) {
      return -1;
    } else if (a.lastName === b.lastName) {
      return a.firstName < b.firstName ? -1 : 1;
    } else if (a.lastName > b.lastName) {
      return 1;
    }
    return 0;
  });
