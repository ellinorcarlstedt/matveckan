import React from 'react';

function AddedDescriptionRow(props) {
    return (
        <div>
            <p>{props.description}</p><button type="button" onClick={props.setEditMode}>Edit</button>
        </div>
    )
}

export default AddedDescriptionRow
