import React  from 'react';
import '../App.css';
import Weekday from './Weekday';
import MealCategory from './MealCategory';
import MealTitle from './MealTitle';
import RecepieDescription from './RecepieDescription';

function MealDisplayer(props) {

    let isARecepieOpen = props.isARecepieOpen;
    let openRecepie = props.indexOfOpenRecepie;
    let thisRecepie = props.meal.index;   
    let lastOpenRecepie = props.lastOpenRecepie;

    const toggleRecepie = () => {
        if  (!isARecepieOpen) {
            props.openRecepie();
        } else if (isARecepieOpen && openRecepie === thisRecepie) {
            props.closeRecepie();
        } else {
            props.openRecepie();
        }
    }

    let animationStatus = null;

    if (openRecepie === thisRecepie) {
        animationStatus = "open";
    } else if (lastOpenRecepie === thisRecepie || !isARecepieOpen) {
        animationStatus = "close";
    }   

        return (
            <div className="meal-displayer" onClick={() => toggleRecepie()}>
                <div className="meal-displayer-overview">
                    <Weekday weekday={props.weekday}/>
                    <MealTitle  title={props.meal.mealName}/>
                    <MealCategory category={props.meal.mealCategory}/>
                </div>
                <div>
                    <RecepieDescription description={props.meal.description}
                                        id={thisRecepie}
                                        animationStatus={animationStatus} 
                                        /> 
                </div>
            </div>
        )
}

export default MealDisplayer;