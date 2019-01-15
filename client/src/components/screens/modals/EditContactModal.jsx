import React from "react";

import "./styles/Modals.scss";
import { Modal } from "../../reusable";
import { useFormInput } from "../../../helpers/customHooks";
import { createContact, updateContact } from "../../../helpers/graphql";

export default function EditContactModal({
  context: { contact } = {},
  onClose
}) {
  const c = contact || {};
  const firstName = useFormInput(c.firstName);
  const lastName = useFormInput(c.lastName);

  function submit() {
    const formData = {
      firstName: firstName.value,
      lastName: lastName.value
    };
    if (contact) {
      //edit
      formData._id = contact._id;
      updateContact(formData);
    } else {
      //create
      createContact(formData);
    }
  }

  return (
    <Modal onClose={onClose}>
      <span className="EditContactModal">
        <div className="column">
          <h2>Contact Details</h2>
          <h3> {contact ? `Edit Contact` : `New contact`}</h3> <br />
          <input type="text" placeholder="First" {...firstName} />
          <input type="text" placeholder="Last" {...lastName} />
        </div>
        <div className="column">
          <h2>Social</h2>
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
          <br />
          <span className="EditContactModal-saveBtns">
            <button
              onClick={() => {
                onClose();
                submit();
              }}
            >
              SAVE
            </button>
            <button className="btn-secondary" onClick={onClose}>
              CANCEL
            </button>
          </span>
        </div>
      </span>
    </Modal>
  );
}
