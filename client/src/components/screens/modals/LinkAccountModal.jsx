import React from "react";

import "./styles/Modals.scss";
import { Modal } from "../../reusable";
import LinkAccount from "../../reusable/LinkAccount";

export default function LinkAccountModal({
  context: { someProp } = {},
  userId,
  onClose
}) {
  return (
    <Modal onClose={onClose}>
      <div className="LinkAccountModal modalContent">
        <h2>Link Account</h2>
        <LinkAccount userId={userId} />
      </div>
    </Modal>
  );
}
