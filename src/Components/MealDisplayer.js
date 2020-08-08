import React, {Component} from 'react';
import '../App.css';
import MealCategoryTitle from './MealCategoryTitle';
import MealTitle from './MealTitle';
import RecepieDescription from './RecepieDescription';

class MealDisplayer extends Component {

    toggleRecepie() {
        let anyRecepieIsOpen = this.props.isARecepieOpen;
        let openRecepie = this.props.indexOfOpenRecepie;
        let thisRecepie = this.props.meal.index;

        if  (anyRecepieIsOpen === false) {
            this.props.openRecepie();
        } 
        if  (anyRecepieIsOpen === true && openRecepie === thisRecepie) {
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
            <div className="day-menu-displayer" onClick={() => this.toggleRecepie()}>
                <MealCategoryTitle title={this.props.meal.mealCategory}/>
                <MealTitle  title={this.props.meal.mealName}/>
                {thisRecepieIsOpen && <RecepieDescription description={this.props.meal.description}/>}
            </div>
        )
    }

}

export default MealDisplayer;