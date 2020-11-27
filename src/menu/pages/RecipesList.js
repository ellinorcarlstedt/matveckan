import React, { useState } from 'react';
import MealDisplayer from '../components/MealDisplayer';


const RecipesList = (props) => {

    const [indexOfOpenRecipe, setIndexOfOpenRecipe] = useState(null);

    const openRecipe = (recipe) => {
        setIndexOfOpenRecipe(recipe);
    }

    const closeRecipe = () => {
        setIndexOfOpenRecipe(null);
    }

    return (
            <div className="recipes-list">
                {props.recipes.map((recipe) => {
                    return (
                        <MealDisplayer 
                            source="recipes-list"
                            key={recipe.id} 
                            meal={recipe} 
                            indexOfOpenRecipe={indexOfOpenRecipe}
                            openRecipe={() => openRecipe(recipe.id)}
                            closeRecipe={closeRecipe}
                            deleteRecipe={() => props.deleteRecipe(recipe.id)}
                            />
                    )
                })}
            </div>
    )
}

export default RecipesList;
