import React, { useState, useContext } from 'react';
import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hooks/http-hook";
import Background from "../../../shared/UIElements/Background";
import Modal from "../../../shared/UIElements/Modal";
import Button from "../../../shared/UIElements/Button"; 
import ErrorMessage from "../../../shared/UIElements/ErrorMessage"; 
import LoadingSpinner from "../../../shared/UIElements/LoadingSpinner";
import "../../../styles/App.css";

const Auth = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [ isLoginMode, setIsLogInMode ] = useState(true);
    const [ errorMessage, setErrorMessage] = useState("");
    const [ formName, setFormName ] = useState("");
    const [ formEmail, setFormEmail ] = useState("");
    const [ formPassword, setFormPassword ] = useState("");


    const switchModeHandler = () => {
        setIsLogInMode(!isLoginMode);
        clearErrorMessage();
    }

    const formNameHandler = (e) => {
        setFormName(e.target.value);
        clearErrorMessage();
    }

    const formEmailHandler = (e) => {
        setFormEmail(e.target.value);
        clearErrorMessage();
    }

    const formPasswordHandler = (e) => {
        setFormPassword(e.target.value);
        clearErrorMessage();
    }

    const showError = (message) => {
        setErrorMessage(message);
    }

    const hideError = () => {
        setErrorMessage("");
    }

    const clearErrorMessage = () => {
        if (errorMessage) { 
            hideError() }
    }

    const validateInput = () => {
        if(!isLoginMode && formName === "") {
            showError("Ange ett namn.");
        } else if (formEmail.length < 4) {
            showError("Ange en (giltig) mailadress.");
        } else if(!isLoginMode && formPassword.length < 6) {
            showError("Ange ett lösenord på minst 6 tecken.");
        } else if (isLoginMode && !formPassword) {
            showError("Ange ditt lösenord.");
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
        if (isLoginMode) {
                try {
                    const responseData = await sendRequest(
                        "http://localhost:5000/api/users/login",
                        "POST",
                        JSON.stringify({
                            email: formEmail,
                            password: formPassword
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
                            name: formName,
                            email: formEmail,
                            password: formPassword
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
                {!isLoginMode && ( 
                    <input  type="name" 
                            value={formName} 
                            placeholder="namn" 
                            autoComplete="off"
                            onChange={formNameHandler}/> 
                    )}
                    <input  type="email" 
                            value={formEmail} 
                            autoComplete="off"
                            placeholder="mailadress" 
                            onChange={formEmailHandler}/>
                    <input  type="password" 
                            value={formPassword} 
                            autoComplete="off"
                            placeholder="lösenord" 
                            onChange={formPasswordHandler}/>
                    {errorMessage && (
                    <ErrorMessage hideError={hideError}>
                        {errorMessage}
                    </ErrorMessage>
                    )}
                    <Button type="submit" buttonClass="login-button">
                        {isLoginMode ? "Logga in" : "Bli medlem"}
                    </Button>
                </form>
                <Button onClick={switchModeHandler} buttonClass="switch-mode-button">
                    {isLoginMode ? "Ny användare?" : "Redan medlem?"}
                </Button>
                {isLoading && <LoadingSpinner asOverlay />}  
            </div>
        </Background>
    )
}

export default Auth;
