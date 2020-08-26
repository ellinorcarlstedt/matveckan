import React  from 'react';
import '../App.css';
import Weekday from './Weekday';
import MealCategory from './MealCategory';
import MealTitle from './MealTitle';
import RecepieDescription from './RecepieDescription';

function MealDisplayer(props) {

    let isOpen = props.indexOfOpenRecepie === props.meal.index ? true : false;

    const toggleRecepie = () => {
        isOpen && props.isARecepieOpen ? props.closeRecepie() : props.openRecepie();
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
                                        id={props.meal.index}
                                        isOpen={isOpen} 
                                        /> 
                </div>
            </div>
        )
}

export default MealDisplayer;