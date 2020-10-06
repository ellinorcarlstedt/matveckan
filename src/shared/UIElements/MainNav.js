import React from 'react';
import { NavLink } from "react-router-dom";
import "../../sass/App.css";

const MainNav = () => {
    return (
        <nav>
            <ul className="main-nav">
              <li>
                <NavLink to="/meny">Skapa meny</NavLink>
              </li>
              <li>
                <NavLink to="/recept">Lägg in recept</NavLink>
              </li>
              <li>
                <NavLink to="/auth">Auth</NavLink>
              </li>
            </ul>
        </nav>
    )
}

export default MainNav;
