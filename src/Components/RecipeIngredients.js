import React from 'react';

function RecipeIngredients(props) {

    const firstLetterUppercase = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    let ingredients = [];
    if (props.ingredients.length) {
        ingredients = props.ingredients.map((ingredient, i) => {
            if (ingredient.amount === null) {
                let ingredientName = firstLetterUppercase(ingredient.name);
                return (
                    <li key={i}>
                        <p>{ingredientName}</p>
                    </li>
                )
            } else {
            return (
                <li key={i}>
                    <p>{`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`}</p>
                </li>
                )
            }
        })
    }

    return (
        <ul className="recipe-ingredients">
            {ingredients}
        </ul>
    )
}

export default React.memo(RecipeIngredients);
