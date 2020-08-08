import React from 'react';
import '../App.css';

function RecepieDescriptionRow (props) {
    return (
        <p className="recepie-description-row">
            {props.row}{props.separator}
        </p>
    )
}

export default RecepieDescriptionRow;