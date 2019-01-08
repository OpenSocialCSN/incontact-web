import React, { useEffect, useRef, useState } from "react";
import "./styles/Dropdown.scss";

export default function DropdownButton({
  children,
  dropdownItems = [],
  renderDropdown
}) {
  const [showDropdown, setDropdown] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setDropdown(false));

  return (
    <span className="Dropdown" onClick={() => setDropdown(true)} ref={ref}>
      {children}
      {showDropdown && (
        <span className="Dropdown-content" onClick={e => e.stopPropagation()}>
          {renderDropdown ? (
            renderDropdown()
          ) : (
            <React.Fragment>
              {dropdownItems.map((item, i) => (
                <div
                  className="Dropdown-option"
                  onClick={() => {
                    item.onClick();
                    setDropdown(false);
                  }}
                  key={i}
                >
                  {item.body}
                </div>
              ))}
            </React.Fragment>
          )}
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
