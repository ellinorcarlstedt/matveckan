import React from 'react';

function MealCategory (props) {
    let imgSrc = "";
    let imgAlt = "";
    switch(props.category) {
        case 1: imgSrc=require("../../shared/resources/icons/cow.svg"); imgAlt="Nöt"; break;
        case 2: imgSrc=require("../../shared/resources/icons/chicken.svg"); imgAlt="Fågel"; break;
        case 3: imgSrc=require("../../shared/resources/icons/fish.svg"); imgAlt="Fisk"; break;
        case 4: imgSrc=require("../../shared/resources/icons/carrot.svg"); imgAlt="Vegetariskt"; break;
        case 5: imgSrc=require("../../shared/resources/icons/pig.svg"); imgAlt="Fläsk"; break;
        default: 
    }

    return (
        <div className="meal-category">
            <img src={imgSrc} alt={imgAlt} />
        </div>
    )
}

export default MealCategory;