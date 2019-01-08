import React from "react";

import "./styles/ContactInfo.scss";
import { Avatar } from "../../reusable";

export default function ContactInfo({ contact }) {
  return (
    <div className="ContactInfo column">
      <div className="ContactInfo-content">
        <div className="ContactListItem">
          <span className="ContactListItem-iconAndName card">
            <Avatar user={contact} size={51} />
            <h2>{contact.displayName}</h2>
          </span>
          edit btn
        </div>
        sdfas
      </div>
    </div>
  );
}
