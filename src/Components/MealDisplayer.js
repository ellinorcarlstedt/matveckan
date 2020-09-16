import React  from 'react';
import Weekday from './Weekday';
import MealCategory from './MealCategory';
import MealTitle from './MealTitle';
import Recipe from './Recipe';
import HeightTransitionComponent from './HeightTransitionComponent';

function MealDisplayer(props) {

    let isOpen = props.indexOfOpenRecipe === props.meal.index ? true : false;

    const toggleRecipe = () => {
        isOpen ? props.closeRecipe() : props.openRecipe();
    }
    
        return (
            <div className="meal-displayer" onClick={() => toggleRecipe()}>
                <div className="meal-displayer-overview">
                    <Weekday weekday={props.weekday}/>
                    <MealTitle  title={props.meal.mealName}/>
                    <MealCategory category={props.meal.mealCategory}/>
                </div>
                <div>
                    <HeightTransitionComponent isOpen={isOpen} id={props.meal.index} className="border-radius">
                        <Recipe description={props.meal.description} ingredients={props.meal.ingredients}/> 
                    </HeightTransitionComponent>
                </div>
            </div>
        )
}

export default MealDisplayer;