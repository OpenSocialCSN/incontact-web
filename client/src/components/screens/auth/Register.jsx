import React from "react";

import "./styles/Login.scss";
import openSocial from "../../../assets/images/opensocial.png";
import { useFormInput } from "../../../helpers/customHooks";
import { createUser } from "../../../helpers/graphql";

export default function Register({ setUserId }) {
  const email = useFormInput("");
  const password = useFormInput("");

  const submit = async () => {
    const { createUser: user } = await createUser(email.value);
    setUserId(user._id);
  };

  return (
    <div className="Login">
      <div className="Login-card card">
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
          <img class="" src={openSocial} width="182" height="40" />
        </a>
      </div>
    </div>
  );
}
