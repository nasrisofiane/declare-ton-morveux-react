import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBAlert } from 'mdbreact';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [inputDatas, setInputDatas] = useState({
        username: '',
        password: '',
        email: ''
    });

    const [errors, setErrors] = useState({});

    const [isAccountRegistered, setIsAccountRegistered] = useState(null);

    const registerUser = () => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        if (inputDatas.username != null && inputDatas.password != null) {
            fetch(`${process.env.REACT_APP_API_URL}/register`, {
                headers: headers,
                method: 'post',
                body: JSON.stringify(inputDatas)
            })
                .then((response) => {
                    if (response.ok) {
                        setIsAccountRegistered(true);
                    } else {
                        setIsAccountRegistered(false);
                    }

                    if (response.status == 400) {
                        console.log('CANNOT REGISTER 400 !');
                        return response.json();
                    }
                })
                .then(response => setErrors(response));
        }

    }

    const cleanUpInputs = () => {
        setInputDatas(prev => {

            return {
                ...prev,
                username: '',
                password: '',
                email: ''
            }

        });
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

    const handleEmailInputChange = (e) => {
        const email = e.target.value;

        setInputDatas(prev => {
            return {
                ...prev,
                email: email
            }
        })
    }

    const generateFieldsMessages = () => {
        const messages = Object.values(errors);

        if (messages.length > 0) {
            return (
                <div>
                    { messages.map((message, i) => <MDBAlert key={i} color="danger">{message}</MDBAlert>)}
                </div>
            )

        } else {
            return (
                <div></div>
            );
        }
    }

    useEffect(() => {
        if (isAccountRegistered) {
            cleanUpInputs();
        }
    }, [isAccountRegistered]);

    return (
        <MDBContainer>
            <MDBRow className="d-flex justify-content-center align-items-center mt-4">
                <MDBCol md="6">
                    <form>
                        <p className="h5 text-center mb-4">Sign up</p>
                        <div className="grey-text">
                            <MDBInput value={inputDatas.username} type="text" label="Nom d'utilisateur" icon="user" onChange={handleUsernameInputChange} />
                            <MDBInput value={inputDatas.email} type="email" label="Email" icon="envelope" onChange={handleEmailInputChange} />
                            <MDBInput value={inputDatas.password} type="password" label="Mot de passe" icon="lock" validate onChange={handlePasswordInputChange} />
                        </div>
                        
                        {generateFieldsMessages()}

                        <div className="text-center">
                            <MDBBtn style={{ color: 'white' }} onClick={registerUser}>S'enregistrer</MDBBtn>
                        </div>


                    </form>

                    <p className="mt-3">Vous avez déjà un compte ? <Link style={{ display: 'inline' }} to={`/login`}>Connectez vous</Link></p>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default SignUp;