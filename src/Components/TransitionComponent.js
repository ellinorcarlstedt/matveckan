import React, { useState, useEffect } from 'react';
import '../TransitionComponent.css';

function TransitionComponent (props) {

    const [elementHeight, setElementHeight] = useState(null);
    
    const registerHeight = (height) => {
        setElementHeight(height);
    }

    useEffect(() => {
        const element = document.getElementById(`transition-element-${props.id}`);
        element.classList.remove("hidden");
        const elementDimensions = element.getBoundingClientRect();
        registerHeight(elementDimensions.height);
        console.log("Use 1");
    }, [props.id]); 

    useEffect(() => {
        const element = document.getElementById(`transition-element-${props.id}`);
        if (props.isOpen) {
            element.classList.remove("hidden");
            requestAnimationFrame(() => { 
                element.style.height = elementHeight + "px";
            }); 
        } else {
            requestAnimationFrame(() => {  
                element.style.height = "0px";
            })
        }
    }, [props.isOpen, props.id, elementHeight]);

    return (
        <div className="transition-component hidden" id={`transition-element-${props.id}`}>
            {props.children}
        </div>
    )
}

export default React.memo(TransitionComponent);


