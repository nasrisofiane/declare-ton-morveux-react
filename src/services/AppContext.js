import React, { createContext, useState, useEffect } from 'react';
import DynosStates from './DynosStates';

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [schools, setSchools] = useState({
        all: new Map(),
        selectedSchool: {}
    });

    const [user, setUser] = useState({
        id: null,
        username: null,
        isAuthenticated: false,
        token: null
    });

    const [dynosState, setDynosState] = useState(DynosStates.SLEEPING);
    const [isDatasLoaded, setIsDatasLoaded] = useState(false);

    const [myChildren, setMyChildren] = useState([]);

    const getServerCurrentStatus = () =>{
        const headers = new Headers();
        headers.append('Accept', process.env.REACT_APP_HEROKU_ACCEPT_HEADER);
        headers.append('Authorization', `Bearer ${process.env.REACT_APP_HEROKU_TOKEN}`)

        const res = fetch(process.env.REACT_APP_SERVER_DYNOS_URL, { 
            headers : headers,
            method : 'GET'
        })
            .then(res => res.json())
            .then(res => setDynosState(res[0].state))
            .catch( err => console.log('Cannot retrieve Server status'));

    }

    const fetchIsAuthenticated = () => {

        const res = fetch(`${process.env.REACT_APP_API_URL}/isAuthenticated`, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(res => setUser(prev => {
                return {
                    ...prev,
                    isAuthenticated: res
                }
            })
            );
    }

    const fetchSchools = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/schools`)
            .then(res => res.json())
            .then(schools => {
                let schoolsToMap = new Map(schools.map(school => [school.name, school]));
                setSchools(prev => {
                    return {
                        ...prev,
                        all: schoolsToMap
                    }
                });

                setIsDatasLoaded(true);
            });
    }

    const fetchMyChildren = () => {
        if (Number.isInteger(user.id)) {
            fetch(`${process.env.REACT_APP_API_URL}/api/children/parent/${user.id}`, {
                credentials: 'include'
            })
                .then(res => res.json())
                .then(children => {
                    setMyChildren(children);
                });
        }
    }

    const fetchMyAccount = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/parents/me`, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(me => {
                setUser((prev) => {
                    return {
                        ...prev,
                        id: me.id,
                        username: me.username
                    }
                });
            });
    }

    useEffect(() => {
        fetchSchools();
        fetchIsAuthenticated();
        getServerCurrentStatus();
    }, []);

    useEffect(() => {
        if (user.isAuthenticated) {
            fetchMyAccount();
        }
    }, [user.isAuthenticated]);

    return (
        <AppContext.Provider value={
            {
                schools,
                setSchools,
                user,
                setUser,
                fetchIsAuthenticated,
                fetchMyChildren,
                myChildren,
                dynosState,
                setDynosState,
                isDatasLoaded
            }
        }>
            { children}
        </AppContext.Provider>
    );
}

export { AppContextProvider, AppContext };