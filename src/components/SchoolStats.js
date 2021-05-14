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
                <div>
                    <p>{nbOfSickAndContagious} malades contagieux sur cette école.</p>
                    <p>{nbOfSick} malades non contagieux.</p>
                </div>
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