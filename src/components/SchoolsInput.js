import { MDBInput, MDBContainer, MDBListGroup, MDBListGroupItem } from 'mdbreact';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../services/AppContext';

import './css/SchoolsInput.css';

const getWindowDimensions = () => {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    }
}

const styles = {
    container: {
        position: 'relative',
        width: '10%',
        minWidth: '300px',
        maxWidth: '700px',
        zIndex : 1000
    },

    mdbContainer: {
        fontSize: '13px',
        padding: '0px',
        margin: '0px'
    },

    mdbListGroup: {
        width: '100%',
        position: 'absolute',
        height: 'auto',
        maxHeight: getWindowDimensions().height / 2.9,
        overflowX: 'hidden',
        overflowY: 'auto'
    }
}

const SchoolsInput = ({ isLocal, getter }) => {
    const { schools, setSchools } = useContext(AppContext);
    const [selectedOption, setSelectedOption] = useState('');
    const [displayList, setDisplayList] = useState('none');
    const [filteredSchools, setfilteredSchools] = useState([]);
    const [isCursorOnList, setIsCursorOnList] = useState(false);

    const handleSchoolsInput = (e) => {
        const value = e.target.value;
        setSelectedOption(value);
    }

    const handleSelectOption = (e) => {
        const value = e.target.attributes.value.value;
        setSelectedOption(value);
    }

    const customFilter = (value) => {
        if (value === selectedOption) {
            return false;
        }

        return value.includes(selectedOption);
    }

    const handleSetSchool = () => {
        const value = selectedOption;

        if (value != '' && value && typeof value != 'undefined') {
            const school = schools.all.get(value);

            if (school != null) {
                if(isLocal === true){
                    getter(school);
                } else {
                    setSchools(prev => {
                        return {
                            ...prev,
                            selectedSchool: school
                        }
                    })
                }
                
            }
        }
    }

    const handleDisplayList = (show) => {
        const displayElement = 'block';
        const hiddingElement = 'none';

        if (show === true && displayList != displayElement) {
            setDisplayList(displayElement);

        } else if (show === false && displayList != hiddingElement && isCursorOnList === false) {
            setDisplayList(hiddingElement);
        }

    }

    const getSchools = () => {
        const filteredSchools = Array.from(schools.all).filter(([key, value]) => customFilter(value.name));
        setfilteredSchools(filteredSchools);
    }

    useEffect(() => {
        handleSetSchool();
        getSchools();
    }, [selectedOption]);

    useEffect(() => {
        getSchools();
    }, [schools.all]);

    return (
        <div style={styles.container}>
            <MDBInput autoComplete="off" id="school-input" onBlur={() => handleDisplayList(false)} onFocus={() => handleDisplayList(true)} value={selectedOption} id="school-input" label="Ecoles" icon="school" type="text" list="schools" onChange={handleSchoolsInput} />

            <div id="schools" style={{ display: displayList }}>
                <MDBContainer style={styles.mdbContainer}>

                    <MDBListGroup onMouseEnter={() => setIsCursorOnList(true)} onMouseLeave={() => setIsCursorOnList(false)} style={styles.mdbListGroup}>
                        {
                            filteredSchools
                                .map(([key, value]) => <MDBListGroupItem id={key} key={key} value={value.name} onClick={handleSelectOption} hover>{value.name} </MDBListGroupItem>)

                        }
                    </MDBListGroup>
                </MDBContainer>
            </div>

        </div>
    );
}

export default SchoolsInput;