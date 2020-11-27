import React, { useState, useContext, useReducer } from 'react';
import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hooks/http-hook";
import Background from "../../../shared/UIElements/Background";
import Modal from "../../../shared/UIElements/Modal";
import Button from "../../../shared/UIElements/Button"; 
import ErrorMessage from "../../../shared/UIElements/ErrorMessage"; 
import LoadingSpinner from "../../../shared/UIElements/LoadingSpinner";
import "../../../styles/App.css";

const formReducer = (state, action) => {
    switch (action.type) {
        case "INPUT_CHANGE": 
            return {
                ...state,
                [action.inputName]: action.value,
                errorMessage: ""
            }
        case "SWITCH_MODE":
            return {
                ...state,
                isLoginMode: !state.isLoginMode
            }
        case "SET_ERROR":
            return {
                ...state,
                errorMessage: action.error
            }
        default:
            return state;
    }
}

const Auth = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [ state, dispatch ] = useReducer(formReducer, {
        isLoginMode: true,
        errorMessage: "",
        name: "",
        email: "",
        password: ""
    });

    const validateInput = () => {
        let errorMessage;
        if (!state.isLoginMode && state.name === "") {
            errorMessage = "Ange ett namn.";
        } else if (state.email.length < 4) {
            errorMessage = "Ange en (giltig) mailadress.";
        } else if(!state.isLoginMode && state.password.length < 6) {
            errorMessage = "Ange ett lösenord på minst 6 tecken.";
        } else if (state.isLoginMode && !state.password) {
            errorMessage = "Ange ditt lösenord.";
        } 
        if (!!errorMessage) {
            dispatch({ type: "SET_ERROR", error: errorMessage });
        } else {
            return true;
        }
    }
  
    const submitHandler = async (e) => {
        e.preventDefault();
        let validInput = false;
        validInput = validateInput();
        if (!validInput) { 
            return; 
        } else {
        if (state.isLoginMode) {
                try {
                    const responseData = await sendRequest(
                        "http://localhost:5000/api/users/login",
                        "POST",
                        JSON.stringify({
                            email: state.email,
                            password: state.password
                        }),
                        {
                            "Content-Type": "application/json"
                        }
                    );
                    auth.login(responseData.userId, responseData.token);
                } catch (err) {}
        } else {
                try {
                    const responseData = await sendRequest(
                        "http://localhost:5000/api/users/signup",
                        "POST",
                        JSON.stringify({
                            name: state.name,
                            email: state.email,
                            password: state.password
                        }),
                        {
                            "Content-Type": "application/json"
                        }
                    );
                    auth.login(responseData.userId, responseData.token);
                } catch (err) {}
            }
        }
    }


    return (
        <Background className="auth-background">
            <Modal 
                show={!!error}
                onCancel={clearError}
                header="Någonting gick fel"
                footer={<Button onClick={clearError}>OK</Button>}
                >
            {error}
            </Modal>
            <div className="auth">
                <form onSubmit={submitHandler}>
                {!state.isLoginMode && ( 
                    <input  type="name" 
                            value={state.name} 
                            placeholder="namn" 
                            autoComplete="off"
                            onChange={(e) => dispatch({ type: "INPUT_CHANGE", inputName: "name", value: e.target.value })}/> 
                    )}
                    <input  type="email" 
                            value={state.email} 
                            autoComplete="off"
                            placeholder="mailadress" 
                            onChange={(e) => dispatch({ type: "INPUT_CHANGE", inputName: "email", value: e.target.value })}/>
                    <input  type="password" 
                            value={state.password} 
                            autoComplete="off"
                            placeholder="lösenord" 
                            onChange={(e) => dispatch({ type: "INPUT_CHANGE", inputName: "password", value: e.target.value })}/>
                    {state.errorMessage && (
                    <ErrorMessage hideError={() => dispatch({ type: "SET_ERROR", error: "" })}>
                        {state.errorMessage}
                    </ErrorMessage>
                    )}
                    <Button type="submit" buttonClass="login-button">
                        {state.isLoginMode ? "Logga in" : "Bli medlem"}
                    </Button>
                </form>
                <Button buttonClass="switch-mode-button" onClick={() => dispatch({ type: "SWITCH_MODE" })}>
                    {state.isLoginMode ? "Ny användare?" : "Redan medlem?"}
                </Button>
                {isLoading && <LoadingSpinner asOverlay />}  
            </div>
        </Background>
    )
}

export default Auth;
