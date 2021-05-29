import { MDBContainer, MDBRow } from 'mdbreact';
import React, { useContext } from 'react';
import { AppContext } from '../services/AppContext';
import DynosStates from '../services/DynosStates';

const Loading = () => {
    const { dynosState, isDatasLoaded } = useContext(AppContext);

    const getWindowHeight = () => {
        return window.innerHeight;
    }

    const createLoading = () => {
        let isLoading = true;
        let loadingMessage = '';

        if ((dynosState === DynosStates.SLEEPING || dynosState === DynosStates.STARTING) && isDatasLoaded === false) {
            isLoading = true;
            loadingMessage = 'Le serveur Heroku est entrain de se reveiller ...';
        } else if (isDatasLoaded === false) {
            isLoading = true;
            loadingMessage = 'Chargement des données ...';
        } else {
            isLoading = false;
        }

        if (isLoading) {
            return (
                <MDBRow id="loading-container" style={{ height: getWindowHeight() + 'px', background : '#dbdbdbd9', zIndex : '1001', top : '0px'}} className="d-flex justify-content-center align-items-center position-absolute w-100 p-0 m-0 text-center">

                    <div>
                        <p>{loadingMessage}</p>
                        <div className="spinner-border" style={{ color : '#2bbbad'}} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>

                </MDBRow>
            )
        } else {
            return <></>
        }
    }

    return createLoading();
}

export default Loading;