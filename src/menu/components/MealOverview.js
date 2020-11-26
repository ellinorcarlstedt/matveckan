import React from 'react';
import Weekday from './Weekday';
import MealCategory from './MealCategory';
import MealTitle from './MealTitle';
import Button from '../../shared/UIElements/Button';

const MealOverview = (props) => {

    if (props.source === "menu-displayer") {
        return (
            <div className="meal-overview--menu-displayer" onClick={props.toggleRecipe}>
                <Weekday weekday={props.weekday}/>
                <MealTitle title={props.title}/>
                <MealCategory category={props.category}/>
            </div>
        )
    } else if (props.source === "recipes-list") {
        return (
            <div className="meal-overview--recipes-list">
                <Button buttonClass="meal-overview--recipes-list__button" small onClick={props.deleteRecipe}>Radera</Button>
                <div className="meal-overview--recipes-list__inner" onClick={props.toggleRecipe}>
                    <MealTitle title={props.title}/>
                    <MealCategory category={props.category}/>
                </div>
            </div>
        )
    }
}

export default MealOverview;
