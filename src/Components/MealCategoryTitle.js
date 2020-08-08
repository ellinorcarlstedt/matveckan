import React from 'react';
import '../App.css';

function MealCategoryTitle (props) {
    return (
        <div className="meal-category-title">
            {props.title}
        </div>
    )
}

export default MealCategoryTitle;