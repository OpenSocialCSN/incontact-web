import React from "react";
import logo from "./assets/images/logo-white.png";

import { Avatar } from "./components/reusable";

export default function SideMenu({ navigate, route }) {
  return (
    <div className="SideMenu">
      <h1
        onClick={() => {
          navigate(ROUTES[0]);
        }}
      >
        incontact
      </h1>
      {ROUTES.map(r => (
        <SideMenuItem
          key={r}
          name={r}
          isFocused={r === route}
          onClick={() => navigate(r)}
        />
      ))}

      <img
        src={logo}
        alt="incontact logo"
        className="SideMenu-logo"
        onClick={() => {
          navigate(ROUTES[0]);
        }}
      />
      <Avatar
        user={{ displayName: "Joe" }}
        color="#2f80ed"
        backgroundColor="white"
      />
    </div>
  );
}

const SideMenuItem = ({ name, icon, isFocused, onClick }) => (
  <div
    className={`SideMenuItem${isFocused ? " focused" : ""}`}
    onClick={onClick}
  >
    icon here {name}
  </div>
);

const ROUTES = ["Contacts", "Notifications", "History"];
