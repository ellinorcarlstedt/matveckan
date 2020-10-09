import React from 'react';

const Background = (props) => {
    return (
        <div className={`background ${props.className}`}>
            {props.children}
        </div>
    )
}

export default Background;
