import React, { useState } from 'react';
import '../App.css';
import '../icons/down-arrow.png';

function MealDisplayerArrowIcon(props) {

    const [opened, setOpened] = useState(false);

    const getRotationClassName = (isOpen) => {
        if (!isOpen && !opened) {
            return "";
        } else if (isOpen && !opened) {
            setOpened(true);
            return "";
        } else if (isOpen && opened) {
            return "rotate-180-open";
        } else if (!isOpen && opened) {
            setTimeout(() => {
                setOpened(false);
            }, 200);                            // According to speed of animation in css-file
            return "rotate-180-close ";
         } 
    }

    let downArrow = require("../icons/down-arrow.png");
    let rotationClassName = getRotationClassName(props.isOpen); 

    return (
        <div className={`meal-displayer-arrow-icon ${rotationClassName}`}>
            <img src={downArrow} alt="Pil nedåt"/>
        </div>
    )
}

export default React.memo(MealDisplayerArrowIcon)
