import React from 'react';

function AddedRecepieItem(props) {
    let iconClass = "edit";
    let itemClass = "";
    if (props.id === props.currentItem) {
        iconClass = "icon-edit-mode";
        itemClass = "item-edit-mode";
    }
    
    return (
        <div className={`added-item ${itemClass}`}>
            <p>{props.content}</p>
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
        </div>
    )
}

export default AddedRecepieItem;
