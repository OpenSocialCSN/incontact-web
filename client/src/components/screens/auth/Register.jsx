import React from "react";

import "./styles/Onboard.scss";
import openSocial from "../../../assets/images/opensocial.png";
import { useFormInput, useOnDidMount } from "../../../helpers/customHooks";
import { createUser } from "../../../helpers/graphql";
import { history } from "../../../helpers/routerHelper";

export default function Register({ setUserId, userId }) {
  const email = useFormInput("");
  const password = useFormInput("");

  const submit = async () => {
    const { createUser: user } = await createUser(email.value);
    setUserId(user._id);
    history.push("/Onboarding");
  };

  useOnDidMount(() => {
    if (userId) history.push("/Contacts");
  });

  return (
    <div className="Register Onboard-screen">
      <div className="Onboard-card card">
        <h1>inContact</h1>
        <small>temporary mock login</small>
        <input type="text" placeholder="Email" {...email} />
        <br />
        <input type="password" placeholder="Password" {...password} />
        <br />
        <button style={{ width: "100%" }} onClick={submit}>
          Register
        </button>
        <b>Single Single Sign-on Service provided by:</b>
        <a href="https://www.opensocial.me/">
          <img
            src={openSocial}
            width="182"
            height="40"
            alt="open social logo"
          />
        </a>
      </div>
    </div>
  );
}
