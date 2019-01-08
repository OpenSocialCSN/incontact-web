import React from "react";
import { MdFilterList } from "react-icons/md";

import { Dropdown } from "../../reusable";
import ContactListItem from "./ContactListIstem";

export default function ContactList({
  contacts,
  selectContact,
  selectedContactId,
  setModal
}) {
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
    <div className="ContactList column">
      <span className="ContactList-titleRow">
        <h1>Contact List</h1>
        <Dropdown
          dropdownItems={[
            {
              body: "New Contact",
              onClick: () => setModal({ screen: "EditContact" })
            },
            { body: "option2" }
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
          placeholder="Search... TODO"
          style={{ backgroundImage: MdFilterList }}
        />
      </span>
      <ScrollableContactList
        contacts={sortedContacts}
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
      {contacts.map((c, i) => (
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
