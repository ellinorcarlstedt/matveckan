import React from 'react';
import '../App.css';

function RecepieDescription (props) {
    
    let description = props.description.length ? props.description.map((row, i) => <p className="recepie-description-row" key={i}>{row}</p>) 
        : (<p className="recepie-description-missing"> ~ Recept saknas ~ </p>)

    return (
        <div className="recepie-description">
            {description}
        </div>
    )
}

export default React.memo(RecepieDescription);


