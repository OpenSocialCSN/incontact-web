import React from "react";
import { MdEdit } from "react-icons/md";

import "./styles/ContactInfo.scss";
import phone from "../../../assets/images/phone.png";
import email from "../../../assets/images/email.png";
import socialImages from "../../../assets/images/social";
import { Avatar } from "../../reusable";

export default function ContactInfo({ contact = {}, setModal }) {
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
            onClick={() =>
              setModal({ screen: "EditContact", context: { contact } })
            }
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
            <div className="ContactDetails card">
              <h2>Contact Details</h2>
              {contact.homeEmail && (
                <ContactDetailItem
                  icon={email}
                  label="HOME"
                  value={contact.homeEmail}
                />
              )}
              {contact.workEmail && (
                <ContactDetailItem
                  icon={email}
                  label="WORK"
                  value={contact.workEmail}
                />
              )}
              {contact.homePhone && (
                <ContactDetailItem
                  icon={phone}
                  label="HOME"
                  value={contact.homePhone}
                />
              )}
              {contact.workPhone && (
                <ContactDetailItem
                  icon={phone}
                  label="WORK"
                  value={contact.workPhone}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ContactDetailItem = ({ icon, label, value }) => (
  <div className="ContactDetailItem">
    <Icon src={icon} />
    <span>
      <div className="ContactDetailItem-label">{label}</div>
      <div>{value}</div>
    </span>
  </div>
);

const Icon = ({ src }) => <img src={src} alt="" style={{ height: 25 }} />;
