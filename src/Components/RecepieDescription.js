import React, { useState, useEffect } from 'react';
import '../App.css';
import RecepieDescriptionRow from './RecepieDescriptionRow';

function RecepieDescription (props) {

    const [elementHeight, setElementHeight] = useState(null);
    
    const registerHeight = (height) => {
        setElementHeight(height);
    }

    const openWithTransition = (element) => {
        element.classList.remove("hidden");
        requestAnimationFrame(() => { 
            element.style.height = elementHeight + "px";
        }) 
    }

    const closeWithTransition = (element) => {
            requestAnimationFrame(() => {  
            element.style.height = "0px";
        });
        
    }

    let formattedDescription = "";

    if (props.description === "") {
        formattedDescription = (<p className="recepie-description-missing"> ~ beskrivning saknas ~</p>)
    } else {
        const splitDescription = props.description.split(".");
        formattedDescription = splitDescription.map((row, i) => {
            let separator = ".";
            if(i === splitDescription.length - 1) {
                separator = "";
            }
            return <RecepieDescriptionRow key={i} row={row} separator={separator} className="recepie-description-row"/>
        });
    }

    useEffect(() => {
        const element = document.getElementById(`recepie-description-${props.id}`);
        element.classList.remove("hidden");
        const elementDimensions = element.getBoundingClientRect();
        registerHeight(elementDimensions.height);
        element.classList.add("hidden");
    }, [props.id]);

    useEffect(() => {
        const element = document.getElementById(`recepie-description-${props.id}`);
        if (props.animationStatus === "open") {
            openWithTransition(element);
        } else if (props.animationStatus === "close") {
            closeWithTransition(element);

        } 
    });
    
    return (
        <div className="recepie-description hidden" id={`recepie-description-${props.id}`}>
            {formattedDescription}
        </div>
    )
}

export default React.memo(RecepieDescription);


