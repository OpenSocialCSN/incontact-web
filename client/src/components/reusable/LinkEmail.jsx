import React, { useState } from "react";

import { useFormInput } from "../../helpers/customHooks";
import { validateEmail } from "../../helpers/stringHelper";

export default function LinkEmail({ onBack }) {
  const email = useFormInput("");
  const password = useFormInput("");
  const [subScreen, setSubScreen] = useState("credentials");

  const imapServer = useFormInput("");
  const imapUsername = useFormInput("");
  const smtpServer = useFormInput("");

  return (
    <span className="LinkEmail">
      {subScreen === "credentials" && (
        <React.Fragment>
          <h4>Add Other Email</h4>
          <input type="text" placeholder="Email" {...email} />
          <input type="password" placeholder="Password" {...password} />
          <div className="LinkEmail-btnRow">
            <button onClick={onBack} className="btn-secondary">
              Back
            </button>
            <button
              onClick={() => {
                if (!email.value || !password.value)
                  return alert("You must provide an email and password");

                validateEmail(email.value)
                  ? setSubScreen("imap")
                  : alert("You must enter a valid email");
              }}
            >
              Connect
            </button>
          </div>
        </React.Fragment>
      )}
      {subScreen === "imap" && (
        <React.Fragment>
          <h4>Incoming Mail (IMAP)</h4>
          <input
            type="text"
            placeholder="Server (eg: imap.example.com)"
            {...imapServer}
          />
          <input
            type="text"
            placeholder="Username (if differs from email)"
            {...imapUsername}
          />
          <h4>Outgoing Mail (SMTP)</h4>
          <input
            type="text"
            placeholder="Server (eg: smtp.example.com:587)"
            {...smtpServer}
          />
          <div className="LinkEmail-btnRow">
            <button
              onClick={() => setSubScreen("credentials")}
              className="btn-secondary"
            >
              Back
            </button>
            <button onClick={() => alert("TODO")}>Connect</button>
          </div>
        </React.Fragment>
      )}
    </span>
  );
}
