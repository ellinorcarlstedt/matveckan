import React, { useState, useEffect } from 'react';
import MenuDisplayer from './MenuDisplayer';
import recipes from '../resources/recipes';
import IconArtistAttribute from './IconArtistAttribute';

function MenuModerator () {
    const [ allRecipes, setAllRecipes ] = useState(null);
    const [ selectedRecipes, setSelectedRecipes ] = useState([]);

    const importRecipes = () => {
         setAllRecipes(recipes);
    }

    const reloadMenu = () => {
        const newMenu = getMenu(allRecipes, 7);
        setSelectedRecipes(newMenu);
    }

    const getRandomNumber = (maxNumber) => {
        return Math.floor(Math.random() * maxNumber)
    }

    useEffect(() => {
        importRecipes();
    }, []);

    const getMenu = (recipes, numberOfDays) => {  
        let allRecipes = [...recipes];
        let newMenu = [];
        while (allRecipes.length > 0 && newMenu.length < numberOfDays) {
            let randomNumber = getRandomNumber(allRecipes.length);
            newMenu.push(allRecipes[randomNumber]);
            allRecipes.splice(randomNumber, 1);
        }        
        return newMenu;
    }

    let menu = selectedRecipes;

    return (
    <div className="menu-moderator">
        <MenuDisplayer menu={menu} reloadMenu={() => reloadMenu()}/> 
        <IconArtistAttribute />
    </div>
    )

}

export default MenuModerator;