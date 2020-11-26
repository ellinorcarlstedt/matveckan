import React from 'react';
import { Link } from 'react-router-dom';

const Button = (props) => {
    if (props.to) {
        return (
            <Link to={props.to} className={`button ${props.buttonClass} ${props.large && "button--large"} `} 
                    type={props.type || "button"} 
                    onClick={props.onClick}>
                {props.children}
            </Link>
            )
    } else {
        return (
            <button className={`button ${props.buttonClass} ${props.large && "button--large"} ${props.small && "button--small"}`} 
                    type={props.type || "button"} 
                    onClick={props.onClick}>
                {props.children}
            </button>
            )
    }

}

export default Button;
