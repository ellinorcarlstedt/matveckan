import React, { useState } from 'react';
import './styles/ArrowIcon.css';

function ArrowIcon(props) {

    const [open, setOpen] = useState(false);

    const getRotationClassName = (isOpen) => {
        if (!isOpen && !open) {
            return "";
        } else if (isOpen && !open) {
            setOpen(true);
            return "";
        } else if (isOpen && open) {
            return "rotate-180-open";
        } else if (!isOpen && open) {
            setTimeout(() => {
                setOpen(false);
            }, 200);                            // According to speed of animation in css-file
            return "rotate-180-close ";
         } 
    }

    let icon = require("../icons/down-arrow.png");
    let rotationClassName = getRotationClassName(props.isOpen); 

    return (
        <div className={`arrow-icon ${rotationClassName}`}>
            <img src={icon} alt="Pil-ikon"/>
        </div>
    )
}

export default React.memo(ArrowIcon);
