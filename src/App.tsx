import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { history } from './utils/history';
import { Provider } from 'react-redux'

import './App.css';

import { Login } from './components/Login/Login'
//import ResponsiveDrawer from './components/Home/Home'
import ResponsiveDrawer from './components/Dashboard/Drawer'
import { About } from './components/About/About'

import { configureFakeBackend } from './utils/fake-backend';
import { rootStore } from './reducers';
import SignUp from './components/SignUp/SignUp';
//configureFakeBackend();

const App = () => {
  return (
    <Provider store={rootStore}>
      <Router>
        <div className="App">
          {/* <header className="App-header">
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/FCLogin">FC Login</Link>
                </li>
              </ul>
            </nav>
          </header> */}
          <Switch>
            <Route exact path="/signup">
              <SignUp />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route path="/">
              <ResponsiveDrawer />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}



export default App;
