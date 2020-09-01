import React from 'react';
import RecepieIngredients from './RecepieIngredients';
import RecepieDescription from './RecepieDescription';
import '../App.css';

function Recepie (props) {

    return (
        <div className="recepie">
            <RecepieIngredients ingredients={props.ingredients} />
            <RecepieDescription description={props.description} />
        </div>
    )
}

export default React.memo(Recepie);


