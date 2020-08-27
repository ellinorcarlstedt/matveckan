import React, { useState } from 'react';
import '../App.css';
import '../icons/down-arrow.png';

function MealDisplayerArrowIcon(props) {

    const [opened, setOpened] = useState(false);

    const logFirstOpening = () => {
        setOpened(true);
    }

    const getClassName = (isOpen) => {
        if (!isOpen && !opened) {
            return "";
        } else if (isOpen && !opened) {
            logFirstOpening();
            return "";
        } else if (isOpen && opened) {
            return "rotate-180-open";
        } else if (!isOpen && opened) {
            return "rotate-180-close";
        }
    }

    let downArrow = require("../icons/down-arrow.png");
    let rotationClass = getClassName(props.isOpen); 

    return (
        <div className={`meal-displayer-arrow-icon ${rotationClass}`}>
            <img src={downArrow} alt="Pil nedåt"/>
        </div>
    )
}

export default React.memo(MealDisplayerArrowIcon)
