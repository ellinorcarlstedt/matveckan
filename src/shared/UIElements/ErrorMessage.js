import React from 'react'

const ErrorMessage = (props) => {
    return (
        <span className={`error-message ${props.errorClass}`} onClick={props.hideError}>
            {props.children}
        </span>
    )
}

export default ErrorMessage
