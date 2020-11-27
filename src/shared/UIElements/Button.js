import React from 'react';
import { Link } from 'react-router-dom';

const Button = (props) => {
    if (props.to) {
        return (
            <Link   
                to={props.to} 
                className={`button button--${props.size || "default"} ${props.danger && "button--danger"} ${props.buttonClass}`} 
                type={props.type || "button"} 
                onClick={props.onClick}>
                    {props.children}
            </Link>
            )
    } else {
        return (
            <button 
                className={`button button--${props.size || "default"} ${props.danger && "button--danger"} ${props.buttonClass}`} 
                type={props.type || "button"} 
                onClick={props.onClick}>
                    {props.children}
            </button>
            )
    }

}

export default Button;
