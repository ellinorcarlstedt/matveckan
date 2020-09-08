import React from 'react';
import '../App.css';

function DescriptionInput(props) {

    return (
        <div className="input-description">

            <input  type="text" 
                    className="input-description-row" 
                    name="description" 
                    value={props.value} 
                    onChange={props.handleChange} 
                    onKeyPress={props.handleEnter} 
                    ref={props.inputFocus}/>

            <img    src={require("../icons/plus.svg")} 
                    alt="Lägg till" 
                    className="input-clickable-icon add-icon" 
                    onClick={props.addDescriptionRow} />

        </div>
    )
}

export default DescriptionInput;

