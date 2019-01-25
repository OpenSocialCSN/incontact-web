import React from "react";

import socialIcons from "../../assets/images/social";

export default function LinkAccount({ userId }) {
  return (
    <div className="LinkAccount">
      <img
        src={socialIcons.google}
        onClick={() => CLICK_HANDLERS.google(userId)}
        alt="Google icon"
      />
      <ul>
        <li>Clicking will direct you to a google login.</li>
        <li>
          {" "}
          it may say unsafe until we go through a site verification process
        </li>
        <li>click advanced > click go to incontact.herokuapp</li>
        <li>
          {" "}
          After authorizing the app, you'll see a list of retrieved contacts
          from your account.{" "}
        </li>
      </ul>
    </div>
  );
}

const CLICK_HANDLERS = {
  google: (userId, userAccountId) =>
    window.open(
      `${BASE_URI}integrations/google/authUrl?userId=${userId}?userAccountId=${userAccountId}`,
      "_self"
    )
};

const BASE_URI = window.location.href.includes("localhost")
  ? "http://localhost:5000/"
  : "https://incontactme.herokuapp.com/";
