import React from "react";

import { Avatar } from "../../reusable";
import phone from "../../../assets/images/phone.png";
import email from "../../../assets/images/email.png";

import socialImages from "../../../assets/images/social";

export default function ContactListItem({ contact, selectContact, isActive }) {
  return (
    <div
      className={`ContactListItem card${isActive ? " active" : ""}`}
      onClick={() => selectContact(contact._id)}
    >
      <span className="ContactListItem-iconAndName">
        <Avatar user={contact} size={51} />
        <h2>{contact.displayName}</h2>
      </span>
      <ContactIcons contact={contact} />
    </div>
  );
}

const ContactIcons = function({ contact }) {
  const hasEmail = contact.workEmail || contact.homeEmail;
  const hasPhone = contact.workPhone || contact.homePhone;
  let iconCount = (hasEmail ? 1 : 0) + (hasPhone ? 1 : 0);
  const socialKeys = contact.social ? Object.keys(contact.social) : [];
  const socialIconJsx = [];
  for (let i = 0; i < socialKeys.length && iconCount < 4; i++) {
    if (contact.social[socialKeys[i]]) {
      iconCount++;
      socialIconJsx.push(<Icon key={i} src={socialImages[socialKeys[i]]} />);
    }
  }
  return (
    <span className="ContactListItem-icons">
      {hasPhone && <Icon src={phone} />}
      {hasEmail && <Icon src={email} />}
      {socialIconJsx}
    </span>
  );
};

const Icon = ({ src }) => <img src={src} alt="" style={{ height: 25 }} />;
