import React, { useState, useEffect } from 'react';

function HeightTransitionComponent (props) {

    const [elementHeight, setElementHeight] = useState(null);

    useEffect(() => {
        const element = document.getElementById(`height-transition-${props.id}`);
        if (element) {
            element.classList.remove("hidden");
            const elementDimensions = element.getBoundingClientRect();
            setElementHeight(elementDimensions.height);
        }
    }, [props.id]); 

    useEffect(() => {
        const element = document.getElementById(`height-transition-${props.id}`);
        if (element) {
            let animationHeight = props.isOpen ? elementHeight + "px" : "0px";
            requestAnimationFrame(() => { 
                element.style.height = animationHeight;
            }); 
        }
    }, [props.isOpen, props.id, elementHeight]);

    return (
        <div className={`height-transition hidden ${props.className}`} id={`height-transition-${props.id}`}>
            {props.children}
        </div>
    )
}

export default React.memo(HeightTransitionComponent);


