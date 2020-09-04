import React from 'react';

function AddedDescriptionRow(props) {
    return (
        <div>
            <p>{props.description}</p>
            <button type="button" onClick={props.setEditMode}>Edit</button>
            <button type="button" onClick={props.deleteDescriptionRow}>Delete</button>
        </div>
    )
}

export default AddedDescriptionRow
