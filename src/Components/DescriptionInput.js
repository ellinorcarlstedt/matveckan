import React from 'react';
import Tooltip from './Tooltip';
import '../App.css';

function DescriptionInput(props) {

    const addIcon = props.editMode ? "check" : "plus";

    return (
        <div>
            <Tooltip showTooltip={props.showTooltip} positionClass="tooltip-description">Skriv en beskrivningsrad.</Tooltip>
            <div className="input-description">

                <input  type="text" 
                        className="input-description-row" 
                        name="description" 
                        value={props.value} 
                        onChange={props.handleChange} 
                        onKeyPress={props.handleEnter} 
                        ref={props.inputFocus}/>

                <img    src={require(`../icons/${addIcon}.svg`)} 
                        alt="Lägg till" 
                        className="input-clickable-icon add-icon" 
                        onClick={props.addDescriptionRow} />

            </div>
        </div>
    )
}

export default DescriptionInput;

