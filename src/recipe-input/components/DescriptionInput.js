import React from 'react';
import Tooltip from '../../shared/UIElements/Tooltip';

function DescriptionInput(props) {

    const addIcon = props.editMode ? "check" : "plus";

    return (
        <div>
            {props.showTooltip && <Tooltip hideTooltip={props.hideTooltip} positionClass="tooltip-top">Skriv en instruktion</Tooltip>}
            <div className="description-input" onKeyPress={props.handleEnter} >

                <input  type="text" 
                        placeholder="Gör såhär..." 
                        name="description" 
                        value={props.value} 
                        onChange={props.handleChange} 
                        autoComplete="off"
                        ref={props.inputFocus}/>

                <img    src={require(`../../shared/icons/${addIcon}.svg`)} 
                        alt="Lägg till" 
                        className="input-clickable-icon add-icon" 
                        onClick={props.addDescriptionRow} />

            </div>
        </div>
    )
}

export default DescriptionInput;

