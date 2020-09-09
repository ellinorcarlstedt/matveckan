import React from 'react';
import RecipeIngredients from './RecipeIngredients';
import RecipeDescription from './RecipeDescription';
import '../App.css';

function Recipe (props) {

    return (
        <div className="recipe">
            <RecipeIngredients ingredients={props.ingredients} />
            <RecipeDescription description={props.description} />
        </div>
    )
}

export default React.memo(Recipe);


