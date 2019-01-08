import React from "react";
import { MdEdit } from "react-icons/md";

import "./styles/ContactInfo.scss";
import { Avatar } from "../../reusable";

export default function ContactInfo({ contact, setModal }) {
  return (
    <div className="ContactInfo column">
      <div className="ContactInfo-container">
        <div className="ContactListItem card">
          <span className="ContactListItem-iconAndName">
            <Avatar user={contact} size={70} />
            <h2>{contact.displayName}</h2>
          </span>
          <span
            className="ContactInfo-edit"
            onClick={() => setModal("EditContact")}
          >
            <MdEdit /> Edit
          </span>
        </div>
        <div className="ContactInfo-content">
          <div className="column">
            <div className="card">Add note</div>
            <div className="card">
              <h2>Activity</h2>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
          <div className="column">
            <div className="card">
              <h2>Contact Details</h2>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
