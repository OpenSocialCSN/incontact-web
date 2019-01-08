import React, { useState } from "react";

import ContactsScreen from "./components/screens/contacts/ContactsScreen";
import SideMenu from "./SideMenu";
import EditContactModal from "./components/screens/modals/EditContactModal";
import LinkAccountModal from "./components/screens/modals/LinkAccountModal";

import getFakeContacts from "./helpers/fakeContacts";

const FAKE_CONTACTS = getFakeContacts();

export default function App() {
  const [route, navigate] = useState("Contacts");
  const [modal, setModal] = useState({ screen: null, context: null });
  const closeModal = function() {
    setModal({ screen: null, context: null });
  };

  return (
    <div className="App">
      <SideMenu navigate={navigate} route={route} />
      <div className="App-content">
        {route === "Contacts" && (
          <ContactsScreen contacts={FAKE_CONTACTS} setModal={setModal} />
        )}
        {route === "Notifications" && <h1>NOTIFICATIONS SCREEN</h1>}
        {route === "History" && <ServerCall />}
      </div>
      {modal.screen && <AppModal modal={modal} closeModal={closeModal} />}
    </div>
  );
}

const AppModal = function({ modal, closeModal }) {
  switch (modal.screen) {
    case "EditContact":
      return <EditContactModal onClose={closeModal} context={modal.context} />;
    case "LinkAccount":
      return <LinkAccountModal onClose={closeModal} context={modal.context} />;
  }
};

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
