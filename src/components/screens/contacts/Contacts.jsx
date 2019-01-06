import React, { useState } from "react";

import "./styles/Contacts.scss";

export default function Contacts({ contacts = [] }) {
  const [selectedContact, selectContact] = useState(null);

  return (
    <div className="Contacts">
      <div className="Contacts-listColumn">
        <span className="Contacts-titleRow">
          <h1>Contact List</h1>
          <span className="Contacts-newContactBtn">+</span>
        </span>
        <span className="Contacts-titleRow">
          <span>filter btn</span>
          <input type="text" placeholder="Search..." />
        </span>
        {contacts &&
          contacts.map((c, i) => <ContactListItem key={i} contact={c} />)}
      </div>
      <div className="Contacts-contactInfoColumn">contact info</div>
    </div>
  );
}

const ContactListItem = ({ contact, selectContact, is }) => (
  <div className="ContactListItem">{contact.displayName}</div>
);
