import React, { useRef, useState } from "react";

import "./styles/Dropdown.scss";
import { useOnClickOutside } from "../../helpers/customHooks";

export default function DropdownButton({
  children,
  dropdownItems = [],
  renderDropdown,
  position = "right"
}) {
  const [showDropdown, setDropdown] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setDropdown(false));

  return (
    <span className="Dropdown" onClick={() => setDropdown(true)} ref={ref}>
      {children}
      {showDropdown && (
        <span
          className={`Dropdown-content ${position}`}
          onClick={e => e.stopPropagation()}
        >
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
