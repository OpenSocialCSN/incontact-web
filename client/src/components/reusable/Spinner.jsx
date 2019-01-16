import React from "react";

import "./styles/Spinner.scss";

export default function Spinner({ size = "medium", color = "primary" }) {
  return <div className={`Spinner ${size} ${color}`} />;
}
