import React, { useState } from 'react';
import '../App.css';
import MealDisplayer from './MealDisplayer';
import IconArtistAttribute from './IconArtistAttribute';

function MenuDisplayer (props) {

    const [isARecepieOpen, setIsARecepieOpen] = useState(false);
    const [indexOfOpenRecepie, setIndexOfOpenRecepie] = useState(null);
    const [lastOpenRecepie, setLastOpenRecepie] = useState(null);

    const openRecepie = (recepieIndex) => {
        if (!isARecepieOpen) {
            setIsARecepieOpen(true);
            setIndexOfOpenRecepie(recepieIndex);
        } else if (isARecepieOpen && !(indexOfOpenRecepie === recepieIndex)) {
            setLastOpenRecepie(indexOfOpenRecepie);
            setIndexOfOpenRecepie(recepieIndex);
        }
    }

    const closeRecepie = () => {
        setIsARecepieOpen(false);
        setIndexOfOpenRecepie(null);
        setLastOpenRecepie(null);
    }

    const reloadMenu = () => {
        props.reloadMenu();
        setIsARecepieOpen(false);
        setIndexOfOpenRecepie(null);
        setLastOpenRecepie(null);
    }

    const menu = props.menu.map((meal, index) => 
            (
            <MealDisplayer 
                key={meal.index} 
                weekday={index + 1}
                meal={meal} 
                isARecepieOpen={isARecepieOpen}
                indexOfOpenRecepie={indexOfOpenRecepie}
                lastOpenRecepie={lastOpenRecepie}
                openRecepie={() => openRecepie(meal.index)}
                closeRecepie={() => closeRecepie(meal.index)}/>
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
                <button className="menu-displayer-button-reload" onClick={reloadMenu}>{reloadButtonText}</button>
                    {menu}{iconArtistAtt}
            </div>
        </div>
        )
    
}

export default MenuDisplayer;