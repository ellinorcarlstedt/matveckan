import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './sass/App.css';
import MainNav from './shared/UIElements/MainNav';
import MenuModerator from './menu/pages/MenuModerator';
import RecipeInputModerator from './recipe-input/pages/RecipeInputModerator';
import Auth from './shared/auth/pages/Auth';

function App() {
  return (
    <Router>
      <div className="App">
        <MainNav />
        <Switch> 
          <Route exact path="/" component={MenuModerator} />
          <Route exact path="/meny" component={MenuModerator} />
          <Route exact path="/recept" component={RecipeInputModerator} />
          <Route exact path="/auth" component={Auth} />
          <Redirect to="/" />
        </Switch>   
      </div>
      
    </Router>
  );
}

export default App;