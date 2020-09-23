import React from 'react';
import { Link } from "react-router-dom";
import "../sass/App.css";

const MainNav = () => {
    return (
        <nav>
            <ul className="main-nav">
              <li>
                <Link to="/meny">Skapa meny</Link>
              </li>
              <li>
                <Link to="/recept">Lägg in recept</Link>
              </li>
            </ul>
        </nav>
    )
}

export default MainNav;
