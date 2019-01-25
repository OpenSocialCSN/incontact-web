import React from "react";

import "./styles/Login.scss";
import { useFormInput } from "../../../helpers/customHooks";

export default function Login({ setUserId }) {
  const email = useFormInput("");
  const password = useFormInput("");

  return (
    <div className="Onboard-scren">
      <h1>Temp Login</h1>
      <input type="text" {...email} />
      <br />
      <input type="password" {...password} />
      <br />
      <button>Login</button>
    </div>
  );
}
