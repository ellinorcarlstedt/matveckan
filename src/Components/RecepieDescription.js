import React from 'react';
import '../App.css';

function RecepieDescription (props) {
    
    let description = [];
    if (props.description.length) {
        description = props.description.map((row, i) => <p className="recepie-description-row" key={i}>{row}</p>)
    } else {
        description = <p className="recepie-description-missing"> ~ Recept saknas ~ </p>
    }

    return (
        <div className="recepie-description">
            {description}
        </div>
    )
}

export default React.memo(RecepieDescription);


