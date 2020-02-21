import React from 'react';

import { Login } from './components/Login/Login'
import { Home } from './components/Home/Home'
import { About } from './components/About/About'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import './App.css';
import logo from './logo.svg';


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
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About name="React Architecture" />
          </Route>
          <Route path="/home">
            <Home message="world!" />
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
  </Provider>,
  );
}



export default App;
