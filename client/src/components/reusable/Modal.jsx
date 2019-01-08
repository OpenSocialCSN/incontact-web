import React, { useEffect, useRef } from "react";

import "./styles/Modal.scss";

export default function Modal({ children, onClose }) {
  const ref = useRef();
  useOnClickOutside(ref, onClose);

  return (
    <span className="Modal-onClickOutside">
      <span ref={ref} className="Modal-content">
        {children}
      </span>
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
