import React, { useState } from "react";
import { MdFilterList } from "react-icons/md";

import { Dropdown } from "../../reusable";
import ContactListItem from "./ContactListIstem";

export default function ContactList({
  contacts,
  selectContact,
  selectedContactId,
  setModal
}) {
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const handleSearch = e =>
    setFilteredContacts(filterContacts(e.target.value, contacts));

  return (
    <div className="ContactList column">
      <span className="ContactList-titleRow">
        <h1>Contact List</h1>
        <Dropdown
          dropdownItems={[
            {
              body: "New Contact",
              onClick: () => setModal({ screen: "EditContact" })
            },
            {
              body: "Link Account",
              onClick: () => setModal({ screen: "LinkAccount" })
            },
            {
              body: "Import Contacts",
              onClick: () => alert("TODO")
            }
          ]}
        >
          <span className="ContactList-newContactBtn">+</span>
        </Dropdown>
      </span>
      <span className="ContactList-titleRow">
        <button>
          <MdFilterList /> Filter
        </button>
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearch}
          style={{ backgroundImage: MdFilterList }}
        />
      </span>
      <ScrollableContactList
        contacts={filteredContacts}
        selectContact={selectContact}
        selectedContactId={selectedContactId}
      />
    </div>
  );
}

const ScrollableContactList = ({
  contacts = [],
  selectContact,
  selectedContactId
}) => (
  <div className="ContactList-contacts">
    <div className="ContactList-background">
      {contacts &&
        contacts.map((c, i) => (
          <ContactListItem
            key={i}
            contact={c}
            selectContact={selectContact}
            isActive={selectedContactId === c._id}
          />
        ))}
    </div>
  </div>
);

const filterContacts = (query, contacts) =>
  contacts.filter(c =>
    c.displayName.toUpperCase().includes(query.toUpperCase())
  );
