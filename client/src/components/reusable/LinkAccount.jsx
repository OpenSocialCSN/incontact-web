import React from "react";

import socialIcons from "../../assets/images/social";

export default function LinkAccount() {
  return (
    <div className="LinkAccount">
      <img
        src={socialIcons.google}
        onClick={CLICK_HANDLERS.google}
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
      <br />
      {/* <br /> TODO: user signup/user management */}
      {/* <h2>INTEGRATIONS TODO</h2>
      {Object.keys(socialIcons).map((service, i) => (
        <img key={i} src={socialIcons[service]} alt="" />
      ))} */}
    </div>
  );
}

const CLICK_HANDLERS = {
  google: () => window.open(`${BASE_URI}integrations/google/authUrl`, "_self")
};

const BASE_URI = window.location.href.includes("localhost")
  ? "http://localhost:5000/"
  : "https://incontactme.herokuapp.com/";
