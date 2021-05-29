import React from 'react';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";

const Login = () => {
    const match = useRouteMatch();

    return (
        <div className="flex-grow-1 d-flex justify-content-center align-items-center">
            <Switch>
                <Route path={`${match.path}/signup`} component={SignUp} />

                <Route exact path={`${match.path}/`} component={SignIn} />
            </Switch>
        </div>
    );
}

export default Login;