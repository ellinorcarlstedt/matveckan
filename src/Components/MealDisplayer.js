import React  from 'react';
import '../App.css';
import Weekday from './Weekday';
import MealCategory from './MealCategory';
import MealTitle from './MealTitle';
import RecepieDescription from './RecepieDescription';

function MealDisplayer(props) {

    let anyRecepieIsOpen = props.isARecepieOpen;
    let openRecepie = props.indexOfOpenRecepie;
    let thisRecepie = props.meal.index;   
    let lastOpenRecepie = props.lastOpenRecepie;

    const toggleRecepie = () => {
        if  (!anyRecepieIsOpen) {
            props.openRecepie();
        } else if (anyRecepieIsOpen && openRecepie === thisRecepie) {
            props.closeRecepie();
        } else {
            props.openRecepie();
        }
    }

    let recepieDescriptionStatus = "idle";
    if (openRecepie === thisRecepie) {
        recepieDescriptionStatus = "open";
    } else if (anyRecepieIsOpen && !(openRecepie === thisRecepie) && lastOpenRecepie === thisRecepie) {
        recepieDescriptionStatus = "close";
    } else if (!anyRecepieIsOpen && lastOpenRecepie === thisRecepie) {
        recepieDescriptionStatus = "close";
    } else if (!anyRecepieIsOpen) {
        recepieDescriptionStatus = "close";
    }   else {
        recepieDescriptionStatus = "idle";
    }


    /*
        let isOpen = false;
        if (openRecepie === thisRecepie) {
            isOpen = true;
        }
    */

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
                                        recepieDescriptionStatus={recepieDescriptionStatus} 
                                        anyRecepieIsOpen={anyRecepieIsOpen} 
                                        lastOpenRecepie={lastOpenRecepie} 
                                        title={props.meal.mealName} 
                                        /> 
                </div>
            </div>
        )
}

export default MealDisplayer;