import React from "react";

import { Avatar } from "../../reusable";
import phone from "../../../assets/images/phone.png";
import email from "../../../assets/images/email.png";
import linkedin from "../../../assets/images/social/linkedin.png";
import skype from "../../../assets/images/social/skype.png";

export default function ContactListItem({ contact, selectContact, isActive }) {
  return (
    <div
      className={`ContactListItem${isActive ? " active" : ""}`}
      onClick={() => selectContact(contact)}
    >
      <span className="ContactListItem-iconAndName">
        <Avatar user={contact} size={51} />
        <h2>{contact.displayName}</h2>
      </span>
      <span className="ContactListItem-icons">
        <img src={phone} alt="" style={{ height: 25 }} />
        <img src={email} alt="" style={{ height: 25 }} />
        <img src={linkedin} alt="" style={{ height: 25 }} />
        <img src={skype} alt="" style={{ height: 25 }} />
      </span>
    </div>
  );
}
