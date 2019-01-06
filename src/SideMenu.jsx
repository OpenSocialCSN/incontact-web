import React from "react";

export default function SideMenu() {
  //   console.log("useState:", useState);

  // const [num, setNum] = useState(1);

  return (
    <div className="SideMenu">
      <SideMenuItem name="Link" />
      <SideMenuItem name="Link" />
      <SideMenuItem name="Link" />
    </div>
  );
}

const SideMenuItem = ({ name, icon, route }) => <li>{name}</li>;
