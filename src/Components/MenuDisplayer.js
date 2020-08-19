import React, { useState } from 'react';
import '../App.css';
import MealDisplayer from './MealDisplayer';

function MenuDisplayer (props) {

    const [isARecepieOpen, setIsARecepieOpen] = useState(false);
    const [indexOfOpenRecepie, setIndexOfOpenRecepie] = useState(null);

    const openRecepie = (recepieIndex) => {
        setIsARecepieOpen(true);
        setIndexOfOpenRecepie(recepieIndex);
    }

    const closeRecepie = () => {
        setIsARecepieOpen(false);
        setIndexOfOpenRecepie(null);
    }

    const reloadMenu = () => {
        props.reloadMenu();
        setIsARecepieOpen(false);
        setIndexOfOpenRecepie(null);
    }

    const menu = props.menu.map((meal, index) => 
            (
            <MealDisplayer 
                key={meal.index} 
                weekday={index + 1}
                meal={meal} 
                isARecepieOpen={isARecepieOpen}
                indexOfOpenRecepie={indexOfOpenRecepie}
                openRecepie={() => openRecepie(meal.index)}
                closeRecepie={() => closeRecepie()}/>
            )
        )


    let buttonText = "Visa menyförslag"; 
    if (props.menu.length) {
        buttonText = "Nytt menyförslag";
    }            

        return (
            <div>
            <div className="menu-displayer">
                <h2 className="menu-displayer-title">Veckans meny</h2>
                {menu} 
            </div>
        <button className="menu-displayer-button-reload" onClick={reloadMenu}>{buttonText}</button>
        </div>
        )
    
}

export default MenuDisplayer;