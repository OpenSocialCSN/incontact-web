import React from "react";
import { MdEdit, MdMoreVert } from "react-icons/md";

import "./styles/ContactInfo.scss";
import phoneIcon from "../../../assets/images/phone.png";
import emailIcon from "../../../assets/images/email.png";
import addressIcon from "../../../assets/images/address.png";
import socialIcons from "../../../assets/images/social";
import { Avatar, Dropdown } from "../../reusable";
import { deleteContactById } from "../../../helpers/graphql";

export default function ContactInfo({ contact, setModal }) {
  return contact ? (
    <div className="ContactInfo column">
      <div className="ContactInfo-container">
        <div className="ContactListItem card">
          <span className="ContactListItem-iconAndName">
            <Avatar user={contact} size={70} />
            <h2>{contact.displayName}</h2>
          </span>
          <span className="ContactInfo-headerBtns">
            <span
              className="ContactInfo-edit"
              onClick={() =>
                setModal({ screen: "EditContact", context: { contact } })
              }
            >
              <MdEdit /> Edit
            </span>
            <Dropdown
              position="left"
              dropdownItems={[
                {
                  body: "View History",
                  onClick: () => alert("TODO")
                },
                {
                  body: "Delete Contact",
                  onClick: () =>
                    window.confirm(
                      "Are you sure you want to delete this contact?"
                    ) && deleteContactById(contact._id)
                },
                {
                  body: "Export",
                  onClick: () => alert("TODO")
                }
              ]}
            >
              <button className="ContactInfo-more">
                <MdMoreVert />
              </button>
            </Dropdown>
          </span>
        </div>
        <div className="ContactInfo-content">
          <div className="column">
            <div className="card">Add note</div>
            <div className="card">
              <h2>Activity</h2>
              {Array.from({ length: 11 }, (_, idx) => `${++idx}`).map(i => (
                <br key={i} />
              ))}
            </div>
          </div>
          <div className="column">
            <ContactDetails contact={contact} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <NoContactSelected />
  );
}

const ContactDetails = ({ contact = {} }) => {
  const social = contact.social || {};
  return (
    <div className="ContactDetails card">
      <h2>Contact Details</h2>
      {contact.homeEmail && (
        <ContactDetailItem
          icon={emailIcon}
          label="HOME"
          value={contact.homeEmail}
        />
      )}
      {contact.workEmail && (
        <ContactDetailItem
          icon={emailIcon}
          label="WORK"
          value={contact.workEmail}
        />
      )}
      {contact.homePhone && (
        <ContactDetailItem
          icon={phoneIcon}
          label="HOME"
          value={contact.homePhone}
        />
      )}
      {contact.workPhone && (
        <ContactDetailItem
          icon={phoneIcon}
          label="WORK"
          value={contact.workPhone}
        />
      )}
      {contact.homeAddress && (
        <ContactDetailItem
          icon={addressIcon}
          label="HOME"
          value={contact.homeAddress}
        />
      )}
      {contact.workAddress && (
        <ContactDetailItem
          icon={addressIcon}
          label="WORK"
          value={contact.workAddress}
        />
      )}
      {social &&
        Object.keys(social).map((service, i) =>
          social[service] ? (
            <ContactDetailItem
              key={i}
              icon={socialIcons[service]}
              label={service.toUpperCase()}
              value={social[service]}
            />
          ) : null
        )}
    </div>
  );
};

const ContactDetailItem = ({ icon, label, value }) => {
  const isEmail = icon === emailIcon;
  const isPhone = icon === phoneIcon;
  const linkProps = isEmail
    ? {
        href: `mailto:${value}`
      }
    : {
        href: value,
        target: "_blank",
        rel: "noopener noreferrer"
      };

  return (
    <div className="ContactDetailItem">
      <Icon src={icon} />
      <span>
        <div className="ContactDetailItem-label">{label}</div>
        {isPhone ? value : <a {...linkProps}>{trimHttpFromLink(value)}</a>}
      </span>
    </div>
  );
};

const Icon = ({ src }) => <img src={src} alt="icon" style={{ height: 25 }} />;

const trimHttpFromLink = link => link.replace(/(http)s?:\/\/(www\.)?/, "");

const NoContactSelected = () => (
  <div className="ContactInfo column">
    <div className="ContactInfo-container" />
  </div>
);
