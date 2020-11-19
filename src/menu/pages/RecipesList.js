import React, { useState, useEffect } from 'react';
import MealDisplayer from '../components/MealDisplayer';

const RecipesList = (props) => {

    const [ filteredRecipes, setFilteredRecipes ] = useState();
    const [indexOfOpenRecipe, setIndexOfOpenRecipe] = useState(null);

    const openRecipe = (recipe) => {
        setIndexOfOpenRecipe(recipe);
    }

    const closeRecipe = () => {
        setIndexOfOpenRecipe(null);
    }

    useEffect(() => {
        setFilteredRecipes(props.recipes);
    }, [props.recipes]);

    return (
        <div className="component-resizer">
            <div className="recipes-list">
                {filteredRecipes && filteredRecipes.map((recipe, index) => {
                    return (
                        <MealDisplayer 
                            key={recipe.id} 
                            meal={recipe} 
                            indexOfOpenRecipe={indexOfOpenRecipe}
                            openRecipe={() => openRecipe(recipe.id)}
                            closeRecipe={() => closeRecipe()}/>
                    )
                })}
            </div>
        </div>
    )
}

export default RecipesList;
