import React from 'react';
import '../App.css';

function DescriptionInput(props) {

    return (
        <div className="input-description">
            <input type="text" className="input-description-row" value={props.value} onChange={props.handleChange}/>
            <button type="button" onClick={props.addDescriptionRow}>+</button>
        </div>
    )
}

export default DescriptionInput
