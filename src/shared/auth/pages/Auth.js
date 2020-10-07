import React, { useState, useContext } from 'react';
import { AuthContext } from "../../context/auth-context";
import "../../../sass/App.css";

const Auth = () => {
    const auth = useContext(AuthContext);

    const [ isLoginMode, setIsLogInMode ] = useState(true);
    const [ formName, setFormName ] = useState("");
    const [ formEmail, setFormEmail ] = useState("");
    const [ formPassword, setFormPassword ] = useState("");


    const submitHandler = (e) => {
        e.preventDefault();
        if (isLoginMode) {
            if (formEmail.length >= 4 && formPassword.length >= 6) {
                auth.login();
            } else {
                alert("Oj då, det gick inte att logga in med de uppgifter du angivit. Försök igen.")
            }
        } else {
            if (formName !== "" && formEmail.length >= 4 && formPassword.length >= 6) {
                auth.login();
            } else {
                alert("Oj då, det gick inte att registrera en ny användare med de uppgifter du angivit. Försök igen.")
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
        <div className="auth">
            <div>
                <form onSubmit={submitHandler}>
                   {!isLoginMode && 
                    <input  type="name" 
                            value={formName} 
                            placeholder="name" 
                            onChange={formNameHandler}/> }
                    <input  type="email" 
                            value={formEmail} 
                            placeholder="email" 
                            onChange={formEmailHandler}/>
                    <input  type="password" 
                            value={formPassword} 
                            placeholder="password" 
                            onChange={formPasswordHandler}/>
                    <button type="sumbmit">
                        {isLoginMode ? "Log in" : "Sign up"}
                    </button>
                </form>
                <button onClick={switchModeHandler}>
                    Switch to {isLoginMode ? "sign up" : "log in"}
                </button>
            </div>
        </div>
    )
}

export default Auth;
