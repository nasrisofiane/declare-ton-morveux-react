import React, { useContext, useEffect } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { AppContext } from './AppContext';

const AnonymousRoute = ({ children, ...rest }) => {
    const { user } = useContext(AppContext);
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    return (
        <Route
            {...rest}

            render={({ location }) => {
                return !user.isAuthenticated ? children : <Redirect to={{ pathname: from.pathname, state: { from: location } }} />
            }
            }
        />
    );
}

export default AnonymousRoute;