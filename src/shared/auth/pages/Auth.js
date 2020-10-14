import React, { useState, useContext } from 'react';
import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hooks/http-hook";
import Background from "../../../shared/UIElements/Background";
import Modal from "../../../shared/UIElements/Modal";
import Button from "../../../shared/UIElements/Button"; 
import LoadingSpinner from "../../../shared/UIElements/LoadingSpinner";
import "../../../styles/App.css";

const Auth = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [ isLoginMode, setIsLogInMode ] = useState(true);
    const [ showModal, setShowModal ] = useState({ show: false, message: null});
    const [ formName, setFormName ] = useState("");
    const [ formEmail, setFormEmail ] = useState("");
    const [ formPassword, setFormPassword ] = useState("");

    const openModal = (message) => {
        setShowModal({
            show: true,
            message
        });
    }

    const closeModal = () => {
        setShowModal({
            show: false,
            message: null
        });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (isLoginMode) {
            if (formEmail.length >= 4 && formPassword.length >= 6) {
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
                    auth.login(responseData.user.id);
                } catch (err) {}
            } else {
                openModal("Det gick inte att logga in med de uppgifter du angivit. Försök igen.");
            }
        } else {
            if (formName !== "" && formEmail.length >= 4 && formPassword.length >= 6) {
                try {
                    const responseData = await sendRequest(
                        "http://localhost:5000/api/users/login",
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
                    auth.login(responseData.user.id);
                } catch (err) {}
            } else {
                openModal("Det gick inte att registrera en användare med de uppgifter du angivit. Försök igen.");
            }
        }
    }

    const switchModeHandler = () => {
        setIsLogInMode(!isLoginMode);
    }

    const formNameHandler = (e) => {
        setFormName(e.target.value);
    }

    const formEmailHandler = (e) => {
        setFormEmail(e.target.value);
    }

    const formPasswordHandler = (e) => {
        setFormPassword(e.target.value);
    }

    return (
        <Background className="auth-background">
             <div className="component-resizer">
                <Modal 
                    show={showModal.show}
                    onCancel={closeModal}
                    header="Det gick inte att logga in"
                    footer={<Button onClick={closeModal}>OK</Button>}
                    >
                <p>{showModal.message}</p>
                </Modal>
                <Modal 
                    show={error}
                    onCancel={clearError}
                    header="Någonting gick fel"
                    footer={<Button onClick={clearError}>OK</Button>}
                    >
                <p>{error}</p>
                </Modal>
                <div className="auth">
                    <form onSubmit={submitHandler}>
                    {!isLoginMode && 
                        <input  type="name" 
                                value={formName} 
                                placeholder="namn" 
                                autoComplete="off"
                                onChange={formNameHandler}/> }
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
                        <Button type="sumbmit" buttonClass="login-button">
                            {isLoginMode ? "Logga in" : "Bli medlem"}
                        </Button>
                    </form>
                    <Button onClick={switchModeHandler} buttonClass="switch-mode-button">
                        {isLoginMode ? "Ny användare?" : "Redan medlem?"}
                    </Button>
                    {isLoading && <LoadingSpinner asOverlay />}  
                </div>
            </div>
        </Background>
    )
}

export default Auth;
