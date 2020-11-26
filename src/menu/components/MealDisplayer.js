import React  from 'react';
import MealOverview from './MealOverview';
import Recipe from './Recipe';
import HeightTransitionComponent from '../../shared/UIElements/HeightTransitionComponent';

function MealDisplayer(props) {

    let isOpen = props.indexOfOpenRecipe === props.meal.id ? true : false;

    const toggleRecipe = () => {
        isOpen ? props.closeRecipe() : props.openRecipe();
    }
    
        return (
            <div className="meal-displayer">
                <MealOverview 
                    source={props.source}
                    toggleRecipe={toggleRecipe}
                    title={props.meal.mealName}
                    category={props.meal.mealCategory}
                    weekday={props.weekday}
                    deleteRecipe={props.deleteRecipe}
                    />
                <div onClick={toggleRecipe}>
                    <HeightTransitionComponent isOpen={isOpen} id={props.meal.id} className="border-radius">
                        <Recipe description={props.meal.description} ingredients={props.meal.ingredients}/> 
                    </HeightTransitionComponent>
                </div>
            </div>
        )
}

export default MealDisplayer;
