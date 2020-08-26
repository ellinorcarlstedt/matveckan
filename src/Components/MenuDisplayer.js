import React, { useState } from 'react';
import '../App.css';
import MealDisplayer from './MealDisplayer';
import IconArtistAttribute from './IconArtistAttribute';

function MenuDisplayer (props) {

    const [indexOfOpenRecepie, setIndexOfOpenRecepie] = useState(null);

    const openRecepie = (recepie) => {
        setIndexOfOpenRecepie(recepie);
    }

    const closeRecepie = () => {
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