import { MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow } from 'mdbreact';
import React, { useContext, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { AppContext } from '../services/AppContext';

const SignIn = () => {
    const appContext = useContext(AppContext);

    const [inputDatas, setInputDatas] = useState({
        username: '',
        password: ''
    });

    const match = useRouteMatch();

    const authenticateUser = () => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        if (inputDatas.username != null && inputDatas.password != null) {
            fetch(`${process.env.REACT_APP_API_URL}/authenticate`, {
                headers: headers,
                method: 'post',
                credentials: 'include',
                body: JSON.stringify(inputDatas)
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                })
                .then(token => {
                    if (token) {
                        appContext.setUser({
                            isAuthenticated: true,
                            ...token
                        });
                    }
                });
        }

    }

    const handleUsernameInputChange = (e) => {
        const username = e.target.value;

        setInputDatas(prev => {
            return {
                ...prev,
                username: username
            }
        })
    }

    const handlePasswordInputChange = (e) => {
        const password = e.target.value;

        setInputDatas(prev => {
            return {
                ...prev,
                password: password
            }
        })
    }

    return (
        <MDBContainer>
            <MDBRow className="d-flex justify-content-center align-items-center mt-4">
                <MDBCol md="6">
                    <form>
                        <p className="h5 text-center mb-4">Sign in</p>
                        <div className="grey-text">
                            <MDBInput type="text" onChange={handleUsernameInputChange} value={inputDatas.username} label="Nom d'utilisateur" icon="user" />
                            <MDBInput onChange={handlePasswordInputChange} value={inputDatas.password} type="password" label="Mot de passe" icon="lock" validate />
                        </div>
                        <div className="text-center">
                            <MDBBtn style={{ color : 'white'}} onClick={authenticateUser}>Se connecter</MDBBtn>
                        </div>
                    </form>
                    
                    <p className="mt-3">Vous n'avez pas de compte ? <Link style={{display : 'inline'}} to={`${match.url}/signup`}>Enregistrez vous</Link></p>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default SignIn;