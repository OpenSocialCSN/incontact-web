import React from "react";

export default function Circle({ children, className, color, size = 42 }) {
  return (
    <span
      className={className}
      style={{
        backgroundColor: color,
        borderRadius: "50%",
        width: size,
        height: size
      }}
    >
      {children}
    </span>
  );
}
