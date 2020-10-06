import React from 'react';

function MealTitle (props) {

        return (
            <div className="meal-title" data-testid="test-div-meal-title">
                {props.title}
            </div>
        )
    }

export default MealTitle;