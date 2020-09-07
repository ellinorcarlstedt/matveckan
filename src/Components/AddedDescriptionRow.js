import React from 'react';

function AddedDescriptionRow(props) {

    let iconClass = "edit";
    let itemClass = "";
    if (props.id === props.currentDescriptionRow) {
        iconClass = "icon-edit-mode";
        itemClass = "item-edit-mode";
    }

    return (
        <div className={`added-item ${itemClass}`}>
            <p>{props.description}</p>
            <div className="added-item-buttons">
                <img src={require("../icons/pencil.png")} className={`input-clickable-icon ${iconClass}`} onClick={props.toggleEditMode} alt="Redigera"/>
                <img src={require("../icons/minus-no-border.png")} className="input-clickable-icon add-remove" onClick={props.deleteDescriptionRow} alt="Ta bort"/>
            </div>
        </div>
    )
}

export default AddedDescriptionRow



