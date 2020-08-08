import React, {Component} from 'react';
import '../App.css';

class MealTitle extends Component {
    render() {
        return (
            <div className="meal-title">
                {this.props.title}
            </div>
        )
    }

}

export default MealTitle;