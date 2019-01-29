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
  backgroundColor = user.imageUrl ? "rgba(0,0,0,0)" : backgroundColor;

  return (
    <Circle size={size} color={backgroundColor} className="Avatar">
      {isLetter || !user.imageUrl ? (
        <LetterAvatar
          user={user}
          color={color}
          backgroundColor={backgroundColor}
          size={size}
        />
      ) : (
        <IconAvatar src={user.imageUrl} />
      )}
    </Circle>
  );
}

const IconAvatar = ({ src }) => <img src={src} alt="user icon" />;

const LetterAvatar = ({ user, color = "white", size }) => {
  const { displayName } = user;
  const letter = displayName ? displayName.charAt(0).toUpperCase() : "?";

  return (
    <div className="LetterAvatar">
      <span style={{ color, fontSize: size / 1.3125 }}>{letter}</span>
    </div>
  );
};
