import React from 'react';

function CategoryInputIcon(props) {

    let selected = props.selectedCategory === props.value ? "selected" : "";

    return (
        <div 
            className="category-input-icon" 
            onClick={() => props.handleChange("category", props.value)} 
            onKeyPress={props.handleEnter}>
            <label htmlFor={props.name}>
                <img 
                    src={props.imgSrc} 
                    alt={props.name} 
                    name={props.name} 
                    value={props.value} 
                    className={selected} 
                    tabIndex="0"/>
            </label>
        </div>  
    )
}

export default CategoryInputIcon;
