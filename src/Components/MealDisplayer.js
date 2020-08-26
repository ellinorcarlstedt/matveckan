import React  from 'react';
import '../App.css';
import Weekday from './Weekday';
import MealCategory from './MealCategory';
import MealTitle from './MealTitle';
import RecepieDescription from './RecepieDescription';
import TransitionComponent from './TransitionComponent';

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
                    <TransitionComponent isOpen={isOpen} id={props.meal.index} className="border-radius">
                        <RecepieDescription description={props.meal.description}/> 
                    </TransitionComponent>
                </div>
            </div>
        )
}

export default MealDisplayer;