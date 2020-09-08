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
                <img src={require("../icons/pencil.png")} alt="Redigera" className={`input-clickable-icon ${iconClass}`} onClick={props.toggleEditMode} />
                <img src={require("../icons/minus-no-border.png")} alt="Ta bort" className="input-clickable-icon add-remove" onClick={props.deleteDescriptionRow} />
            </div>
        </div>
    )
}

export default AddedDescriptionRow



