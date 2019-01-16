import React from "react";

import "./styles/Login.scss";
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
      <h1>Temp Register</h1>
      <input type="text" {...email} />
      <br />
      <input type="password" {...password} />
      <br />
      <button onClick={submit}>Register</button>
    </div>
  );
}
