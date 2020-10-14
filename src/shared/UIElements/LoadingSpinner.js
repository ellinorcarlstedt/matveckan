import React from 'react';

const LoadingSpinner = (props) => {
    return (
        <div className={props.asOverlay && `loading-spinner__overlay`}>
            <div className="loading-spinner"></div>
        </div>
    )
}

export default LoadingSpinner;
