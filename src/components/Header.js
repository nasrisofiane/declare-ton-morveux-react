import { MDBBtn, MDBCollapse, MDBIcon, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBNavItem } from "mdbreact";
import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { AppContext } from '../services/AppContext';

const Header = () => {

    const appContext = useContext(AppContext);
    const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const logout = () => {

        var requestOptions = {
            method: 'POST',
            credentials : 'include',
        };

        fetch(`${process.env.REACT_APP_API_URL}/logout`, requestOptions)
            .then(response => response.text())
            .then(result => appContext.fetchIsAuthenticated())
            .catch(error => console.log('error', error));
    }

    const toggleCollapse = () => {
        setIsOpen(!isOpen);
      }

    const renderLogoutButton = () => {
        if (userIsAuthenticated) {
            return (
                <MDBNavItem className="d-flex align-items-center ">
                    <a onClick={logout} className="text-light nav-link">Se deconnecter</a>
                </MDBNavItem>
            );
        }
    }

    useEffect(() => {
        setUserIsAuthenticated(appContext.user.isAuthenticated);
    }, [appContext.user.isAuthenticated])

    return (
        <MDBNavbar color="default-color" dark expand="md">
            <MDBNavbarBrand>
                <Link className="navbar-brand" to="/">Déclare Ton Morveux</Link>
            </MDBNavbarBrand>

            <MDBNavbarToggler onClick={toggleCollapse}/>
            <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
                
                <MDBNavbarNav right>
                    <MDBNavItem className="mr-3">
                        <Link className="nav-link" to="/childDeclaration">Déclarez un enfant</Link>
                    </MDBNavItem>

                    {renderLogoutButton()}
                </MDBNavbarNav>
            </MDBCollapse>
        </MDBNavbar>

    );
}

export default Header;