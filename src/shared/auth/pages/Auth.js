import React from 'react';
import "../../../sass/App.css";

const Auth = () => {
    return (
        <div className="auth">
            <form>
                <input type="text" placeholder="email"></input>
                <input type="text" placeholder="password"></input>
                <button type="sumbmit">Login</button>
            </form>
        </div>
    )
}

export default Auth;
