import React, { useState, useEffect } from 'react';
import { useHttpClient } from "../../shared/hooks/http-hook";
import MenuDisplayer from './MenuDisplayer';
import recipes from '../../shared/resources/recipes';
import IconArtistAttribute from '../../shared/UIElements/IconArtistAttribute';

function MenuModerator () {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [ allRecipes, setAllRecipes ] = useState(null);
    const [ selectedRecipes, setSelectedRecipes ] = useState([]);

    const reloadMenu = () => {
        const newMenu = getMenu(allRecipes, 7);
        setSelectedRecipes(newMenu);
    }

    const getRandomNumber = (maxNumber) => {
        return Math.floor(Math.random() * maxNumber)
    }

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await sendRequest("http://localhost:5000/api/recipes");
                console.log(response.recipes); //remove
                setAllRecipes(response.recipes);
            } catch(err) {
                console.log(err);
            }
        }
        fetchRecipes();
    }, [sendRequest]);

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