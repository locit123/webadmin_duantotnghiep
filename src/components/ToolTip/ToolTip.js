import React from "react";
import "./ToolTip.scss";
import { useSelector } from "react-redux";
import { getThemeState } from "../../store/selector";
const Tooltip = ({ text, children }) => {
  const theme = useSelector(getThemeState);
  return (
    <div className={`tooltip-container ${theme ? "theme" : ""}`}>
      {children}
      <div className="tooltip-text">{text}</div>
    </div>
  );
};

export default React.memo(Tooltip);
