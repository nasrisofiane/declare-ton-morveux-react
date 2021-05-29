import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import dotenv from 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppContextProvider } from './services/AppContext';
import { BrowserRouter as Router } from "react-router-dom";
import Loading from './components/Loading';

dotenv.config();

ReactDOM.render(
  <React.StrictMode>
    <Router basename="/declare-ton-morveux-react">
      <AppContextProvider>
        <App />
        <Loading/>
      </AppContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

