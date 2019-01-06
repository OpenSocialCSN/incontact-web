import React, { useState } from "react";

import "./styles/ContactsScreen.scss";

export default function ContactsScreen({ contacts = [] }) {
  const [selectedContact, selectContact] = useState(null);
  const selectedContactId = selectedContact && selectedContact.id;

  return (
    <div className="ContactsScreen">
      <div className="Contacts-listColumn">
        <span className="Contacts-titleRow">
          <h1>Contact List</h1>
          <span className="Contacts-newContactBtn">+</span>
        </span>
        <span className="Contacts-titleRow">
          <span>filter btn</span>
          <input type="text" placeholder="Search..." />
        </span>
        <ContactList
          contacts={contacts}
          selectContact={selectContact}
          selectedContactId={selectedContactId}
        />
      </div>
      <div className="Contacts-contactInfoColumn">contact info</div>
    </div>
  );
}

const ContactList = ({ contacts, selectContact, selectedContactId }) => {
  return (
    contacts &&
    contacts.map((c, i) => (
      <ContactListItem
        key={i}
        contact={c}
        selectContact={selectContact}
        isActive={selectedContactId === c.id}
      />
    ))
  );
};

const ContactListItem = ({ contact, selectContact, isActive }) => (
  <div
    className={`ContactListItem${isActive ? " active" : ""}`}
    onClick={() => selectContact(contact)}
  >
    {contact.displayName}
  </div>
);
