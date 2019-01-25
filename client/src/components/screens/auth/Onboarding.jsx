import React from "react";

import { history } from "../../../helpers/routerHelper";
import emailIcon from "../../../assets/images/email.png";
import socialIcons from "../../../assets/images/social/";

export default function Onboarding({ userId }) {
  return (
    <div className="Onboarding Onboard-screen">
      <div className="Onboard-card card">
        <h2>Sync Accounts</h2>

        <div className="OnboardSyncItems">
          <OnboardSyncItem
            icon={socialIcons.google}
            title="Google"
            onClick={() => CLICK_HANDLERS.google(userId)}
          />
          <OnboardSyncItem
            icon={socialIcons.facebook}
            title="Facebook"
            onClick={() => alert("TODO")}
          />
          <OnboardSyncItem
            icon={emailIcon}
            title="Other Email"
            onClick={() => alert("TODO")}
          />
        </div>
        <button onClick={() => history.push("/Contacts")}> Done!</button>
      </div>
    </div>
  );
}

const OnboardSyncItem = ({ icon, title, onClick }) => (
  <div className="OnboardSyncItem" onClick={onClick}>
    <span className="iconAndName">
      <img src={icon} alt={`${title} icon`} />
      <span>{title}</span>
    </span>
    <button>Add</button>
  </div>
);

const CLICK_HANDLERS = {
  google: userId =>
    window.open(
      `${BASE_URI}integrations/google/authUrl?userId=${userId}`,
      "_self"
    )
};

const BASE_URI = window.location.href.includes("localhost")
  ? "http://localhost:5000/"
  : "https://incontactme.herokuapp.com/";
