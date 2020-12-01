import React from 'react';

function RecipeIngredients(props) {

    const firstLetterUppercase = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    let ingredients = [];
    if (props.ingredients.length) {
        ingredients = props.ingredients.map((ingredient, i) => {
            let details = ingredient.details ? `, ${ingredient.details.toLowerCase()}` : "";
            if (ingredient.amount === null) {
                let ingredientName = firstLetterUppercase(ingredient.name);
                return (
                    <li key={i}>
                        <p>{`${ingredientName}${details}`}</p>
                    </li>
                )
            } else {
                let ingredientName = ingredient.name.toLowerCase();
            return (
                <li key={i}>
                    <p>{`${ingredient.amount} ${ingredient.unit} ${ingredientName}${details}`}</p>
                </li>
                )
            }
        });
    }

    return (
        <ul className="recipe-ingredients">
            {ingredients}
        </ul>
    )
}

export default React.memo(RecipeIngredients);
