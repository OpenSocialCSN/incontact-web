import React from "react";

import { history } from "../../../helpers/routerHelper";
import emailIcon from "../../../assets/images/email.png";
import socialIcons from "../../../assets/images/social/";
import { addUserAccount } from "../../../helpers/graphql";
import { MdCheck } from "react-icons/md";

export default function Onboarding({ user = {} }) {
  if (!user) return <span />;
  const { accounts, _id: userId } = user;
  const accountCounts = getAccountCounts(accounts);
  return (
    <div className="Onboarding Onboard-screen">
      <div className="Onboard-card card">
        <h2>Sync Accounts</h2>

        <div className="OnboardSyncItems">
          <OnboardSyncItem
            icon={socialIcons.google}
            title="Google"
            count={accountCounts.google}
            onClick={() => CLICK_HANDLERS.google(userId)}
          />
          <OnboardSyncItem
            icon={socialIcons.facebook}
            title="Facebook"
            count={accountCounts.facebook}
            onClick={() => alert("TODO")}
          />
          <OnboardSyncItem
            icon={emailIcon}
            title="Other Email"
            count={accountCounts.email}
            onClick={() => alert("TODO")}
          />
        </div>
        <button onClick={() => history.push("/Contacts")}> Done!</button>
      </div>
    </div>
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
    const { addUserAccount: account } = await addUserAccount({
      userId,
      serviceName: "google"
    });

    window.open(
      `${BASE_URI}integrations/google/authUrl?userId=${userId}&userAccountId=${
        account._id
      }&forwardingRoute=Onboarding`,
      "_self"
    );
  }
};

const BASE_URI = window.location.href.includes("localhost")
  ? "http://localhost:5000/"
  : "https://incontactme.herokuapp.com/";

const getAccountCounts = accounts => {
  const counts = {};
  accounts.forEach(({ serviceName }) => {
    counts[serviceName] = counts[serviceName] ? ++counts[serviceName] : 1;
  });
  return counts;
};
