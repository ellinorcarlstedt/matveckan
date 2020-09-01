import React from 'react'

function RecepieDescription(props) {
    let description = [];
    if (props.description.length) {
        description = props.description.map((row, i) => <p className="recepie-description-row" key={i}>{row}</p>)
    } else {
        description = <p className="recepie-description-missing"> ~ Recept saknas ~ </p>
    }

    return (
        <div>
            {description}
        </div>
    )
}

export default React.memo(RecepieDescription)
