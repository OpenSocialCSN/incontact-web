import React from "react";

import "./styles/Modals.scss";
import { Modal, LinkAccounts } from "../../reusable";

export default function LinkAccountsModal({
  context: { someProp } = {},
  user,
  onClose,
  onCancel
}) {
  return (
    <span className="LinkAccountsModal">
      <Modal onClose={onCancel}>
        <LinkAccounts user={user} onClose={onClose} />
      </Modal>
    </span>
  );
}
