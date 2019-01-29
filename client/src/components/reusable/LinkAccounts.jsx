import React from "react";
import { MdCheck } from "react-icons/md";

import "./styles/LinkAccounts.scss";
import { history } from "../../helpers/routerHelper";
import emailIcon from "../../assets/images/email.png";
import socialIcons from "../../assets/images/social/";
import {
  addUserIntegration,
  deleteUserIntegrationAccount
} from "../../api/usersApi";

export default function LinkAccounts({
  user = {},
  title,
  onClose = () => history.push("/Contacts"),
  hideDone = false
}) {
  if (!user) return <span />;
  const { integrations, _id: userId } = user;
  const integrationCounts = getIntegrationCounts(integrations, userId);

  return (
    <span className="LinkAccounts">
      <h2>{title || `Sync Accounts`}</h2>

      <div className="OnboardSyncItems">
        <OnboardSyncItem
          icon={socialIcons.google}
          title="Google"
          count={integrationCounts.google}
          onClick={() => CLICK_HANDLERS.google(userId)}
        />
        <OnboardSyncItem
          icon={socialIcons.linkedin}
          title="LinkedIn"
          count={integrationCounts.linkedin}
          onClick={() => alert("TODO")}
        />
        <OnboardSyncItem
          icon={socialIcons.facebook}
          title="Facebook"
          count={integrationCounts.facebook}
          onClick={() => alert("TODO")}
        />
        <OnboardSyncItem
          icon={socialIcons.twitter}
          title="Twitter"
          count={integrationCounts.twitter}
          onClick={() => alert("TODO")}
        />
        <OnboardSyncItem
          icon={socialIcons.skype}
          title="Skype"
          count={integrationCounts.skype}
          onClick={() => alert("TODO")}
        />
        <OnboardSyncItem
          icon={emailIcon}
          title="Other Email"
          count={integrationCounts.email}
          onClick={() => alert("TODO")}
        />
      </div>
      {!hideDone && <button onClick={onClose}>Done</button>}
    </span>
  );
}

const OnboardSyncItem = ({ icon, title, count = 0, onClick }) => (
  <div className="OnboardSyncItem" onClick={onClick}>
    <span className="iconAndName">
      <img src={icon} alt={`${title} icon`} />
      <span>{title}</span>
    </span>
    <span className="OnboardSyncItem-right">
      {count > 0 && (
        <React.Fragment>
          <MdCheck color="#32d296" size={30} />
          {count > 1 && <span>({count})</span>}
        </React.Fragment>
      )}
      <button className={count > 0 ? `btn-success` : ``}>
        {count > 0 ? `Add +1` : "Sync"}
      </button>
    </span>
  </div>
);

const CLICK_HANDLERS = {
  google: async userId => {
    console.log("userId:", userId);

    const { addUserIntegration: account } = await addUserIntegration({
      userId,
      serviceName: "google"
    });

    window.open(
      `${BASE_URI}integrations/google/authUrl?userId=${userId}&userIntegrationId=${
        account._id
      }&forwardingRoute=Onboarding`,
      "_self"
    );
  }
};

const BASE_URI = window.location.href.includes("localhost")
  ? "http://localhost:5000/"
  : "https://incontactme.herokuapp.com/";

const getIntegrationCounts = (integrations = [], userId) => {
  const counts = {};
  integrations.forEach(account => {
    const { serviceName, syncStatus } = account;
    if (syncStatus.includes("ERR_"))
      return deleteAccountAndNotifyUser(account, userId);
    if (syncStatus === "UNAUTHED") return;
    counts[serviceName] = counts[serviceName] ? ++counts[serviceName] : 1;
  });
  return counts;
};

const deleteAccountAndNotifyUser = ({ _id, syncStatus }, userId) => {
  if (!NOTIFIED_OF[syncStatus]) {
    NOTIFIED_OF[syncStatus] = true;
    alert(ERR_MESSAGES[syncStatus]);
    deleteUserIntegrationAccount({ _id, userId });
  }
};

const NOTIFIED_OF = {};

const ERR_MESSAGES = {
  ERR_DUPLICATE_ACCOUNT: "You've already imported that account"
};
