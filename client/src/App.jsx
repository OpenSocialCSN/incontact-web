import React, { useState } from "react";

import ContactsScreen from "./components/screens/contacts/ContactsScreen";
import SideMenu from "./SideMenu";
import EditContactModal from "./components/screens/modals/EditContactModal";

import getFakeContacts from "./helpers/fakeContacts";

const FAKE_CONTACTS = getFakeContacts();

export default function App() {
  const [route, navigate] = useState("Contacts");
  const [modal, setModal] = useState("EditContact");
  const closeModal = function() {
    setModal(null);
  };

  return (
    <div className="App">
      <SideMenu navigate={navigate} route={route} />
      <div className="App-content">
        {route === "Contacts" && (
          <ContactsScreen setModal={setModal} contacts={FAKE_CONTACTS} />
        )}
        {route === "Notifications" && <h1>NOTIFICATIONS SCREEN</h1>}
        {route === "History" && <ServerCall />}
      </div>
      {modal === "EditContact" && <EditContactModal onClose={closeModal} />}
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
