import React, { useState } from "react";

import ContactsScreen from "./components/screens/contacts/ContactsScreen";
import SideMenu from "./SideMenu";

const getRan = arr => arr[Math.floor(Math.random() * arr.length)];
const FIRST_NAMES = ["Joe", "Anne", "Eric", "Tina"];
const LAST_NAMES = ["Adams", "Johnson", "Nance", "Smith"];
const SOCIAL = [
  "linkedin",
  "twitter",
  "facebook",
  "instagram",
  "skype"
  // "google",
  // "youtube",
];
const CONTACT = ["homeEmail", "workEmail", "workPhone", "homePhone"];
const FAKE_CONTACTS = [];

for (let i = 0; i < 15; i++) {
  const firstName = getRan(FIRST_NAMES);
  const lastName = getRan(LAST_NAMES);

  FAKE_CONTACTS.push({
    displayName: firstName + " " + lastName,
    firstName,
    lastName,
    id: i,
    [getRan(CONTACT)]: "fake",
    [getRan(CONTACT)]: "fake",
    social: {
      [getRan(SOCIAL)]: "fake",
      [getRan(SOCIAL)]: "fake",
      [getRan(SOCIAL)]: "fake"
    }
  });
}

export default function App() {
  const [route, navigate] = useState("Contacts");

  return (
    <div className="App">
      <SideMenu navigate={navigate} route={route} />
      <div className="App-content">
        {route === "Contacts" && <ContactsScreen contacts={FAKE_CONTACTS} />}
        {route === "Notifications" && <h1>NOTIFICATIONS SCREEN</h1>}
        {route === "History" && <ServerCall />}
      </div>
    </div>
  );
}

class ServerCall extends React.Component {
  state = {
    response: "",
    post: "",
    responseToPost: ""
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/api/hello");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch("/api/world", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify({ post: this.state.post })
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
  };

  render() {
    return (
      <div className="ServerCall">
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>
      </div>
    );
  }
}
