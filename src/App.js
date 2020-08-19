import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import MenuModerator from './Components/MenuModerator';
import RecepieInputModerator from './Components/RecepieInputModerator';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
            <ul className="head-links-ul">
              <li>
                <Link to="/meny">Skapa meny</Link>
              </li>
              <li>
                <Link to="/recept">Lägg in recept</Link>
              </li>
            </ul>
        </nav>

        <Switch> 
          <Route exact path="/" component={MenuModerator} />
          <Route exact path="/meny" component={MenuModerator} />
          <Route exact path="/recept" component={RecepieInputModerator} /> 
        </Switch>   
        <footer><div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div></footer>
      </div>
      
    </Router>
  );
}

export default App;