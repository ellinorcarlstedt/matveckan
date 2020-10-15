import React from 'react';
import Button from '../UIElements/Button';

const OverlayInfo = (props) => {
    return (
        <div className="overlay-info">
            <Button large to="/auth" buttonClass="overlay-info__button">{props.children}</Button>
        </div>
    )
}

export default OverlayInfo;
