import React, { useState } from "react";
import { MdFilterList } from "react-icons/md";

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
      <div className="Contacts-listColumn column">
        <span className="Contacts-titleRow">
          <h1>Contact List</h1>
          <span
            className="Contacts-newContactBtn"
            onClick={() => setModal({ screen: "EditContact" })}
          >
            +
          </span>
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
      <ContactInfo contact={selectedContact} setModal={setModal} />
    </div>
  );
}
