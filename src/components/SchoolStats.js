import { MDBAlert, MDBContainer } from 'mdbreact';
import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../services/AppContext';

const SchoolStats = () => {

    const { schools } = useContext(AppContext);
    const [nbOfSickAndContagious, setNbOfSickAndContagious] = useState(0);
    const [nbOfSick, setNbOfSick] = useState(0);

    const fetchSickAndContagious = () => {
        fetch(`https://declare-ton-morveux.herokuapp.com/api/children/countIsSickAndIsContagiousBySchool/${schools.selectedSchool.id}`)
            .then(res => res.json())
            .then(res => setNbOfSickAndContagious(res));
    }

    const fetchSick = () => {
        fetch(`https://declare-ton-morveux.herokuapp.com/api/children/countIsSickBySchool/${schools.selectedSchool.id}`)
            .then(res => res.json())
            .then(res => setNbOfSick(res));
    }

    const hasSelectedSchool = () => {
        return Object.keys(schools.selectedSchool).length > 0;
    }

    const viewLoader = () => {

        if (hasSelectedSchool()) {
            return (
                <MDBContainer>
                    <MDBAlert color="warning">
                        <h4 className="alert-heading">Informations</h4>
                        <p>Il y a actuellement {nbOfSick} malades dont {nbOfSickAndContagious} contagieux sur cette école</p>
                    </MDBAlert>
                </MDBContainer>
            )
        } else {

            return (
                <div>
                </div>
            )
        }
    }

    useEffect(() => {
        if (hasSelectedSchool()) {
            fetchSickAndContagious();
            fetchSick();
        }
    }, [schools.selectedSchool]);

    return viewLoader();
}

export default SchoolStats;