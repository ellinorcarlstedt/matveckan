import React, { useEffect } from 'react';
import '../App.css';
import RecepieDescriptionRow from './RecepieDescriptionRow';

function RecepieDescription (props) {
    let formattedDescription = "";

    if (props.description === "") {
        formattedDescription = (<div className="recepie-description-missing"> ~ beskrivning saknas ~</div>)
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
        let recDesc = document.getElementById("recDesc");
        recDesc.classList.remove("hidden");
        let recDescDimensions = recDesc.getBoundingClientRect();
        recDesc.style.height = "0px";
        requestAnimationFrame(() => { 
            recDesc.style.height = recDescDimensions.height + "px";
        })
    }, []);
    
    return (
        <div className="recepie-description hidden" id="recDesc">
            {formattedDescription}
        </div>
    )
}

export default RecepieDescription;


