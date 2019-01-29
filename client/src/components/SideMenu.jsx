import React from "react";
import {
  MdHistory,
  MdNotifications,
  MdSupervisorAccount
} from "react-icons/md";
import { Link, withRouter } from "react-router-dom";

import logo from "../assets/images/logo-white.png";
import { Avatar, Dropdown } from "./reusable";
import { history } from "../helpers/routerHelper";

function SideMenu({ setUserId, location }) {
  const { pathname } = location;
  return (
    <div className="SideMenu">
      <Link to={`/${ROUTES[0].name}`} className="SideMenu-routerLink">
        <h1>inContact</h1>
      </Link>
      {ROUTES.map(r => (
        <SideMenuItem
          key={r.name}
          name={r.name}
          isActive={
            `/${r.name}` === pathname ||
            (pathname === "/" && r.name === "Contacts")
          }
          route={r.name}
          Icon={r.icon}
        />
      ))}
      <Link to={`/${ROUTES[0].name}`}>
        <img
          src={logo}
          alt="incontact logo"
          className="SideMenu-logo"
          route={ROUTES[0].name}
        />
      </Link>
      <span className="SideMenu-avatar">
        <Dropdown
          position="top"
          dropdownItems={[
            {
              body: "Logout",
              onClick: () => {
                setUserId(null);
                history.push("/Register");
              }
            }
          ]}
        >
          <Avatar
            user={{ displayName: "Joe" }}
            color="#2f80ed"
            backgroundColor="white"
          />
        </Dropdown>
      </span>
    </div>
  );
}

export default withRouter(SideMenu);

const SideMenuItem = ({ name, Icon, isActive, route }) => (
  <Link to={`/${route}`} className="SideMenu-routerLink">
    <div className={`SideMenuItem${isActive ? " active" : ""}`}>
      <Icon /> <span className="SideMenuItem-title">{name}</span>
    </div>
  </Link>
);

const ROUTES = [
  { name: "Contacts", icon: MdSupervisorAccount },
  { name: "Notifications", icon: MdNotifications },
  { name: "History", icon: MdHistory }
];
