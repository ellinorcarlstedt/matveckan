import React from 'react';

function AddedRecipeItem(props) {
    let iconClass = "edit";
    let itemClass = "";
    if (props.id === props.currentItem) {
        iconClass = "icon-edit-mode";
        itemClass = "item-edit-mode";
    }

    let listItemNumber = props.listItemNumber ? `${props.listItemNumber}. ` : "";
    
    return (
        <li className={`added-item ${itemClass}`}>
            {listItemNumber} {props.content}
            <div className="added-item-buttons">

                <img    src={require("../../shared/icons/pencil.svg")}  
                        alt="Redigera" 
                        className={`input-clickable-icon ${iconClass}`} 
                        onClick={props.toggleEditMode}/>

                <img    src={require("../../shared/icons/cross.svg")} 
                        alt="Ta bort" 
                        className="input-clickable-icon remove-icon" 
                        onClick={props.deleteItem} />

            </div>
        </li>
    )
}

export default AddedRecipeItem;
