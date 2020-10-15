import React from 'react';

function RecipeIngredients(props) {

    const firstLetterUppercase = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const allLettersLowercase = (string) => {
        return string.toLowerCase();
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
                let ingredientName = allLettersLowercase(ingredient.name);
            return (
                <li key={i}>
                    <p>{`${ingredient.amount} ${ingredient.unit} ${ingredientName}`}</p>
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
