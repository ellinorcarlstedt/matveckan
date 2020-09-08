import React from 'react'

function RecepieIngredients(props) {

    const firstLetterUppercase = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    let ingredients = [];
    if (props.ingredients.length) {
        ingredients = props.ingredients.map((ingredient, i) => {
            if (ingredient.amount === null) {
                let ingredientName = firstLetterUppercase(ingredient.name);
                return (
                    <div key={i}>
                        <p>{ingredientName}</p>
                    </div>
                )
            } else {
            return (
                <div key={i}>
                    <p>{`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`}</p>
                </div>
                )
            }
        })
    }

    return (
        <div className="recepie-ingredients">
            {ingredients}
        </div>
    )
}

export default React.memo(RecepieIngredients);
