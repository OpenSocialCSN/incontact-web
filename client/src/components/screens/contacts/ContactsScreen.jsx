import React, { useEffect, useState } from "react";

import "./styles/ContactsScreen.scss";
import ContactList from "./ContactList";
import ContactInfo from "./ContactInfo";
import { usePrevious } from "../../../helpers/customHooks";
import { Spinner } from "../../reusable";

export default function ContactsScreen({ contacts, setModal }) {
  if (!contacts) return <LoadingContacts />;

  const [selectedContactId, selectContact] = useState(
    contacts.length > 0 ? contacts[0]._id : null
  );

  contacts = sortContacts(contacts);

  const prevContacts = usePrevious(contacts);
  useEffect(
    () => {
      if (contacts[0] && !prevContacts) {
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

const LoadingContacts = () => (
  <div className="ContactsScreen">
    <Spinner />
  </div>
);
