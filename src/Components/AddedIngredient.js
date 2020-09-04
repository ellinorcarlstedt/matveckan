import React from 'react';

function AddedIngredient(props) {
    return (
        <div>
            <p>{`${props.amount} ${props.unit} ${props.name} ${props.details}`}</p>
            <button type="button" onClick={props.setEditMode}>Edit</button>
            <button type="button" onClick={props.deleteIngredient}>Delete</button>
        </div>
    )
}

export default AddedIngredient
