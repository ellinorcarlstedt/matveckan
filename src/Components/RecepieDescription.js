import React from 'react';
import '../App.css';
import RecepieDescriptionRow from './RecepieDescriptionRow';

function RecepieDescription (props) {
    const rawDescription = props.description;
    let finalDescription = "";

    if (rawDescription === "") {
        finalDescription = (<div className="recepie-description-missing"> ~ beskrivning saknas ~</div>)
    } else {
        const splitDescription = rawDescription.split(".");
        finalDescription = splitDescription.map((row, i) => {
            let separator = ".";
            if(i === splitDescription.length - 1) {
                separator = "";
            }
            return <RecepieDescriptionRow key={i} row={row} separator={separator} className="recepie-description-row"/>
        });
    }
    
    return (
        <div className="recepie-description">
            <div className="recepie-description-title">{props.title}</div>
            {finalDescription}
        </div>
    )
}

export default RecepieDescription;


