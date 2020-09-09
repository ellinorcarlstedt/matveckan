import React from 'react'

function RecipeDescription(props) {
    let description = [];
    if (props.description.length) {
        description = props.description.map((row, i) => <p className="recipe-description-row" key={i}>{row}</p>)
    } else {
        description = <p className="recipe-description-missing"> ~ Recept saknas ~ </p>
    }

    return (
        <div>
            {description}
        </div>
    )
}

export default React.memo(RecipeDescription);
