import React from 'react';

function Tooltip(props) {

    let show = props.show ? "" : "tooltip__hidden";

    return (
        <div className={`tooltip ${show}`} onClick={props.hideTooltip}>
            <span className={`tooltip-text__${props.position} ${props.tooltipClass}`}>{props.children}</span>
        </div>
    )
}

export default Tooltip;
