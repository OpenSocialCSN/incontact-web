import React from "react";
import {
  MdHistory,
  MdNotifications,
  MdSupervisorAccount
} from "react-icons/md";

import logo from "./assets/images/logo-white.png";
import { Avatar } from "./components/reusable";

export default function SideMenu({ navigate, route }) {
  return (
    <div className="SideMenu">
      <h1
        onClick={() => {
          navigate(ROUTES[0].name);
        }}
      >
        incontact
      </h1>
      {ROUTES.map(r => (
        <SideMenuItem
          key={r.name}
          name={r.name}
          isActive={r.name === route}
          onClick={() => navigate(r.name)}
          Icon={r.icon}
        />
      ))}
      <img
        src={logo}
        alt="incontact logo"
        className="SideMenu-logo"
        onClick={() => {
          navigate(ROUTES[0].name);
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

const SideMenuItem = ({ name, Icon, isActive, onClick }) => (
  <div className={`SideMenuItem${isActive ? " active" : ""}`} onClick={onClick}>
    <Icon /> <span className="SideMenuItem-title">{name}</span>
  </div>
);

const ROUTES = [
  { name: "Contacts", icon: MdSupervisorAccount },
  { name: "Notifications", icon: MdNotifications },
  { name: "History", icon: MdHistory }
];
