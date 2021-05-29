import React, { useEffect } from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';
import Header from './components/Header';
import AnonymousRoute from './services/AnonymousRoute';
import PrivateRoute from './services/PrivateRoute';
import ChildDeclaration from './views/ChildDeclaration';
import Login from './views/Login';
import Welcome from './views/Welcome';

function App() {

  useEffect(() => {
    console.log('App v3');
  }, []);

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
