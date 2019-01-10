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
      <div className="LinkAccountModal modalContent">
        <h2>Link Account</h2>
        <img
          src={socialIcons.google}
          onClick={CLICK_HANDLERS.google}
          alt="Google icon"
        />
        <h2>TODO</h2>
        {Object.keys(socialIcons).map((service, i) => (
          <img key={i} src={socialIcons[service]} alt="" />
        ))}
      </div>
    </Modal>
  );
}

const CLICK_HANDLERS = {
  google: () => window.open(`${BASE_URI}integrations/google/authUrl`, "_blank")
};

const BASE_URI = window.location.href.includes("localhost")
  ? "http://localhost:5000/"
  : "https://incontactme.herokuapp.com/";
