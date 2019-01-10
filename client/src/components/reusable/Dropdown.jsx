import React, { useEffect, useRef, useState } from "react";
import "./styles/Dropdown.scss";

export default function DropdownButton({ children, dropdownItems = [] }) {
  let lastRender = new Date().getTime();
  const [showDropdown, setDropdown] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setDropdown(false));

  return (
    <span
      className="Dropdown noHighlight"
      onClick={() =>
        new Date().getTime() - lastRender > 200 && setDropdown(true)
      }
    >
      {children}
      {showDropdown && (
        <span className="Dropdown-content">
          <span ref={ref}>
            {dropdownItems.map((item, i) => (
              <div
                className="Dropdown-option"
                onClick={e => {
                  e.stopPropagation();
                  setDropdown(false);
                  item.onClick();
                }}
                key={i}
              >
                {item.body}
              </div>
            ))}
          </span>
        </span>
      )}
    </span>
  );
}

export function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
}
