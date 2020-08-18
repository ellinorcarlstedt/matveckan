import React from 'react';
import '../App.css';
import '../icons/carrot.png';

function MealCategory (props) {
    let imgSrc = "";
    let imgAlt = "";
    switch(props.category) {
        case 1: imgSrc=require("../icons/cow.png"); imgAlt="Kött"; break;
        case 2: imgSrc=require("../icons/chicken.png"); imgAlt="Fågel"; break;
        case 3: imgSrc=require("../icons/fish.png"); imgAlt="Fisk"; break;
        case 4: imgSrc=require("../icons/carrot.png"); imgAlt="Vegetariskt"; break;
        default: 
    }

    return (
        <div className="meal-category">
            <img src={imgSrc} alt={imgAlt} />
        </div>
    )
}

export default MealCategory;