import React from 'react';
import '../App.css';

function IngredientInput(props) {

    return (
        <div className="ingredient-input-wrapper">
          <div className="ingredient-input" id={props.id}>
            <input type="text" name="name" value={props.name} className="ingredient-input-name" placeholder="Ingrediens" autoComplete="off" onChange={props.handleChange}/>
            <input type="text" name="amount" value={props.amount} className="ingredient-input-amount" placeholder="Mängd" autoComplete="off" onChange={props.handleChange}/>
            <input type="text" name="unit" value={props.unit} className="ingredient-input-unit" placeholder="Enhet" autoComplete="off" onChange={props.handleChange}/>
            <input type="text" name="details" value={props.details} className="ingredient-input-details" placeholder="Kommentar" autoComplete="off" onChange={props.handleChange}/>
          </div>
    <button type="button" onClick={props.addIngredient}>+</button>
        </div>
    )
}

export default IngredientInput