import React, { useState, useCallback } from 'react';
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
import { AuthContext } from './shared/context/auth-context';

function App() {

  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ userId, setUserId ] = useState(null);

  const login = useCallback((uid) => {
      setIsLoggedIn(true);
      setUserId(uid);
    }, []);

  const logout = useCallback(() => {
      setIsLoggedIn(false);
      setUserId(null);
    }, []);

  let routs = "";

  if (isLoggedIn) {
    routs = (
      <Switch> 
        <Route exact path="/" component={MenuModerator} />
        <Route exact path="/meny" component={MenuModerator} />
        <Route exact path="/recept" component={RecipeInputModerator} />
        <Redirect to="/" />
    </Switch> 
    );
  } else {
    routs = (
      <Switch> 
        <Route exact path="/" component={MenuModerator} />
        <Route exact path="/meny" component={MenuModerator} />
        <Route exact path="/recept" component={RecipeInputModerator} />
        <Route exact path="/auth" component={Auth} />
      <Redirect to="/" />
  </Switch> 
      );
  }

  return (
    <AuthContext.Provider value={{isLoggedin : isLoggedIn, userId: userId, login: login, logout: logout}}>
      <Router>
        <div className="App">
          <MainNav />
            {routs}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;