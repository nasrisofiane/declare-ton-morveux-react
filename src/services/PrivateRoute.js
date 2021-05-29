import React, { useContext, useEffect } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { AppContext } from './AppContext';


const PrivateRoute = ({ children, ...rest }) => {
    const { user } = useContext(AppContext);
    const location = useLocation();

    return (
        <Route
            {...rest}

            render={({ location }) => {
                return user.isAuthenticated ? children : <Redirect to={{ pathname: '/login', state: { from: location } }} />
                
            }
            }
        />
    );
}

export default PrivateRoute;