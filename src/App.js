import React, { useContext } from 'react';
import './App.css';
import Header from './components/Header';
import Welcome from './views/Welcome';
import Login from './views/Login';
import { Switch, Route } from "react-router-dom";
import ChildDeclaration from './views/ChildDeclaration';
import PrivateRoute from './services/PrivateRoute';
import AnonymousRoute from './services/AnonymousRoute';

function App() {

  return (
    <div className="App h-100 d-flex flex-column">
      <header>
        <Header />
      </header>

      <Switch>
        <Route exact path="/" component={Welcome} />

        <AnonymousRoute path="/login">
          <Login/>
        </AnonymousRoute>

        <PrivateRoute path="/childDeclaration">
          <ChildDeclaration />
        </PrivateRoute>
      </Switch>
    </div>
  );
}

export default App;
