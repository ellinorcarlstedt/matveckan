import React, {Component} from 'react';
import '../App.css';
import Weekday from './Weekday';
import MealCategory from './MealCategory';
import MealTitle from './MealTitle';
import RecepieDescription from './RecepieDescription';

class MealDisplayer extends Component {

    toggleRecepie() {
        let anyRecepieIsOpen = this.props.isARecepieOpen;
        let openRecepie = this.props.indexOfOpenRecepie;
        let thisRecepie = this.props.meal.index;

        if  (anyRecepieIsOpen === false) {
            this.props.openRecepie();
        } else if  (anyRecepieIsOpen === true && openRecepie === thisRecepie) {
            this.props.closeRecepie();
        } else {
            this.props.openRecepie();
        }
    }

    render () {
        let thisRecepieIsOpen = false;
        if (this.props.indexOfOpenRecepie === this.props.meal.index) {
            thisRecepieIsOpen = true;
        }

        return (
            <div className="meal-displayer" onClick={() => this.toggleRecepie()}>
                <div className="meal-displayer-overview">
                    <Weekday weekday={this.props.weekday}/>
                    <MealTitle  title={this.props.meal.mealName}/>
                    <MealCategory category={this.props.meal.mealCategory}/>
                </div>
                {thisRecepieIsOpen && 
                <div>
                    <RecepieDescription description={this.props.meal.description}/> 
                </div>}
            </div>
        )
    }

}

export default MealDisplayer;