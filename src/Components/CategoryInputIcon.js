import React from 'react';
import '../App.css';
import '../App.css';

function CategoryInputIcon(props) {

    let selected = props.selectedCategory === props.value ? "selected" : "";

    return (
        <div className="category-input-icon" onClick={() => props.handleChange(props.value)}>
            <label htmlFor={props.name}>
                <img src={props.imgSrc} alt={props.name} className={selected}/>
            </label>
        </div>  
    )
}

export default CategoryInputIcon;
