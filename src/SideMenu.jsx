import React from "react";

export default function SideMenu({ navigate }) {
  //   console.log("useState:", useState);

  // const [num, setNum] = useState(1);

  return (
    <div className="SideMenu">
      <SideMenuItem name="Contacts" onClick={() => navigate("Contacts")} />
      <SideMenuItem
        name="Notifications"
        onClick={() => navigate("Notifications")}
      />
      <SideMenuItem name="History" onClick={() => navigate("History")} />
    </div>
  );
}

const SideMenuItem = ({ name, icon, onClick }) => (
  <div className="SideMenuItem" onClick={onClick}>
    icon here {name}
  </div>
);
