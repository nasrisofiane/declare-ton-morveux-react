import React, { useContext, useState } from 'react';
import './App.css';
import Header from './components/Header';
import { AppContext } from './services/AppContext';
import Welcome from './views/Welcome';
import Login from './views/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  const { schools, user} = useContext(AppContext);

  return (
    <div className="App h-100 d-flex flex-column">
      <Router>
        <header>
          <Header />
        </header>
        <Switch>
          <Route exact path="/" component={Welcome} />

          <Route path="/login" component={Login} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
