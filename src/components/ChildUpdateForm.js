import { MDBBadge, MDBBtn, MDBIcon } from 'mdbreact';
import React, { useEffect, useState } from 'react';

const ChildUpdateForm = ({ id, isSick, isContagious }) => {

    const [sick, setSick] = useState(false);
    const [contagious, setContagious] = useState(false);
    const [isUpdated, setIsUpdated] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        setSick(isSick);
        setContagious(isContagious);
    }, []);

    const handleSubmitNewChildState = () => {
        setIsFetching(true);

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const body = {
            id: id,
            sick: sick,
            contagious: contagious
        }

        fetch(`${process.env.REACT_APP_API_URL}/api/children/`, {
            headers: headers,
            method: 'put',
            credentials: 'include',
            body: JSON.stringify(body)
        })
            .then((response) => {
                if (response.ok) {
                    setIsUpdated(true);
                } else {
                    setIsUpdated(false);
                }
            })
            .finally(() => setIsFetching(false));
    }

    const handleSickChange = (e) => {
        const value = e.target.checked;
        setSick(value);
    }

    const handleContagiousChange = (e) => {
        const value = e.target.checked;
        setContagious(value);
    }

    const resetButtonState = () => {
        if (!isFetching) {
            setIsUpdated(null);
        }
    }

    const generateDynamicButton = () => {
        let baseElement = null;

        if (isFetching) {
            baseElement = (<div role="status" style={{ width: '16px', height: '16px' }} className="spinner-border text-light text-center">
                <span className="sr-only">Loading...</span>
            </div>);
        } else if (isUpdated || isUpdated === false) {
            if (isUpdated) {
                baseElement = <MDBIcon className="text-light" far icon="check-circle" />;
            } else {
                baseElement = <MDBIcon className="text-danger" far icon="times-circle" />
            }

        } else {
            baseElement = 'Mettre à jour';
        }

        return <MDBBtn style={{ height: '38px', fontSize : '2vh' }} onPointerEnter={resetButtonState} onClick={handleSubmitNewChildState} className="text-light">{baseElement}</MDBBtn>
    }

    useEffect(() => {
        if(isUpdated){
           setTimeout(() => setIsUpdated(null), 4000);
        }
    }, [isUpdated]);


    return (
        <div className="d-flex flex-md-row flex-column justify-content-between">
            <div className="custom-control custom-checkbox">
                <div>
                    <input onChange={handleSickChange} id={`sick-checkbox-` + id} checked={sick} className="custom-control-input" type="checkbox" />
                    <label className="custom-control-label" htmlFor={`sick-checkbox-` + id}>Malade</label>
                </div>

                <div>
                    <input onChange={handleContagiousChange} id={`contagious-checkbox-` + id} checked={contagious} className="custom-control-input" type="checkbox" />
                    <label className="custom-control-label" htmlFor={`contagious-checkbox-` + id}>Contagieux</label>
                </div>
            </div>

            <div>
                {generateDynamicButton()}
            </div>
        </div>
    );
}

export default ChildUpdateForm;