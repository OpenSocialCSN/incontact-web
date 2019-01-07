import React from "react";

import "./styles/Avatar.scss";
import Circle from "./Circle";

export default function Avatar({
  user,
  isLetter,
  backgroundColor = "#2f80ed",
  color = "white",
  size = 42
}) {
  return (
    <Circle size={size} color={backgroundColor} className="Avatar">
      {isLetter || !user.iconUrl ? (
        <LetterAvatar
          user={user}
          color={color}
          backgroundColor={backgroundColor}
          size={size}
        />
      ) : (
        <IconAvatar src={user.iconUrl} />
      )}
    </Circle>
  );
}

const IconAvatar = ({ src }) => <div />;

const LetterAvatar = ({ user, color = "white", size }) => {
  const { displayName } = user;
  const letter = displayName ? displayName.charAt(0).toUpperCase() : "?";

  return (
    <div className="LetterAvatar">
      <span style={{ color, fontSize: size / 1.3125 }}>{letter}</span>
    </div>
  );
};
