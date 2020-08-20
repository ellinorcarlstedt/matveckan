import React, { useState } from 'react';
import '../App.css';
import MealDisplayer from './MealDisplayer';
import IconArtistAttribute from './IconArtistAttribute';

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


    let reloadButtonText = "Visa menyförslag"; 
    let iconArtistAtt = "";
    
    if (props.menu.length) {
        reloadButtonText = "Nytt menyförslag";
        iconArtistAtt = <IconArtistAttribute />
    }            

        return (
        <div>
            <div className="menu-displayer">
                <h2 className="menu-displayer-title">Veckans meny</h2>
                <button className="menu-displayer-button-reload" onClick={reloadMenu}>{reloadButtonText}</button>
                    {menu}{iconArtistAtt}
            </div>
        </div>
        )
    
}

export default MenuDisplayer;