import React, { useState, useEffect } from 'react';
import '../App.css';
import MenuDisplayer from './MenuDisplayer';
import recepies from '../recepies';

function MenuModerator () {
    const [ allRecepies, setAllRecepies ] = useState(null);
    const [ selectedRecepies, setSelectedRecepies ] = useState([]);

    const importRecepies = () => {
         setAllRecepies(recepies);
    }

    const reloadMenu = () => {
        const newMenu = getMenu(allRecepies, 7);
        setSelectedRecepies(newMenu);
    }

    const getRandomNumber = (maxNumber) => {
        return Math.floor(Math.random() * maxNumber)
    }

    useEffect(() => {
        importRecepies();
    }, []);

    const getMenu = (recepies, numberOfDays) => {  
        let allRecepies = [...recepies];
        let newMenu = [];
        while (allRecepies.length > 0 && newMenu.length < numberOfDays) {
            let randomNumber = getRandomNumber(allRecepies.length);
            newMenu.push(allRecepies[randomNumber]);
            allRecepies.splice(randomNumber, 1);
        }        
        return newMenu;
    }

    let menu = selectedRecepies;

    return (
    <div className="menu-moderator">
        <MenuDisplayer menu={menu} reloadMenu={() => reloadMenu()}/> 
    </div>
    )

}

export default MenuModerator;