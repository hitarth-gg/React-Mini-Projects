import { useState } from "react";
import "./styles.css";

export default function TextExpander({
  children,
  collapsedNumWords = 10,
  expandButtonText = "Show more",
  expanded=false,
  collapseButtonText = "Collapse text",
  buttonColor = "#0066ff",
  className = "",
}) {

    const [isExpanded, setIsExpanded] = useState(expanded);
    const displayText = isExpanded ? children : `${children.split(' ').slice(0, collapsedNumWords).join(' ')}...`;

    const buttonStyle = {
        background: "none",
        border: "none",
        font: "inherit",
        cursor: "pointer",
        marginLeft: "6px",
        color: buttonColor
      };


  return <div className={className}>
    <span>{displayText}</span>
    <button style={buttonStyle} onClick={() => setIsExpanded((isExpanded) => !isExpanded)}>{isExpanded ? collapseButtonText : expandButtonText}</button>
    </div>;
}
