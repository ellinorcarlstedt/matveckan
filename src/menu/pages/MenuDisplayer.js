import React, { useState } from 'react';
import MealDisplayer from '../components/MealDisplayer';
import Button from '../../shared/UIElements/Button';


function MenuDisplayer (props) {

    const [indexOfOpenRecipe, setIndexOfOpenRecipe] = useState(null);

    const openRecipe = (recipe) => {
        setIndexOfOpenRecipe(recipe);
    }

    const closeRecipe = () => {
        setIndexOfOpenRecipe(null);
    }

    const reloadMenu = () => {
        props.reloadMenu();
        closeRecipe();
    }

    const menu = props.menu.map((meal, index) => 
            (
            <MealDisplayer 
                source="menu-displayer"
                key={meal.id} 
                weekday={index + 1}
                meal={meal} 
                indexOfOpenRecipe={indexOfOpenRecipe}
                openRecipe={() => openRecipe(meal.id)}
                closeRecipe={() => closeRecipe()}/>
            )
        )

    const reloadButtonText = props.menu.length ? "Nytt menyförslag" : "Visa menyförslag";

        return (
            <div className="menu-displayer">
                <Button buttonClass="menu-displayer-reload-button" onClick={reloadMenu}>{reloadButtonText}</Button>
                    {menu}
            </div>
        )
}

export default MenuDisplayer;