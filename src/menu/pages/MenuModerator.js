import React, { useState, useEffect } from 'react';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Background from '../../shared/UIElements/Background';
import MenuDisplayer from './MenuDisplayer';
import Modal from '../../shared/UIElements/Modal';
import Button from '../../shared/UIElements/Button';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import ArtistAttribute from '../../shared/UIElements/ArtistAttribute';
import DUMMY_RECIPES from '../../shared/resources/dummyRecipes';

function MenuModerator () {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [ allRecipes, setAllRecipes ] = useState(null);
    const [ selectedRecipes, setSelectedRecipes ] = useState([]);

    const reloadMenu = () => {
        if (allRecipes) {
            const newMenu = getMenu(allRecipes, 7);
            setSelectedRecipes(newMenu);
        } 
    }

    const getRandomNumber = (maxNumber) => {
        return Math.floor(Math.random() * maxNumber)
    }

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await sendRequest("http://localhost:5000/api/recipes");
                setAllRecipes(response.recipes);
            } catch(err) {
                setAllRecipes(DUMMY_RECIPES);
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
        <React.Fragment>
            <Modal 
                show={!!error}
                onCancel={clearError}
                header="Någonting gick fel"
                footer={<Button onClick={clearError}>OK</Button>}>
                {error}
            </Modal>
            <Background className="menu-moderator">
                {isLoading && <LoadingSpinner asOverlay />}
                <MenuDisplayer menu={menu} reloadMenu={() => reloadMenu()}/> 
                <ArtistAttribute />
            </Background>
        </React.Fragment>
    )

}

export default MenuModerator;