import React, { useState, useEffect } from 'react';
import './styles/HeightTransitionComponent.css';

function HeightTransitionComponent (props) {

    const [elementHeight, setElementHeight] = useState(null);
    
    const registerElementHeight = (height) => {
        setElementHeight(height);
    }

    useEffect(() => {
        const element = document.getElementById(`height-transition-${props.id}`);
        element.classList.remove("hidden");
        const elementDimensions = element.getBoundingClientRect();
        registerElementHeight(elementDimensions.height);
    }, [props.id]); 

    useEffect(() => {
        const element = document.getElementById(`height-transition-${props.id}`);
        let animationHeight = props.isOpen ? elementHeight + "px" : "0px";
        requestAnimationFrame(() => { 
            element.style.height = animationHeight;
        }); 
    }, [props.isOpen, props.id, elementHeight]);

    return (
        <div className={`height-transition hidden ${props.className}`} id={`height-transition-${props.id}`}>
            {props.children}
        </div>
    )
}

export default React.memo(HeightTransitionComponent);


