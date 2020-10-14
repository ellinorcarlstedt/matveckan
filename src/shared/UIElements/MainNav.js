import React, { useContext } from 'react';
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import "../../styles/App.css";

const MainNav = () => {
  const auth = useContext(AuthContext);

    return (
        <nav>
            <ul className="main-nav">
              <li>
                <NavLink to="/meny">Skapa meny</NavLink>
              </li>
              <li>
                <NavLink to="/recept">Lägg in recept</NavLink>
              </li>
              {!auth.isLoggedin && <li>
                <NavLink to="/auth">Logga in</NavLink>
              </li>}
              {auth.isLoggedin &&<li>
                <button className="nav-button" onClick={auth.logout}>Logga ut</button> 
              </li>}
            </ul>
        </nav>
    )
}

export default MainNav;
