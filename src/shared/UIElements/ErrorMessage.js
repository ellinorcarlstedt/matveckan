import React from 'react'

const ErrorMessage = (props) => {
    return (
        <span className="error-message" onClick={props.hideError}>
            {props.children}
        </span>
    )
}

export default ErrorMessage
