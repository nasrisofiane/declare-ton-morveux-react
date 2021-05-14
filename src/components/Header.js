import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import { AppContext } from '../services/AppContext';

const Header = () => {

    return (

        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div>
                    <ul className="navbar-nav mr-auto">
                        <li>
                            <Link className="navbar-brand" to="/">Déclare Ton Morveux</Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/login">Déclarez un enfant</Link>
                        </li>
                    </ul>
                </div>
                
            </nav>
        </div>
    );
}

export default Header;