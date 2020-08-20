import React from 'react';
import '../App.css';
import Weekday from './Weekday';
import MealCategory from './MealCategory';
import MealTitle from './MealTitle';
import RecepieDescription from './RecepieDescription';

function MealDisplayer(props) {

    let anyRecepieIsOpen = props.isARecepieOpen;
    let openRecepie = props.indexOfOpenRecepie;
    let thisRecepie = props.meal.index;

    const toggleRecepie = () => {
        if  (!anyRecepieIsOpen) {
            props.openRecepie();
        } else if  (anyRecepieIsOpen && openRecepie === thisRecepie) {
            props.closeRecepie();
        } else {
            props.openRecepie();
        }
    }
        let thisRecepieIsOpen = false;
        if (openRecepie === thisRecepie) {
            thisRecepieIsOpen = true;
        }

        return (
            <div className="meal-displayer" onClick={() => toggleRecepie()}>
                <div className="meal-displayer-overview">
                    <Weekday weekday={props.weekday}/>
                    <MealTitle  title={props.meal.mealName}/>
                    <MealCategory category={props.meal.mealCategory}/>
                </div>
                {thisRecepieIsOpen && 
                <div>
                    <RecepieDescription description={props.meal.description} title={props.meal.mealName}/> 
                </div>}
            </div>
        )
}

export default MealDisplayer;