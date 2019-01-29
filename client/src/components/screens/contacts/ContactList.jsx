import React, { useEffect, useState } from "react";
import { MdFilterList } from "react-icons/md";

import { Dropdown } from "../../reusable";
import ContactListItem from "./ContactListIstem";
import LinkAccounts from "../../reusable/LinkAccounts";
import { getCache, setCache } from "../../../helpers/cacheHelper";

let contactsDiff = 0;
let prevContacts = null;
export default function ContactList({
  contacts,
  selectContact,
  selectedContactId,
  setModal,
  user
}) {
  const [filteredContacts, setFilteredContacts] = useState(
    getCache("prevFilteredContacts") || contacts
  );
  const [query, setQuery] = useState("");
  if (!arraysAreEqual(prevContacts, contacts)) contactsDiff++;
  prevContacts = contacts;

  useEffect(
    // re-filter anytime query, or contacts changes
    () => {
      const filtered = sortContacts(filterContacts(query, contacts));
      setFilteredContacts(filtered);
      setCache("prevFilteredContacts", filtered);
      if (contacts[0] && !prevContacts) {
        // initial load complete
        selectContact(filtered[0]._id);
      }
    },
    [query, contactsDiff]
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
        <GetStarted user={user} />
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

const GetStarted = ({ user }) => (
  <LinkAccounts
    user={user}
    title={`Import your contacts to get started`}
    hideDone
  />
);

const filterContacts = (query, contacts) =>
  contacts.filter(c =>
    c.displayName.toUpperCase().includes(query.toUpperCase())
  );

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

const arraysAreEqual = (a, b) => {
  if (a === b) return true;
  if (a === null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};
