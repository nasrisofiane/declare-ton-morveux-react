import { MDBBadge, MDBBtn, MDBIcon } from 'mdbreact';
import React, { useEffect, useState } from 'react';

const ChildUpdateForm = ({ id, isSick, isContagious }) => {

    const [sick, setSick] = useState(false);
    const [contagious, setContagious] = useState(false);
    const [isUpdated, setIsUpdated] = useState(null);

    useEffect(() => {
        setSick(isSick);
        setContagious(isContagious);
    }, []);

    const handleSubmitNewChildState = () => {
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
    }

    const handleSickChange = (e) => {
        const value = e.target.checked;
        setSick(value);
    }

    const handleContagiousChange = (e) => {
        const value = e.target.checked;
        setContagious(value);
    }

    const generateIcons = () => {
        let dangerOrSuccess;
        let icon;

        if (isUpdated) {
            dangerOrSuccess = 'success';
            icon = 'check-circle';

        } else {
            dangerOrSuccess = 'danger';
            icon = 'times-circle';
        }

        if (isUpdated != null) {
            return (
                <MDBBadge color={dangerOrSuccess}>
                    <MDBIcon fas icon={icon} />
                </MDBBadge>
            );
        }

    }

    return (
        <div className="d-flex flex-row justify-content-between">
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
                {generateIcons()}
                <MDBBtn onClick={handleSubmitNewChildState} className="text-light">Mettre à jour</MDBBtn>
            </div>
        </div>
    );
}

export default ChildUpdateForm;