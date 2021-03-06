import React from "react";

import "./styles/Modals.scss";
import { Modal } from "../../reusable";
import { useFormInput } from "../../../helpers/customHooks";
import { createContact, updateContact } from "../../../api/contactsApi";

export default function EditContactModal({
  context: { contact } = {},
  userId,
  onClose,
  onCancel
}) {
  const c = contact || {};
  const form = {
    firstName: useFormInput(c.firstName),
    lastName: useFormInput(c.lastName),
    homeEmail: useFormInput(c.homeEmail),
    workEmail: useFormInput(c.workEmail),
    homeAddress: useFormInput(c.homeAddress),
    workAddress: useFormInput(c.workAddress),
    homePhone: useFormInput(c.homePhone),
    workPhone: useFormInput(c.workPhone)
  };

  const submit = () => {
    const submitData = {};
    Object.keys(form).forEach(key => {
      submitData[key] = form[key].value;
    });
    if (contact) {
      //edit
      submitData._id = contact._id;
      updateContact(submitData, userId).then(() => onClose());
    } else {
      //create
      createContact(submitData, userId).then(() => onClose());
    }
  };

  return (
    <Modal onClose={onCancel}>
      <span className="EditContactModal">
        <div className="column">
          <h2>Contact Details</h2>
          <h3> {contact ? `Edit Contact` : `New Contact`}</h3> <br />
          {/* <div className="Modal-nameForm">
            <input type="text" placeholder="First" {...form.firstName} />
            <input type="text" placeholder="Last" {...form.lastName} />
          </div> */}
          <div className="Modal-form">
            {Object.keys(form).map((field, i) => (
              <input
                key={i}
                type="text"
                placeholder={uncamel(field)}
                {...form[field]}
              />
            ))}
          </div>
        </div>
        <div className="column">
          <h2>Social</h2>
          {Array.from({ length: 20 }, (_, idx) => `${++idx}`).map(i => (
            <br key={i} />
          ))}
          <span className="EditContactModal-saveBtns">
            <button onClick={submit}>SAVE</button>
            <button className="btn-secondary" onClick={onClose}>
              CANCEL
            </button>
          </span>
        </div>
      </span>
    </Modal>
  );
}

const uncamel = str =>
  str.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase());
