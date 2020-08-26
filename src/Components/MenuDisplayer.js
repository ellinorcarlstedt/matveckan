import React, { useState } from 'react';
import '../App.css';
import MealDisplayer from './MealDisplayer';
import IconArtistAttribute from './IconArtistAttribute';

function MenuDisplayer (props) {

    const [isARecepieOpen, setIsARecepieOpen] = useState(false);
    const [indexOfOpenRecepie, setIndexOfOpenRecepie] = useState(null);

    const openRecepie = (recepie) => {
        setIsARecepieOpen(true);
        setIndexOfOpenRecepie(recepie);
    }

    const closeRecepie = () => {
        setIsARecepieOpen(false);
        setIndexOfOpenRecepie(null);
    }

    const reloadMenu = () => {
        props.reloadMenu();
        closeRecepie();
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

    const reloadButtonText = props.menu.length ? "Nytt menyförslag" : "Visa menyförslag";
    const iconArtistAtt = props.menu.length ? <IconArtistAttribute /> : null;

        return (
        <div>
            <div className="menu-displayer">
                <button className="menu-displayer-reload-button" onClick={reloadMenu}>{reloadButtonText}</button>
                    {menu}{iconArtistAtt}
            </div>
        </div>
        )
}

export default MenuDisplayer;