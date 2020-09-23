import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import './sass/App.css';
import MainNav from './Components/MainNav';
import MenuModerator from './Components/MenuModerator';
import RecipeInputModerator from './Components/RecipeInputModerator';

function App() {
  return (
    <Router>
      <div className="App">
        <MainNav />
        <Switch> 
          <Route exact path="/" component={MenuModerator} />
          <Route exact path="/meny" component={MenuModerator} />
          <Route exact path="/recept" component={RecipeInputModerator} />
          <Redirect to="/" />
        </Switch>   
      </div>
      
    </Router>
  );
}

export default App;