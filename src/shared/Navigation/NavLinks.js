import React, { useContext } from 'react';
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import "../../styles/App.css";

const NavLinks = () => {
  const auth = useContext(AuthContext);

    return (
            <ul className="nav-links">
              <li>
                <NavLink to="/meny">Skapa meny</NavLink>
              </li>
              {auth.isLoggedin && 
              <li>
                <NavLink to="/mina-recept">Mina recept</NavLink>
              </li>
              }
              <li>
                <NavLink to="/nytt-recept/5f7ed7225c2ec25690af8e55">Nytt recept</NavLink>
              </li>
              {!auth.isLoggedin && <li>
                <NavLink to="/auth">Logga in</NavLink>
              </li>}
              {auth.isLoggedin &&<li>
                <button className="nav-button" onClick={auth.logout}>Logga ut</button> 
              </li>}
            </ul>
    )
}

export default NavLinks;
