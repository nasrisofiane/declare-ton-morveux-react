import React, { createContext, useState, useEffect } from 'react';


const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [schools, setSchools] = useState({
        all: new Map(),
        selectedSchool: {}
    });

    const [user, setUser] = useState({
        isAuthenticated : false,
        token : null
    });

    const fetchIsAuthenticated = () =>{
        fetch("http://localhost:8080/isAuthenticated", {
            credentials : 'include'
        })
        .then(res => res.json())
        .then(res => {
            console.log('is authenticated ? ' + res);
            setSchools(prev => {
                return {
                    ...prev,
                    isAuthenticated : res
                }
            });
        });
    }

    const fetchSchools = () => {
        fetch("http://localhost:8080/api/schools")
            .then(res => res.json())
            .then(schools => {
                let schoolsToMap = new Map(schools.map(school => [school.name, school]));
                setSchools(prev => {
                    return {
                        ...prev,
                        all: schoolsToMap
                    }
                });
            });
    }

    useEffect(() => {
        fetchSchools();
        fetchIsAuthenticated();
    }, []);

    return (
        <AppContext.Provider value={
            {
                schools,
                setSchools,
                user,
                setUser,
                fetchIsAuthenticated
            }
        }>
            { children}
        </AppContext.Provider>
    );
}

export { AppContextProvider, AppContext };