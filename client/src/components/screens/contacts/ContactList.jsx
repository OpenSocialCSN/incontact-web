import React, { useEffect, useState } from "react";
import { MdFilterList } from "react-icons/md";

import { Dropdown } from "../../reusable";
import ContactListItem from "./ContactListIstem";
import LinkAccount from "../../reusable/LinkAccount";

export default function ContactList({
  contacts,
  selectContact,
  selectedContactId,
  setModal
}) {
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const [query, setQuery] = useState("");

  useEffect(
    // re-filter anytime query, or contacts changes
    () => {
      setFilteredContacts(filterContacts(query, contacts));
    },
    [query, contacts]
  );

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
      {contacts[0] ? (
        <React.Fragment>
          <span className="ContactList-titleRow">
            <button>
              <MdFilterList /> Filter
            </button>
            <input
              type="text"
              placeholder="Search..."
              onChange={e => setQuery(e.target.value)}
              style={{ backgroundImage: MdFilterList }}
            />
          </span>
          <ScrollableContactList
            contacts={filteredContacts}
            selectContact={selectContact}
            selectedContactId={selectedContactId}
          />
        </React.Fragment>
      ) : (
        <GetStarted />
      )}
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

const GetStarted = () => (
  <div>
    <h2>Import your contacts to get started</h2>
    <LinkAccount />
  </div>
);

const filterContacts = (query, contacts) =>
  contacts.filter(c =>
    c.displayName.toUpperCase().includes(query.toUpperCase())
  );
