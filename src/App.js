import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './styles/App.css';
import MainNavigation from './shared/Navigation/MainNavigation';
import MenuModerator from './menu/pages/MenuModerator';
import RecipeInputModerator from './recipe-input/pages/RecipeInputModerator';
import Auth from './shared/auth/pages/Auth';
import useAuth from './shared/hooks/auth-hook';
import { AuthContext } from './shared/context/auth-context';


function App() {

  const { login, logout, token, userId } = useAuth();

  let routs = "";

  if (!!token) {
    routs = (
      <Switch> 
        <Route exact path="/" component={MenuModerator} />
        <Route exact path="/meny" component={MenuModerator} />
        <Route exact path="/recept" component={RecipeInputModerator} />
        <Redirect to="/recept" />
      </Switch> 
    );
  } else {
    routs = (
      <Switch> 
        <Route exact path="/" component={MenuModerator} />
        <Route exact path="/meny" component={MenuModerator} />
        <Route exact path="/recept" component={RecipeInputModerator} />
        <Route exact path="/auth" component={Auth} />
        <Redirect to="/meny" />
      </Switch> 
      );
  }

  return (
    <AuthContext.Provider 
        value={{
          isLoggedin : !!token, 
          token: token, 
          userId: userId, 
          login: login, 
          logout: logout
          }}>
      <Router>
        <div className="App">
          <MainNavigation />
            {routs}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;