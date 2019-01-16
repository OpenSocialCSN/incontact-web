import React, { useRef } from "react";

import "./styles/Modal.scss";
import { useOnClickOutside } from "../../helpers/customHooks";

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
