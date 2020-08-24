import React, { useState, useEffect } from 'react';
import '../App.css';
import RecepieDescriptionRow from './RecepieDescriptionRow';

function RecepieDescription (props) {

    const [elementHeight, setElementHeight] = useState(null);
    
    const registerHeight = (height) => {
        setElementHeight(height);
    }

    const openWithTransition = (element) => {
        element.classList.remove("hidden-no-padding");
        element.style.height = "0px";
        requestAnimationFrame(() => { 
            element.style.height = elementHeight + "px";
        }) 
    }

    const closeWithTransition = async (element) => {
        await requestAnimationFrame(() => { 
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
        let recDesc = document.getElementById(`recDesc-${props.id}`);
        recDesc.style.height = "auto";
        recDesc.classList.remove("hidden-no-padding");
        let recDescDimensions = recDesc.getBoundingClientRect();
        registerHeight(recDescDimensions.height);
        recDesc.classList.add("hidden-no-padding");
    }, [props.id]);

    useEffect(() => {
        let recDesc = document.getElementById(`recDesc-${props.id}`);
        if (props.recepieDescriptionStatus === "open") {
            console.log(`${props.title} would be open now.`);
            openWithTransition(recDesc);
        } else if (props.recepieDescriptionStatus === "close") {
            console.log(`${props.title} would close.`);
            closeWithTransition(recDesc);
        } else if (props.recepieDescriptionStatus === "idle") {
            console.log("Dupp-dupp");
        }
    });
    
    return (
        <div className="recepie-description hidden-no-padding" id={`recDesc-${props.id}`}>
            {formattedDescription}
        </div>
    )
}

export default React.memo(RecepieDescription);


