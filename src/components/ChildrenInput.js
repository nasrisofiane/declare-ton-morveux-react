import { MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow } from 'mdbreact';
import React, { useContext, useState } from 'react';
import { AppContext } from '../services/AppContext';
import SchoolsInput from './SchoolsInput';

import './css/ChildrenInput.css';

const ChildrenInput = () => {

    const [selectedSchool, setSelectedSchool] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const { fetchMyChildren } = useContext(AppContext);


    const handleSchoolInputGetter = (school) => {
        setSelectedSchool(school);
    }

    const addChildren = () => {
        const headers = new Headers();
        const body = {
            firstName: firstName,
            lastName: lastName,
            school: { id: selectedSchool.id }
        }

        headers.append('Content-Type', 'application/json');

        if (selectedSchool != null) {
            fetch(`${process.env.REACT_APP_API_URL}/api/children`, {
                headers: headers,
                method: 'post',
                credentials: 'include',
                body: JSON.stringify(body)
            })
                .then((response) => {
                    if (response.ok) {
                        fetchMyChildren();
                        cleanInputs();
                        return response.json();
                    }
                })
        }

    }

    const handleLastNameInput = (e) => {
        const value = e.target.value;
        setLastName(value);
    }

    const handleFirstName = (e) => {
        const value = e.target.value;
        setFirstName(value);
    }

    const cleanInputs = () =>{
        setFirstName('');
        setLastName('');
    }

    return (
        <MDBContainer>
            <MDBRow className="d-flex flex-column justify-content-center align-items-center mt-4">
                <p className="h5 text-center mb-4">Ajoutez un enfant</p>

                <MDBCol md="12">
                    <form className="d-flex flex-md-row flex-column justify-content-center">
                        <div className="grey-text d-flex flex-md-row flex-column justify-content-center align-items-center">
                            <div className="d-flex flex-row justify-content-center">
                                <div className="mr-1">
                                    <MDBInput value={lastName} type="text" onChange={handleLastNameInput} label="Nom" icon="child" />
                                </div>

                                <div className="ml-1 mr-4">
                                    <MDBInput value={firstName} type="text" onChange={handleFirstName} label="Prénom" />
                                </div>
                            </div>

                            <div className="ml-4 mr-4">
                                <SchoolsInput isLocal={true} getter={handleSchoolInputGetter} />
                            </div>
                        </div>
                        <div id="add-child-btn" className="text-center d-flex justify-content-center align-items-center">
                            <MDBBtn onClick={addChildren} className="ml-4"><MDBIcon icon="plus" /></MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default ChildrenInput;