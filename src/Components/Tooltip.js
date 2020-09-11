import React from 'react';
import './styles/Tooltip.css';

function Tooltip(props) {

    const visibility = props.showTooltip ? "tooltip-visible" : "tooltip-hidden";

    return (
        <div className="tooltip" onClick={props.hideTooltip}>
            <span className={`tooltip-text ${visibility} ${props.positionClass}`}>{props.children}</span>
        </div>
    )
}

export default Tooltip;
