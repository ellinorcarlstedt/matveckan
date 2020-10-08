import React from 'react';

function RecipeDescription(props) {

    let description = props.description.map((row, i) => <li className="recipe-description-row" key={i}>{row.description}</li>)

    return (
        <ol className="recipe-description">
            {description}
        </ol>
    )
}

export default React.memo(RecipeDescription);
