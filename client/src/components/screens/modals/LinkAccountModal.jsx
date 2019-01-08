import React from "react";

import "./styles/Modals.scss";
import { Modal } from "../../reusable";
import socialIcons from "../../../assets/images/social";

export default function LinkAccountModal({
  context: { someProp } = {},
  onClose
}) {
  return (
    <Modal onClose={onClose}>
      <div className="modalContent">
        <h2>Link Account</h2>
        {Object.keys(socialIcons).map((service, i) => (
          <img key={i} src={socialIcons[service]} alt="" />
        ))}
      </div>
    </Modal>
  );
}
