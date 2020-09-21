import React from 'react';

function Tooltip(props) {

    return (
        <div className="tooltip" onClick={props.hideTooltip}>
            <span className={`tooltip-text ${props.positionClass}`}>{props.children}</span>
        </div>
    )
}

export default Tooltip;
