import React from 'react';
import '../App.css';

function InputIngredients() {
    return (
        <div className="input-ingredients-wrapper">
          <div className="input-ingredients">
            <input type="text" name="ingredient" className="input-ingredients-name" placeholder="Västerbottenost"/>
            <input type="text" name="amount" className="input-ingredients-amount" placeholder="200"/>
            <input type="text" name="unit" className="input-ingredients-unit" placeholder="g"/>
            <input type="text" name="details" className="input-ingredients-details" placeholder="Riven"/>
          </div>
          <button type="button">-</button>
        </div>
    )
}

export default InputIngredients
