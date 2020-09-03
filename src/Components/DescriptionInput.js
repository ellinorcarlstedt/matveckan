import React from 'react';
import '../App.css';

function DescriptionInput(props) {

    return (
        <div className="input-description" onChange={props.handleChange}>
            <input type="text" className="input-description-row"/>
            <button type="button">+</button>
        </div>
    )
}

export default DescriptionInput
