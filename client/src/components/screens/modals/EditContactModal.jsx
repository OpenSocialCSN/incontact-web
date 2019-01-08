import React from "react";

import "./styles/Modals.scss";
import { Modal } from "../../reusable";

export default function EditContactModal({
  context: { contact } = {},
  onClose
}) {
  return (
    <Modal onClose={onClose}>
      <span className="EditContactModal">
        <div className="column">
          <h2>Contact Details</h2>
          {contact ? (
            <div>
              editing {contact.firstName} {contact.lastName}
            </div>
          ) : (
            <span>New contact</span>
          )}
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
            <button>SAVE</button>
            <button className="btn-secondary">CANCEL</button>
          </span>
        </div>
      </span>
    </Modal>
  );
}
