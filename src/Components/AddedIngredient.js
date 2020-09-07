import React from 'react';

function AddedIngredient(props) {

    let iconClass = "edit";
    let itemClass = "";
    if (props.id === props.currentIngredient) {
        iconClass = "icon-edit-mode";
        itemClass = "item-edit-mode";
    }
    return (
        <div className={`added-item ${itemClass}`}>
            <p>{`${props.amount} ${props.unit} ${props.name} ${props.details}`}</p>
            <div className="added-item-buttons">
                <img src={require("../icons/pencil.png")} className={`input-clickable-icon ${iconClass}`} onClick={props.toggleEditMode} alt="Redigera"/>
                <img src={require("../icons/minus-no-border.png")} className="input-clickable-icon add-remove" onClick={props.deleteIngredient} alt="Ta bort"/>
            </div>
        </div>
    )
}

export default AddedIngredient


