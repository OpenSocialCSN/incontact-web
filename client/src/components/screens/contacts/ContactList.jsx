import React from "react";

import ContactListItem from "./ContactListIstem";

export default function ContactList({
  contacts,
  selectContact,
  selectedContactId
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
}
