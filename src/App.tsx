import React from 'react';

import { Login } from './components/Login/Login'
import { Home } from './components/Home/Home'
import { About } from './components/About/About'

import { store } from './stores/Store'
import { Provider } from 'react-redux'

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import './App.css';
import { history } from './helpers/history';

import { configureFakeBackend } from './helpers/fake-backend';
configureFakeBackend();

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <header className="App-header">
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
              </ul>
            </nav>
          </header>
          <Switch>
            <Route path="/about">
              <About name="React Architecture" />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Home message="world!" />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}



export default App;
