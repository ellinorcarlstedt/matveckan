import React, { useState, useEffect } from 'react';
import '../App.css';

function RecepieDescription (props) {

    const [elementHeight, setElementHeight] = useState(null);
    
    const registerHeight = (height) => {
        setElementHeight(height);
    }

    const openWithTransition = (element) => {
        element.classList.remove("hidden");
        requestAnimationFrame(() => { 
            element.style.height = elementHeight + "px";
        }); 
    }

    const closeWithTransition = (element) => {
            requestAnimationFrame(() => {  
            element.style.height = "0px";
        });
    }

    useEffect(() => {
        const element = document.getElementById(`recepie-description-${props.id}`);
        element.classList.remove("hidden");
        const elementDimensions = element.getBoundingClientRect();
        registerHeight(elementDimensions.height);
    }, [props.id]); 

    useEffect(() => {
        const element = document.getElementById(`recepie-description-${props.id}`);
        props.isOpen ? openWithTransition(element) : closeWithTransition(element); 
    });

    
    let description = props.description.length ? props.description.map((row, i) => <p className="recepie-description-row" key={i}>{row}</p>) 
        : (<p className="recepie-description-missing"> ~ Recept saknas ~ </p>)

    return (
        <div className="recepie-description hidden" id={`recepie-description-${props.id}`}>
            {description}
        </div>
    )
}

export default React.memo(RecepieDescription);


