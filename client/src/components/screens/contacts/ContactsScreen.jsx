import React, { useState } from "react";
import { MdFilterList } from "react-icons/md";

import "./styles/ContactsScreen.scss";
import ContactListItem from "./ContactListIstem";
import ContactInfo from "./ContactInfo";

export default function ContactsScreen({ contacts = [] }) {
  const [selectedContact, selectContact] = useState(
    contacts ? contacts[0] : null
  );
  const selectedContactId = selectedContact && selectedContact.id;

  return (
    <div className="ContactsScreen">
      <div className="Contacts-listColumn column">
        <span className="Contacts-titleRow">
          <h1>Contact List</h1>
          <span className="Contacts-newContactBtn">+</span>
        </span>
        <span className="Contacts-titleRow">
          <button>
            <MdFilterList /> Filter
          </button>
          <input
            type="text"
            placeholder="Search... TODO"
            style={{ backgroundImage: MdFilterList }}
          />
        </span>
        <ContactList
          contacts={contacts}
          selectContact={selectContact}
          selectedContactId={selectedContactId}
        />
      </div>
      <ContactInfo contact={selectedContact} />
    </div>
  );
}

const ContactList = ({ contacts, selectContact, selectedContactId }) => {
  const sortedContacts = contacts.slice(0).sort((a, b) => {
    if (a.lastName < b.lastName) {
      return -1;
    } else if (a.lastName === b.lastName) {
      return a.firstName < b.firstName ? -1 : 1;
    } else if (a.lastName > b.lastName) {
      return 1;
    }
    return 0;
  });

  return (
    <div className="ContactList">
      <div className="ContactList-background">
        {sortedContacts &&
          sortedContacts.map((c, i) => (
            <ContactListItem
              key={i}
              contact={c}
              selectContact={selectContact}
              isActive={selectedContactId === c.id}
            />
          ))}
      </div>
    </div>
  );
};
