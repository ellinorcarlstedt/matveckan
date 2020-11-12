import React from 'react';
import Tooltip from '../../shared/UIElements/Tooltip';

function DescriptionInput(props) {

    return (
        <div>
            <Tooltip 
                show={props.showTooltip} 
                hideTooltip={props.hideTooltip} 
                position="middle" 
                tooltipClass="description__tooltip">
                    Skriv en instruktion
            </Tooltip>
            <div className="description-input" onKeyPress={props.handleEnter} >

                <input  type="text" 
                        placeholder="Gör såhär..." 
                        name="description" 
                        value={props.value} 
                        onChange={props.handleChange} 
                        autoComplete="off"
                        itemType="description"
                        ref={props.inputFocus}/>

                <img    src={require("../../shared/resources/icons/plus.svg")} 
                        alt="Lägg till" 
                        className="input-clickable-icon add-icon" 
                        onClick={props.addDescription} />

            </div>
        </div>
    )
}

export default DescriptionInput;

