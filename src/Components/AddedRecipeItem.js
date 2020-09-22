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
            <p>{listItemNumber} {props.content}</p>
            <div className="added-item-buttons">

                <img    src={require("../icons/pencil.svg")}  
                        alt="Redigera" 
                        className={`input-clickable-icon ${iconClass}`} 
                        onClick={props.toggleEditMode}/>

                <img    src={require("../icons/cross.svg")} 
                        alt="Ta bort" 
                        className="input-clickable-icon remove-icon" 
                        onClick={props.deleteItem} />

            </div>
        </li>
    )
}

export default AddedRecipeItem;
