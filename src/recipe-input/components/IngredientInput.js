import React from 'react';
import Tooltip from '../../shared/UIElements/Tooltip';

function IngredientInput(props) {

    return (
        <React.Fragment>
           {props.showTooltip && <Tooltip hideTooltip={props.hideTooltip} positionClass="tooltip-top">Skriv ingrediensens namn</Tooltip>}
           <div className="ingredient-input-wrapper" onKeyPress={props.handleEnter}>
                <div className="ingredient-input" id={props.id}>

                        <input  type="text" 
                                name="name" 
                                value={props.name} 
                                className="ingredient-input-name" 
                                placeholder="Ingrediens" 
                                autoComplete="off" 
                                onChange={props.handleChange} 
                                ref={props.inputFocus}/>
                                
                        <div className="ingredient-input-details-wrapper">
                                <input  type="text" 
                                        name="amount" 
                                        value={props.amount} 
                                        className="ingredient-input-amount" 
                                        placeholder="Mängd" 
                                        autoComplete="off" 
                                        onChange={props.handleChange}/>

                                <input  type="text" 
                                        name="unit" 
                                        value={props.unit} 
                                        className="ingredient-input-unit" 
                                        placeholder="Enhet" 
                                        autoComplete="off" 
                                        onChange={props.handleChange}/>

                                <input  type="text" 
                                        name="details" 
                                        value={props.details} 
                                        className="ingredient-input-details" 
                                        placeholder="Övrigt" 
                                        autoComplete="off" 
                                        onChange={props.handleChange}/>
                        </div>
                </div>

                <img    src={require("../../shared/icons/plus.svg")} 
                        alt="Lägg till" 
                        className="input-clickable-icon add-icon" 
                        onClick={props.addIngredient}/>
        
           </div>
        </React.Fragment>
    )
}

export default IngredientInput;


