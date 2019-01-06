import React from "react";
import "./styles/Avatar.scss";

export default function Avatar({ user, isLetter, backgroundColor, color }) {
  return (
    <div className="Avatar">
      {isLetter || !user.iconUrl ? (
        <LetterAvatar
          user={user}
          color={color}
          backgroundColor={backgroundColor}
        />
      ) : (
        <IconAvatar src={user.iconUrl} />
      )}
    </div>
  );
}

const IconAvatar = ({ src }) => <div />;

const LetterAvatar = ({ user, backgroundColor, color }) => {
  const { displayName } = user;
  const letter = displayName ? displayName.charAt(0).toUpperCase() : "?";

  return (
    <div
      style={{
        backgroundColor,
        color,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {letter}
    </div>
  );
};
